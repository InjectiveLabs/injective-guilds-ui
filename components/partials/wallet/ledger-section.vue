<template>
  <section>
    <div class="border border-primary-500 p-4">
      <v-select-custom
        v-model="form.path"
        :options="
          derivationPaths.map((a) => ({
            code: a.path,
            label: a.label
          }))
        "
        :clearable="false"
        :searchable="false"
        :label="$t('ledger.derivationPath')"
        :placeholder="$t('ledger.selectDerivationPath')"
      />
      <div class="text-left mt-2">
        <div v-if="status.isIdle()">
          <div
            class="text-xs cursor-pointer"
            @click.stop.prevent="handleClickOnFetchAddresses"
          >
            <div
              class="
                flex
                items-center
                font-semibold
                text-primary-500
                hover:text-primary-600
              "
            >
              <span class="mr-2">{{
                addresses.length === 0
                  ? $t('ledger.getAddresses')
                  : $t('ledger.getMoreAddresses')
              }}</span>
              <v-icon-arrow class="transform rotate-180 w-3 h-3" />
            </div>
          </div>
        </div>
        <p v-else class="text-primary-500 text-xs leading-6">
          {{ $t('ledger.getAddressNote') }}
        </p>
      </div>

      <ValidationObserver
        v-if="addresses.length > 0"
        v-slot="{ invalid }"
        ref="form"
      >
        <div class="border-t border-primary-500 mt-3 pt-3">
          <ValidationProvider
            v-slot="{ errors, valid }"
            name="form.address"
            :rules="`required`"
          >
            <v-select-custom
              v-model="form.address"
              :errors="status.isLoading() ? [] : errors"
              :options="
                addresses.map((a) => ({
                  code: a,
                  label: a
                }))
              "
              :valid="valid"
              :label="$t('ledger.address')"
              :placeholder="$t('ledger.selectAddressToConnect')"
            >
            </v-select-custom>
          </ValidationProvider>
        </div>

        <v-button
          md
          :status="connectStatus"
          class="w-full mt-4"
          :primary="!invalid"
          :disabled="!form.address || invalid"
          @click.stop="onConnect"
        >
          {{ $t('connect.connect') }}
        </v-button>
      </ValidationObserver>
    </div>
    <p class="text-xs mt-4">{{ $t('ledger.connectUsingLedgerNote') }}</p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { Status, StatusType } from '@injectivelabs/utils'
import { LedgerDerivationPathType, Wallet } from '@injectivelabs/web3-strategy'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import VSelectCustom from '~/components/inputs/select-custom.vue'
import { WalletConnectStatus } from '~/types'

export default Vue.extend({
  components: {
    ValidationObserver,
    ValidationProvider,
    VSelectCustom
  },

  data() {
    return {
      connectStatus: new Status(StatusType.Idle),
      status: new Status(StatusType.Idle),
      derivationPaths: [
        {
          label: this.$t('ledger.ledgerLive'),
          path: LedgerDerivationPathType.LedgerLive
        },
        {
          label: this.$t('ledger.ledgerLegacy'),
          path: LedgerDerivationPathType.LedgerMew
        }
      ],

      form: {
        path: LedgerDerivationPathType.LedgerLive,
        address: ''
      }
    }
  },

  computed: {
    addresses(): string[] {
      return this.$accessor.wallet.addresses
    },

    wallet(): Wallet {
      const { form } = this

      return form.path === LedgerDerivationPathType.LedgerLive
        ? Wallet.Ledger
        : Wallet.LedgerLegacy
    }
  },

  watch: {
    'form.path'() {
      this.$accessor.wallet.setAddresses([])
    }
  },

  methods: {
    onConnect() {
      this.connectStatus.setLoading()

      this.$accessor.wallet
        .connectLedger([this.form.address])
        .then(() => {
          //
        })
        .catch((e) => {
          this.$accessor.wallet.setWalletConnectStatus(
            WalletConnectStatus.disconnected
          )
          this.$onError(e)
        })
        .finally(() => {
          this.connectStatus.setIdle()
          this.$emit('connected')
        })
    },

    handleClickOnFetchAddresses() {
      this.status.setLoading()

      this.$accessor.wallet
        .getHWAddresses(this.wallet)
        .then(() => {
          //
        })
        .catch(this.$onError)
        .finally(() => {
          this.status.setIdle()
        })
    }
  }
})
</script>
