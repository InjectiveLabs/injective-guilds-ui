<template>
  <TableRow dense class="text-lg text-white tracking-wide">
    <span class="lg:hidden">
      {{ $t('guild.member.address') }}
    </span>
    <div class="lg:col-span-7 text-right lg:text-left">
      <span class="break-all">{{ item.address }}</span>
    </div>

    <span class="lg:hidden">
      {{ $t('guild.member.since') }}
    </span>
    <div class="lg:col-span-3 text-right">
      <span v-if="!dateToFormat">&mdash;</span>
      <span v-else class="text-white text-opacity-50">{{ dateToFormat }}</span>
    </div>

    <span class="lg:hidden">
      {{ $t('guild.member.percentage') }}
    </span>
    <div class="lg:col-span-2 text-right">
      <span>{{ item.percentage }}</span>
    </div>
  </TableRow>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { format } from 'date-fns'
import { UIMember } from '~/types'
import TableRow from '~/components/partials/grid-table/row.vue'

export default Vue.extend({
  components: {
    TableRow
  },

  props: {
    item: {
      type: Object as PropType<UIMember>,
      required: true
    }
  },

  computed: {
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
