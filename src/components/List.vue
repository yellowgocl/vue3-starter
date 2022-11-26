
<script setup>
import { ref, defineAsyncComponent, computed } from 'vue'
import { Calendar,Icon,Col,  Button, Field, CellGroup ,Row,Space ,Form,Cell,Toast,Divider,List,Grid, GridItem,PullRefresh} from 'vant';
import {useRouter} from 'vue-router'
import CardName from '@/components/CardName.vue';
import Card from '@/components/Card.vue';

const props = defineProps({
    title:{
      type: String, default: () => "合同列表"
    },
    listName:{
      type: Array, default: () => ['合同编号','合同名称','归档时间']
    },
}) 
    //列表
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const refreshing = ref(false);

    const onLoad = () => {
      setTimeout(() => {
        if (refreshing.value) {
          list.value = [];
          refreshing.value = false;
        }

        for (let i = 0; i < 10; i++) {
          list.value.push(list.value.length + 1);
        }
        loading.value = false;

        if (list.value.length >= 40) {
          finished.value = true;
        }
      }, 1000);
    };

    const onRefresh = () => {
      // 清空列表数据
      finished.value = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();
    };

</script>
<template>
  <div>
    <Cell :value="props.title" />
    <!-- <Grid :column-num="3">
      <GridItem  text="合同编号" />
      <GridItem  text="合同名称" />
      <GridItem  text="归档时间" />
    </Grid> -->
    <CardName :data="props.listName" :num="3"></CardName>
    <div class="listH">
      <PullRefresh v-model="refreshing" @refresh="onRefresh">
        <List
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <Card v-for="item in list" :key="item" :data="item" :num="3"></Card>
        </List>
      </PullRefresh>
    </div>
  </div>
</template>

<style>
.listH{ height: calc( 100vh - 19rem) ; overflow-y: auto;}
.rowRight{ margin:0 .4rem;}
.rowRight .van-field__label{width: auto;}
/* .buttonStyle{margin-right: 0.2rem;} */
</style>
