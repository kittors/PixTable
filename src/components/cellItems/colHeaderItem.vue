<template>
  <v-rect :config="{ x, y: strokeWidth, width, height, fill, stroke, strokeWidth }" z-index="1" />
  <v-text
    z-index="1"
    :config="{
      x,
      y: textY,
      text: colItem.title,
      fontFamily: 'Arial',
      fill: '#000',
      width,
      align: 'center', // 居中对齐文本,
      index: 1
    }"
  />
</template>

<script setup lang="ts">
import setupInjects from '@/hooks/injects';
import { defineProps, computed } from 'vue';
import { calculateWidthsOrHeightsUpToIndex } from '@/utils/sheetUtils';
const props = defineProps<{ colIndex: number; colItem: ColConfig }>();
const { settings, colConfig, scrollX } = setupInjects();
const x = computed(() => {
  return (
    calculateWidthsOrHeightsUpToIndex(colConfig, props.colIndex) +
    settings.rowHeaderWidth +
    settings.cellStrokeWidth +
    scrollX.value
  );
});
const height = computed(() => {
  return settings.colHeaderHeight;
});
const width = computed(() => {
  return props.colItem.width;
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
  return strokeWidth.value + height.value / 2 - 6;
});
</script>

<style scoped lang="less"></style>
