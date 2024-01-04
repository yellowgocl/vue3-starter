<template>
  <n-space vertical m-6>
    <n-skeleton height="40px" width="33%" />
    <n-skeleton height="180px" :sharp="false" />
    <n-skeleton height="30px" :sharp="false" />
    <n-skeleton height="30px" :sharp="false" />
    <n-skeleton height="30px" width="33%" />
    <n-skeleton text :repeat="4" />
    <n-skeleton height="40px" round />
  </n-space>
</template>
