<template>
  <v-rect
    :config="{
      x,
      y,
      width: width,
      height: height,
      fill,
      stroke,
      strokeWidth: 1,
      index: 0
    }"
    v-if="
      rowIndex >= renderRowConfig.renderStartIndex && rowIndex <= renderRowConfig.renderEndIndex
    "
  >
  </v-rect>
</template>

<script setup lang="ts">
import setupInjects from '@/hooks/injects';
import { defineProps, computed } from 'vue';
import { calculateWidthsOrHeightsUpToIndex } from '@/utils/sheetUtils';
const props = defineProps<{
  width: number;
  height: number;
  fill: string;
  stroke: string;
  colIndex: number;
  rowIndex: number;
}>();

const { settings, rowConfig, colConfig, scrollX, scrollY, renderRowConfig } = setupInjects();
const x = computed(() => {
  return (
    calculateWidthsOrHeightsUpToIndex(colConfig, props.colIndex) +
    settings.rowHeaderWidth +
    settings.cellStrokeWidth +
    scrollX.value
  );
});
const y = computed(() => {
  return (
    calculateWidthsOrHeightsUpToIndex(rowConfig, props.rowIndex) +
    settings.colHeaderHeight +
    settings.cellStrokeWidth +
    scrollY.value
  );
});
</script>

<style scoped lang="less"></style>
