<script setup>

</script>

<template>
  <div>
    {{ JSON.stringify($route.params) }}
    event detail {{ $route.params.id }}
    <router-view />
  </div>
</template>
