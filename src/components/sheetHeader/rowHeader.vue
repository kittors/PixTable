<template>
  <div v-for="(row, rowIndex) in rowConfig" :key="rowIndex">
    <RowHeaderItem :rowItem="row" :rowIndex="rowIndex" />
  </div>
</template>

<script setup lang="ts">
import setupInjects from '@/hooks/injects';
import RowHeaderItem from '@/components/cellItems/rowHeaderItem.vue';
const { rowConfig } = setupInjects();
</script>

<style scoped lang="less"></style>
