
<script setup>
import { ref, defineAsyncComponent, computed } from 'vue'
import { Icon,  Button, Field, CellGroup ,Row,Space ,Form,Cell,Toast,Divider,Grid, GridItem} from 'vant';
import Search from '@/components/Search.vue'
import List from '@/components/List.vue'
import {useRouter} from 'vue-router'
import moment from 'moment'; 
const isLoading = ref(true)
const onSubmit=(item)=>{
  console.log('submit123',item);
}
const listName=ref(['合同编号','合同名称','归档时间'])
</script>
<template>
  <div>
    <Search @submit="onSubmit" :title="'搜索条件'"></Search>
    <List :title="'合同列表'" :listName="listName"></List>
  </div>
</template>

<style>
</style>
