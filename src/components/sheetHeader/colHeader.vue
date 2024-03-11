<template>
  <div v-for="(col, colIndex) in colConfig" :key="colIndex">
    <ColHeaderItem :colItem="col" :colIndex="colIndex" />
  </div>
</template>

<script setup lang="ts">
import setupInjects from '@/hooks/injects';
import ColHeaderItem from '@/components/cellItems/colHeaderItem.vue';
const { colConfig } = setupInjects();
</script>

<style scoped lang="less"></style>
