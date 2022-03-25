<template>
  <TableRow dense class="text-lg text-white tracking-wide">
    <span class="lg:hidden">
      {{ $t('guild.member.address') }}
    </span>
    <div class="lg:col-span-9 text-right lg:text-left">
      <a :href="explorerUrl" target="_blank" class="hover:text-primary-500">
        <div class="flex items-center">
          <span class="break-all">{{ item.address }}</span>
          <v-icon-arrow class="hidden lg:block min-w-3 h-3 w-3 ml-2" />
        </div>
      </a>
    </div>

    <span class="lg:hidden">
      {{ $t('guild.member.since') }}
    </span>
    <div class="lg:col-span-3 text-right">
      <span v-if="!dateToFormat">&mdash;</span>
      <span v-else class="text-white text-opacity-50">{{ dateToFormat }}</span>
    </div>

    <!-- <span class="lg:hidden">
      {{ $t('guild.member.percentage') }}
    </span>
    <div class="lg:col-span-2 text-right">
      <span>{{ item.percentage }}</span>
    </div> -->
  </TableRow>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { format } from 'date-fns'
import { getExplorerUrl } from '@injectivelabs/ui-common'
import { UiGuildMember } from '~/types'
import { NETWORK } from '~/app/utils/constants'
import TableRow from '~/components/partials/grid-table/row.vue'

export default Vue.extend({
  components: {
    TableRow
  },

  props: {
    item: {
      type: Object as PropType<UiGuildMember>,
      required: true
    }
  },

  computed: {
    explorerUrl(): string {
      const { item } = this

      return `${getExplorerUrl(NETWORK)}/account/${item.address}`
    },

    dateToFormat(): string | undefined {
      const { item } = this

      if (!item.since) {
        return undefined
      }

      return format(item.since, 'MMM-dd-yyyy')
    }
  }
})
</script>
