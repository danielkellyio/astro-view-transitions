<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
  startingCount?: number;
}>();
const counter = ref(props.startingCount || 0);
</script>
<template>
  <button @click="counter++"><slot></slot>{{ counter }}</button>
</template>
