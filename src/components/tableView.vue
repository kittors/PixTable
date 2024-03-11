<template>
  <div v-for="(row, rowIndex) in rowConfig" :key="rowIndex">
    <div v-for="(col, colIndex) in colConfig" :key="colIndex">
      <CellItem
        :width="col.width"
        :height="row.height"
        :fill="settings.cellColor"
        :stroke="settings.cellBorderColor"
        :colIndex="colIndex"
        :rowIndex="rowIndex"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import setupInjects from '@/hooks/injects';
import CellItem from '@/components/cellItems/cellItem.vue';
const { colConfig, rowConfig, settings } = setupInjects();
</script>

<style scoped lang="less"></style>
