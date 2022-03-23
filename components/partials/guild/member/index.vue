<template>
  <div>
    <h3 class="tracking-tight font-bold text-2xl text-white">
      {{ $t('guild.member.title') }}
    </h3>

    <div class="mt-4">
      <TableHeader class="text-sm font-bold p-4" dense>
        <div class="col-span-7">
          <span>{{ $t('guild.member.address') }}</span>
        </div>
        <div class="col-span-3 text-right">
          <span>{{ $t('guild.member.since') }}</span>
        </div>
        <div class="col-span-2 text-right">
          <span>{{ $t('guild.member.percentage') }}</span>
        </div>
      </TableHeader>

      <TableBody
        class="border border-primary-500 lg:border-none max-h-guildTable"
      >
        <TableRow
          v-for="(item, index) in members"
          :key="`member-row-${index}`"
          :item="item"
          :class="{
            'border-t border-primary-500 border-opacity-30': index !== 0
          }"
        />
      </TableBody>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TableHeader from '~/components/partials/grid-table/header.vue'
import TableBody from '~/components/partials/grid-table/body.vue'
import TableRow from '~/components/partials/guild/member/member-row.vue'
import { portfolioMember as mockMember } from '~/app/data/mock'

export default Vue.extend({
  components: {
    TableHeader,
    TableBody,
    TableRow
  },

  data() {
    return {
      members: [
        mockMember,
        mockMember,
        mockMember,
        mockMember,
        mockMember,
        mockMember
      ]
    }
  }
})
</script>
