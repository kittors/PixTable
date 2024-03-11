<template>
  <v-rect
    :config="{
      x: strokeWidth,
      y,
      width,
      height,
      stroke,
      fill,
      strokeWidth
    }"
  />
  <v-text
    :config="{
      x: strokeWidth,
      y: textY,
      text: rowItem.index,
      fontFamily: 'Arial',
      fill: '#000',
      width,
      align: 'center' // 居中对齐文本
    }"
  />
</template>

<script setup lang="ts">
import setupInjects from '@/hooks/injects';
import { defineProps, computed } from 'vue';
import { calculateWidthsOrHeightsUpToIndex } from '@/utils/sheetUtils';
const props = defineProps<{ rowIndex: number; rowItem: RowConfig }>();
const { rowConfig, settings } = setupInjects();
const y = computed(() => {
  return (
    calculateWidthsOrHeightsUpToIndex(rowConfig, props.rowIndex) +
    settings.colHeaderHeight +
    settings.cellStrokeWidth
  );
});
const width = computed(() => {
  return settings.rowHeaderWidth;
});
const height = computed(() => {
  return props.rowItem.height;
});
const stroke = computed(() => {
  return settings.cellBorderColor;
});
const fill = computed(() => {
  return settings.headerColor;
});
const strokeWidth = computed(() => {
  return settings.cellStrokeWidth;
});
const textY = computed(() => {
  return y.value + height.value / 2 - 6;
});
</script>

<style scoped lang="less"></style>
