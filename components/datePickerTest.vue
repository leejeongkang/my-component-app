<template>
    <div>
    <client-only><date-picker v-model:value="time0"></date-picker></client-only>
    </div>
  </template>

<script>

export default {
  data() {
    return {
      time0: null,
      time1: null,
      time2: null,
      time3: null,
    };
  },
};
</script>