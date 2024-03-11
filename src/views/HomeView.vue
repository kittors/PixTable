<script setup lang="ts">
import PixTable from '@/components/pixTableContainer.vue';
const config = {
  rows: 100,
  cols: 10,
  good: 'hello world~'
};
</script>

<template>
  <PixTable :config="config" />
</template>
