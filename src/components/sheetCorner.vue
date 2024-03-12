<template>
  <v-rect
    :config="{
      x: 1,
      y: 1,
      width,
      height,
      stroke,
      fill,
      strokeWidth,
      index: 3
    }"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import setupInjects from '@/hooks/injects';
const { settings } = setupInjects();

const width = computed(() => {
  return settings.rowHeaderWidth;
});
const height = computed(() => {
  return settings.colHeaderHeight;
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
</script>

<style scoped lang="less"></style>
