
<script setup>
import { ref, defineAsyncComponent, computed } from 'vue'
import { Calendar,Icon,Col,  Button, Field, CellGroup ,Row,Space ,Form,Cell,Toast,Divider,List,Grid, GridItem,PullRefresh} from 'vant';
import {useRouter} from 'vue-router'
import moment from 'moment';  


    const date = ref('');
    const show = ref(false);

    // const result = ref('');
    const sms = ref(false);

   const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    //const formatDate = (date) => `${ date.format('YYYY-MM-DD')}`
    const onConfirm = (values) => {
      const [start, end] = values;
      console.log("date",start,end,moment().format())
      show.value = false;
      date.value = `${formatDate(start)} - ${formatDate(end)}`;
    };
    const onSubmit=(values)=>{
      console.log('submit', values);
    }
    const onFailed=(errorInfo)=>{
      console.log('failed', errorInfo);
    }
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
    <Cell value="搜索条件" />
    <Form @failed="onFailed" @submit="onSubmit" style="margin-top: 10px;">
      <!-- <CellGroup inset> -->
        <Row justify="center">
          <Col span="18" class="rowRight">
            <Field
            v-model="date"
            is-link
            readonly
            name="datetimePicker"
            label="呈批时间"
            placeholder="点击选择时间"
            @click="show = true"
            :rules="[{ validator: asyncValidator, message: '请点击选择时间' }]"
          />
          </Col>
          <Col span="4">
            <Button block type="primary" native-type="submit" class="buttonStyle">
              提交
            </Button>    
          </Col>
        </Row>
        
      <!-- </CellGroup> -->
      <!-- <div style="margin: 16px;">
                                      
      </div> -->
      <!-- <Popup v-model:show="show" position="bottom"> -->
      <Calendar v-model:show="show" color="#1989fa" type="range" @confirm="onConfirm" :round="false" />
     <!-- </Popup> -->
     <!-- <Cell title="选择日期区间" :value="date" @click="show = true" />
      <Calendar v-model:show="show" color="#1989fa" type="range" @confirm="onConfirm" :round="false" /> -->
    </Form>
    <Cell value="合同列表" />
    <Grid :column-num="3">
      <GridItem  text="合同编号" />
      <GridItem  text="合同名称" />
      <GridItem  text="归档时间" />
    </Grid>
    <div class="listH">
      <PullRefresh v-model="refreshing" @refresh="onRefresh">
        <List
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
          <Grid v-for="item in list" :key="item" :column-num="3">
            <GridItem  :text="item.no" />
            <GridItem  :text="item.name" />
            <GridItem  :text="item.time" />
          </Grid>
        </List>
      </PullRefresh>
    </div>
  </div>
</template>

<style>
.iconStyle{margin: 0 auto;}
.listH{ height: calc( 100vh - 19rem) ; overflow-y: auto;}
.rowRight{ margin:0 .4rem;}
.rowRight .van-field__label{width: auto;}
/* .buttonStyle{margin-right: 0.2rem;} */
</style>
