import { Web3Exception } from '@injectivelabs/exceptions'
import { AuthzComposer } from '@injectivelabs/chain-consumer'
import { BaseActionService } from '@injectivelabs/ui-common/dist/BaseActionService'
import { mapMultipleComposerResponseMessages } from '@injectivelabs/utils'
import { GuildMetrics } from './types'
import { authzMessageTypes } from '~/app/data/guild'

export class GuildActionService extends BaseActionService {
  async grant({
    address,
    injectiveAddress,
    guildMasterAddress
  }: {
    address: string
    guildMasterAddress: string
    injectiveAddress: string
  }) {
    const messages = authzMessageTypes.map((message) =>
      AuthzComposer.grant({
        messageType: message,
        grantee: guildMasterAddress,
        granter: injectiveAddress
      })
    )
    const mappedMessages = mapMultipleComposerResponseMessages(messages)

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

  async revoke({
    address,
    injectiveAddress,
    guildMasterAddress
  }: {
    address: string
    guildMasterAddress: string
    injectiveAddress: string
  }) {
    const messages = authzMessageTypes.map((message) =>
      AuthzComposer.revoke({
        messageType: message,
        grantee: guildMasterAddress,
        granter: injectiveAddress
      })
    )
    const mappedMessages = mapMultipleComposerResponseMessages(messages)

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
}
