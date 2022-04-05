import { Web3Exception } from '@injectivelabs/exceptions'
import { AuthzComposer } from '@injectivelabs/chain-consumer'
import { BaseActionService } from '@injectivelabs/ui-common/dist/BaseActionService'
import {
  BigNumberInBase,
  BigNumberInWei,
  mapMultipleComposerResponseMessages
} from '@injectivelabs/utils'
import {
  BIG_NUMBER_ROUND_UP_MODE,
  derivativeOrderTypeToGrpcOrderType,
  UiDerivativeLimitOrder,
  UiDerivativeMarketWithToken,
  UiPosition,
  UiSpotLimitOrder,
  ZERO_TO_STRING
} from '@injectivelabs/ui-common'
import { SpotMarketComposer } from '@injectivelabs/spot-consumer'
import { DerivativeMarketComposer } from '@injectivelabs/derivatives-consumer'
import { SubaccountComposer } from '@injectivelabs/subaccount-consumer'
import { mapPositionsForClosing } from '../derivatives'
import { GuildMetrics, UiGuildRequirement } from './types'
import { authzMessageTypes } from '~/app/data/guild'

export class GuildActionService extends BaseActionService {
  async grantInBatch({
    address,
    injectiveAddress,
    guildMasterAddress,
    subaccountId,
    requirements
  }: {
    address: string
    subaccountId: string
    guildMasterAddress: string
    injectiveAddress: string
    requirements: UiGuildRequirement[]
  }) {
    const authzMessages = authzMessageTypes.map((message) =>
      AuthzComposer.grant({
        messageType: message,
        grantee: guildMasterAddress,
        granter: injectiveAddress
      })
    )
    const tradingAccountDepositMessages = requirements
      .filter((requirement) => requirement.outstandingAmountInBase.gt(0))
      .map((requirement) => {
        return SubaccountComposer.deposit({
          subaccountId,
          injectiveAddress,
          denom: requirement.denom,
          amount: new BigNumberInBase(requirement.outstandingAmountInBase)
            .toWei(requirement.token.decimals)
            .toFixed()
        })
      })
    const authzMappedMessages =
      mapMultipleComposerResponseMessages(authzMessages)
    const tradingAccountDepositMappedMessages =
      mapMultipleComposerResponseMessages(tradingAccountDepositMessages)

    const mappedMessages = {
      web3GatewayMessage: [
        ...tradingAccountDepositMappedMessages.web3GatewayMessage,
        ...authzMappedMessages.web3GatewayMessage
      ],
      directBroadcastMessage: [
        ...tradingAccountDepositMappedMessages.directBroadcastMessage,
        ...authzMappedMessages.directBroadcastMessage
      ]
    }

    try {
      return await this.txProvider.broadcast({
        bucket: GuildMetrics.Grant,
        message: mappedMessages,
        address
      })
    } catch (error) {
      throw new Web3Exception((error as any).message)
    }
  }

