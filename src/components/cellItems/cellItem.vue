<template>
  <v-rect
    :config="{
      x,
      y,
      width: width,
      height: height,
      fill,
      stroke,
      strokeWidth: 1
    }"
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

const { settings, rowConfig, colConfig } = setupInjects();
const x = computed(() => {
  return (
    calculateWidthsOrHeightsUpToIndex(colConfig, props.colIndex) +
    settings.rowHeaderWidth +
    settings.cellStrokeWidth
  );
});
const y = computed(() => {
  return (
    calculateWidthsOrHeightsUpToIndex(rowConfig, props.rowIndex) +
    settings.colHeaderHeight +
    settings.cellStrokeWidth
  );
});
</script>

<style scoped lang="less"></style>
