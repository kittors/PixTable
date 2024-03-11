<template>
  <v-stage ref="stage" :config="stageSize">
    <!-- 表格结构图层 -->
    <v-layer>
      <TableView />
      <ColHeader />
      <RowHeader />
    </v-layer>
  </v-stage>
</template>

<script setup lang="ts">
import { defineProps, computed, reactive } from 'vue';
import TableView from '@/components/tableView.vue';
import ColHeader from '@/components/sheetHeader/colHeader.vue';
import RowHeader from '@/components/sheetHeader/rowHeader.vue';
import sheetCore from '@/hooks/generateTableWork';
import setupProvides from '@/hooks/provides';
const { rowConfig, colConfig, settings } = sheetCore();
setupProvides({ rowConfig, colConfig, settings });
const props = defineProps<{ width: number; height: number }>();
const height = computed(() => {
  return props.height;
});
const width = computed(() => {
  return props.width;
});
const stageSize = reactive({ width, height });
</script>

<style scoped lang="less"></style>
