
<script setup>
import { ref, defineAsyncComponent, computed, watch, reactive ,onMounted } from 'vue'
import { Icon,  Button, Field, CellGroup ,Row,Space ,Form,Cell,Toast,Divider,List,Grid, GridItem,Dialog,Sticky} from 'vant';
import { useRouter } from 'vue-router'
import { debounce, find } from 'lodash'
import CardName from '@/components/CardName.vue';
import Card from '@/components/Card.vue';
import moment from 'moment'; 
import Title from '../components/Title.vue'
import { useService, useApi, usePagination } from '@/hooks'
const contractInfo = ref()
const contractnoRef = ref()
const fileTime = ref('');

const list = ref([]);
///列表数据
const loading = ref(false);

const finished = ref(true);
const submitDate=ref({});
const services = useService()
// const listHeight=reactive('100vh')
const [promiseWrapper, fetchState] = useApi(services.numberQuery)
const [contractFilingWrapper, contractFilingState] = useApi(services.contractFiling)
const columnNames = [
  "合同编号",
  "合同名称",
  "归档时间"
]
const contractno = ref('')
const contractName = ref('')
const appUserName = ref('')
const totalScanned = computed(() => list.value?.length || 0)
const isDisabledSubmitButton = computed(() => (
  contractFilingState.value.isPending || fetchState.value.isPending || (!contractno.value || !contractName.value || !appUserName.value )
))
const box = ref();

// 合同编号请求数据时
watch(() => fetchState.value.isPending, (n, o) => {
  console.log("fetchState.value.isPending",n )
  n ?  Toast.loading('验证中...') : Toast.clear()
})
// 提交后清空数据
const reSetFromData=()=>{
  contractInfo.value = contractName.value = appUserName.value = null
  contractno.value =''
  fileTime.value =''
}


/**
 * 校验函数可以返回 Promise，实现异步校验
 */
// 测试合同编号： SRFP2022108147 、SRFP2022108146、SRFP2022108140、SRFP2022047393、SRFT2022047395 
// 获取合同编号请求数据
const asyncValidator = async (val) => {
  if (!val) return false
  // 如果传入val为空&contractno与val相同返回错误信息
  if (contractInfo.value?.contractno === val) return true 
  try {
    // 请求接口数据
    const { object } = await promiseWrapper(({ contractno: val }))
    // 获取返回信息
    contractInfo.value = { ...object, contractno: val }
    // 赋值归档时间
    fileTime.value=moment().format('YYYY-MM-DD');
    // 赋值合同名称
    contractName.value = object.contractName
    // 赋值承办人
    appUserName.value = object.appUserName
  } catch (e) {
    //Toast.clear()
   // console.log(e.error.message)
    // 返回信息错误
    // 弹错误弹窗
    Toast.fail(e.error.message)
    // 清除数据
    reSetFromData()
    return false
  }
}
// 添加列表数据
const addList = (val) =>{
    list.value.push(val);
    console.log("list",list)
    reSetFromData();
}
// 列表出错方法
const onFailed = (errorInfo) => {
  console.log('failed', errorInfo);
};
// 弹窗是否确认按钮提交合同
const beforeClose = async(action) =>{
  if (action === 'confirm') {
      try {
        Dialog.close()
        // 获取当前传入合同
        const data=submitDate.value
        // 判断合同号是否存在
        if (find(list.value, (v) => v.contractno === data.contractno)) {
          reSetFromData();
          throw new Error('列表中已存在!')
        }
        //接口传入本次合同数据
       let d= await contractFilingWrapper(( data )) 
       //console.log("d",d.message)
      //  接口返回成功信息
          Toast.success('合同已归档成功');
        addList(data)
      } catch (e) {
      //  接口返回不成功信息
        Toast.fail(e?.message);
      }
    } else {
      // 拦截取消操作
      Dialog.close();
    }
}
//页面开始运行
const onLoad = () => list
//列表确认按钮方法
const onSubmit = (values) => {
  //console.log('submit', values);
  submitDate.value=values;
  if (!values) return false
  // 弹窗
  Dialog.confirm({
    message:
      '此合同是否归档',
    beforeClose,
    confirmButtonColor:"var(--van-primary-color)",
    // theme:'round-button'
  });
};

// onMounted(()=>{
//   console.log(box.value.clientHeight)
// });
 const boxHeight = ref(0);
    // onMounted(() => {
    //   boxHeight.value = box.value?.clientHeight;
    //   console.log(boxHeight.value)
    // });
  
boxHeight.value = watch(() => box.value?.clientHeight, (n, o) => {
      //console.log("fetchState.value.isPending",n )
      console.log(n, o)
    })

// 点安桌接入
// window.contract_app_hello = (outerValue) => {
//   console.info(outerValue)
//   contractno.value = outerValue
// }

// const onclick = (outerValue) => {
//   window.contract_app_hello('ccc111222')
//   contractnoRef.value?.focus?.()
// }
</script>
<template>
  <div class="scanning">
    <!-- <Sticky :offset-top="50"> -->
    <div ref="box">
      <!-- 合同归档信息标题 -->
      <Title :value="'合同归档信息'"></Title>
      <!-- 输入框表单 -->
      <Form @failed="onFailed" @submit="onSubmit" >
        <CellGroup inset>
          <!-- 通过 validator 进行异步函数校验 -->
          <Field
            ref="contractnoRef"
            v-model="contractno"
            name="contractno"
            label="合同编号:"
            placeholder=""
            :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
          />
          <!-- 合同名称input -->
          <Field
            v-model="contractName"
            name="contractName"
            rows="3"
            autosize
            type="textarea"
            label="合同名称:"
            placeholder=""
            :rules="[{ required: true, message: '请填写合同名称' }]"
          />
          <!-- 承办人input -->
          <Field
            v-model="appUserName"
            name="appUserName"
            label="承办人:"
            placeholder=""
            :rules="[{  required: true, message: '请填写承办人' }]"
          />
          <!-- 归档时间input -->
          <Field
            v-model="fileTime"
            name="fileTime"
            label="归档时间:"
            placeholder=""
            readonly
          />
        </CellGroup>
        <div style="margin: 16px;">
          <!-- 表单提交按钮 -->
          <Button :disabled="isDisabledSubmitButton" block type="primary" native-type="submit">
            提交
          </Button>
        </div>
      </Form>
    </div>
    <!-- 本次已归档合同列表标题 -->
    <Cell title="本次已归档合同列表" >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <!-- 右边文字 -->
        <span class="custom-title">本次已归档数量:   {{totalScanned}}</span>
      </template>
    </Cell>
    <!-- 列表名称 -->
    <CardName :data="columnNames" :num="columnNames.length"></CardName>
  <!-- </Sticky> -->
    <!-- <Card :data="["合同编号", "合同名称", "归档时间"]" :num="3"></Card> -->
    <!-- 列表名称 -->
    <div class="listH" >
      <List
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad" 
      >
        <Card v-for="item in list" :key="item" :data="[item.contractno, item.contractName, item.fileTime]" :num="3"></Card>
        <!-- <Grid v-for="item in list" :key="item" :column-num="columnNames.length">
          <GridItem :text="item.contractno" />
          <GridItem :text="item.contractName" />
          <GridItem :text="item.fileTime" />
        </Grid> -->
      </List>
    </div>
  </div>
</template>

<style scoped>
.time .van-field__label{ color:var(--van-gray-6);}
.listH{
   height:calc( 100vh - 500px) ;
    overflow-y: auto;}

</style>