  async revokeInBatch({
    address,
    spotOrders,
    derivativeOrders,
    positions,
    derivativeMarkets,
    injectiveAddress,
    subaccountId,
    guildMasterAddress
  }: {
    address: string
    spotOrders: UiSpotLimitOrder[]
    derivativeOrders: UiDerivativeLimitOrder[]
    derivativeMarkets: UiDerivativeMarketWithToken[]
    positions: UiPosition[]
    subaccountId: string
    guildMasterAddress: string
    injectiveAddress: string
  }) {
    const authzMessages = authzMessageTypes.map((message) =>
      AuthzComposer.revoke({
        messageType: message,
        grantee: guildMasterAddress,
        granter: injectiveAddress
      })
    )
    const batchCancelSpotOrders = SpotMarketComposer.batchCancelSpotOrder({
      injectiveAddress,
      orders: spotOrders.map((o) => ({
        orderHash: o.orderHash,
        subaccountId: o.subaccountId,
        marketId: o.marketId
      }))
    })
    const batchCancelDerivativeOrders =
      DerivativeMarketComposer.batchCancelDerivativeOrder({
        injectiveAddress,
        orders: derivativeOrders.map((o) => ({
          orderHash: o.orderHash,
          subaccountId: o.subaccountId,
          marketId: o.marketId
        }))
      })

    const formattedPositions = mapPositionsForClosing(
      positions,
      derivativeMarkets
    )
    const closePositionsMessages = formattedPositions.map((position) =>
      DerivativeMarketComposer.createMarketOrder({
        subaccountId,
        injectiveAddress,
        marketId: position.marketId,
        order: {
          feeRecipient: guildMasterAddress,
          triggerPrice: '0',
          price: new BigNumberInWei(position.price).toFixed(),
          quantity: new BigNumberInBase(position.quantity).toFixed(),
          orderType: derivativeOrderTypeToGrpcOrderType(position.orderType),
          margin: ZERO_TO_STRING
        }
      })
    )
    const closePositionsMappedMessages = mapMultipleComposerResponseMessages(
      closePositionsMessages
    )

    const mappedAuthzMessages =
      mapMultipleComposerResponseMessages(authzMessages)
    const mappedMessages = {
      web3GatewayMessage: [
        batchCancelSpotOrders.web3GatewayMessage,
        batchCancelDerivativeOrders.web3GatewayMessage,
        ...closePositionsMappedMessages.web3GatewayMessage,
        ...mappedAuthzMessages.web3GatewayMessage
      ],
      directBroadcastMessage: [
        ...(Array.isArray(batchCancelSpotOrders.directBroadcastMessage)
          ? batchCancelSpotOrders.directBroadcastMessage
          : [batchCancelSpotOrders.directBroadcastMessage]),
        ...(Array.isArray(batchCancelDerivativeOrders.directBroadcastMessage)
          ? batchCancelDerivativeOrders.directBroadcastMessage
          : [batchCancelDerivativeOrders.directBroadcastMessage]),
        ...closePositionsMappedMessages.directBroadcastMessage,
        ...mappedAuthzMessages.directBroadcastMessage
      ]
    }

    try {
      return await this.txProvider.broadcast({
        bucket: GuildMetrics.Revoke,
        message: mappedMessages,
        address
      })
    } catch (error) {
      throw new Web3Exception((error as any).message)
    }
  }

  async depositRemainingToTradingAccount({
    address,
    injectiveAddress,
    subaccountId,
    requirements
  }: {
    address: string
    subaccountId: string
    injectiveAddress: string
    requirements: UiGuildRequirement[]
  }) {
    const filteredRequirements = requirements.filter((requirement) =>
      requirement.outstandingAmountInBase.gt(0)
    )

    if (filteredRequirements.length === 0) {
      return
    }

    const tradingAccountDepositMessages = filteredRequirements.map(
      (requirement) => {
        return SubaccountComposer.deposit({
          subaccountId,
          injectiveAddress,
          denom: requirement.denom,
          amount: new BigNumberInBase(requirement.outstandingAmountInBase)
            .toWei(requirement.token.decimals)
            .toFixed(0, BIG_NUMBER_ROUND_UP_MODE)
        })
      }
    )

    const tradingAccountDepositMappedMessages =
      mapMultipleComposerResponseMessages(tradingAccountDepositMessages)

    try {
      return await this.txProvider.broadcast({
        bucket: GuildMetrics.Grant,
        message: tradingAccountDepositMappedMessages,
        address
      })
    } catch (error) {
      throw new Web3Exception((error as any).message)
    }
  }

  async grant({
    address,
    injectiveAddress,
    guildMasterAddress
  }: {
    address: string
    guildMasterAddress: string
    injectiveAddress: string
  }) {
    const authzMessages = authzMessageTypes.map((message) =>
      AuthzComposer.grant({
        messageType: message,
        grantee: guildMasterAddress,
        granter: injectiveAddress
      })
    )
    const authzMappedMessages =
      mapMultipleComposerResponseMessages(authzMessages)

    try {
      return await this.txProvider.broadcast({
        bucket: GuildMetrics.Grant,
        message: authzMappedMessages,
        address
      })
    } catch (error) {
      throw new Web3Exception((error as any).message)
    }
  }

  async revoke({
    address,
    injectiveAddress,
    guildMasterAddress
  }: {
    address: string
    guildMasterAddress: string
    injectiveAddress: string
  }) {
    const authzMessages = authzMessageTypes.map((message) =>
      AuthzComposer.revoke({
        messageType: message,
        grantee: guildMasterAddress,
        granter: injectiveAddress
      })
    )

    const mappedAuthzMessages =
      mapMultipleComposerResponseMessages(authzMessages)

    try {
      return await this.txProvider.broadcast({
        bucket: GuildMetrics.Revoke,
        message: mappedAuthzMessages,
        address
      })
    } catch (error) {
      throw new Web3Exception((error as any).message)
    }
  }
}
