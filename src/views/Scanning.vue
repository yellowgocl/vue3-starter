
<script setup>
import { ref, defineAsyncComponent, computed } from 'vue'
import { Icon,  Button, Field, CellGroup ,Row,Space ,Form,Cell,Toast,Divider,List,Grid, GridItem} from 'vant';
import {useRouter} from 'vue-router'
import moment from 'moment'; 

    const no = ref('');
    const name = ref('');
    const undertaker = ref('');
    const time = ref('');
    const information="1";
    const quantity=ref(0);
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // for (let i = 0; i < 10; i++) {
        //   list.value.push(list.value.length + 1);
        // }
        list.value
        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= list.value.length) {
          finished.value = true;
        }
      }, 1000);
    };

    const reSetFromData=()=>{
      no.value ='';
      name.value ='';
      undertaker.value ='';
      time.value ='';
    }
    // const pattern = /\d{6}/;

     // 校验函数返回 true 表示校验通过，false 表示不通过
     //const validator = (val) => /1\d{10}/.test(val);

      // 校验函数可以直接返回一段错误提示
       //const validatorMessage = (val) => `${val} 不合法，请重新输入`;

      // 校验函数可以返回 Promise，实现异步校验
      const asyncValidator = (val) =>

        new Promise((resolve) => {
          Toast.loading('验证中...');

          setTimeout(() => {
            Toast.clear();
           
           let m=ref("1");
           console.log(val&&m.value == information)
            resolve(val != ''&&m.value == information);
            if(val&&m.value == information)
            {
                name.value ='assdff';
                undertaker.value="王先生";
                time.value=moment().format('YYYY-MM-DD HH:mm');
            }
            else
            {
                name.value ='';
                undertaker.value="";
                time.value='';
            }
            console.log(name,undertaker) 
            
          }, 1000);
        });

      const onFailed = (errorInfo) => {
        console.log('failed', errorInfo);
      };

      const onSubmit = (values) => {
        console.log('submit', values);
        list.value.push(values);
        quantity.value=list.value.length;
        reSetFromData();
      };

</script>
<template>
  <div>
    <Cell value="合同归档信息" />
    <Form @failed="onFailed" @submit="onSubmit">
      <CellGroup inset>
        <!-- 通过 validator 进行异步函数校验 -->
        <Field
          v-model="no"
          name="no"
          label="合同编号:"
          placeholder=""
          :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
        />
        <!-- 通过 pattern 进行正则校验 -->
        <Field
          v-model="name"
          name="name"
          label="合同名称:"
          placeholder=""
          :rules="[{ required: true, message: '请填写合同名称' }]"
        />
        <!-- 通过 validator 进行函数校验 -->
        <Field
          v-model="undertaker"
          name="undertaker"
          label="承办人:"
          placeholder=""
          :rules="[{  required: true, message: '请填写承办人' }]"
        />
        <!-- 通过 validator 返回错误提示 -->
        <Field
          v-model="time"
          name="time"
          label="归档时间:"
          placeholder=""
          disabled
        />
        
      </CellGroup>
      <div style="margin: 16px;">
        <Button block type="primary" native-type="submit">
          提交
        </Button>
      </div>
    </Form>
  
    <Cell title="本次已归档合同列表" >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <span class="custom-title">本次已归档数量:   {{quantity}}</span>
        <!-- <van-icon name="search" class="search-icon" /> -->
      </template>
    </Cell>
    <Grid :column-num="3">
      <GridItem  text="合同编号" />
      <GridItem  text="合同名称" />
      <GridItem  text="归档时间" />
    </Grid>
    <div class="listH">
      <List
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad" 
      >
        <!-- <Cell v-for="item in list" :key="item" :title="item" /> -->
        <Grid v-for="item in list" :key="item" :column-num="3">
          <GridItem  :text="item.no" />
          <GridItem  :text="item.name" />
          <GridItem  :text="item.time" />
        </Grid>
      </List>
    </div>
  </div>
</template>

<style>
.iconStyle{margin: 0 auto;}
.listH{ height: calc( 100vh - 27.4rem) ; overflow-y: auto;}
.van-field--disabled .van-field__label{color:var(--van-field-label-color);}
</style>
