
<script setup>
import { ref, defineAsyncComponent, computed, watch } from 'vue'
import { Icon,  Button, Field, CellGroup ,Row,Space ,Form,Cell,Toast,Divider,List,Grid, GridItem,Dialog} from 'vant';
import { useRouter } from 'vue-router'
import { debounce, find } from 'lodash'
import moment from 'moment'; 
import Title from '../components/Title.vue'
import { useService, usePromise, usePagination } from '@/hooks'
const contractInfo = ref()
const fileTime = ref('');
const quantity=ref(0);
const list = ref([]);
const loading = ref(false);
const finished = ref(true);
const submitDate=ref({});
const services = useService()
const [fetchState, promiseWrapper] = usePromise()
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
  fetchState.isPending || (!contractno.value || !contractName.value || !appUserName.value )
))

watch(() => fetchState.isPending, (n, o) => {
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
const asyncValidator = async (val) => {
  if (!val) return false
  if (contractInfo.value?.contractno === val) return true
  
  try {
    const { object } = await promiseWrapper(services.numberQuery({ contractno: val }))
    contractInfo.value = { ...object, contractno: val }
    fileTime.value=moment().format('YYYY-MM-DD');
    contractName.value = object.contractName
    appUserName.value = object.appUserName
  } catch (e) {
    console.error(e)
    reSetFromData()
    return false
  }
}
// 添加列表数据
const addList = (val) =>{
    list.value.push(val);
    reSetFromData();
}
const onFailed = (errorInfo) => {
  console.log('failed', errorInfo);
};

const beforeClose = async(action) =>{
  if (action === 'confirm') {
      try {
        Dialog.close()
        const data=submitDate.value
        if (find(list.value, (v) => v.contractno === data.contractno)) {
          reSetFromData();
          throw new Error('列表中已存在!')
        }
        await promiseWrapper(services.contractFiling( data )) 
        addList(data)
      } catch (e) {
        Toast.fail(e?.message);
      }
    } else {
      // 拦截取消操作
      Dialog.close();
    }
}
 
const onLoad = () => list

const onSubmit = (values) => {
  console.log('submit', values);
  submitDate.value=values;
  if (!values) return false
  Dialog.confirm({
    message:
      '此合同是否归档',
    beforeClose,
    confirmButtonColor:"var(--van-primary-color)",
    // theme:'round-button'
  });
};

</script>
<template>
  <div>
    <!-- <Cell value="合同归档信息" /> -->
    <Title :value="'合同归档信息'"></Title>
    <Form @failed="onFailed" @submit="onSubmit">
      <CellGroup inset>
        <!-- 通过 validator 进行异步函数校验 -->
        <Field
          v-model="contractno"
          name="contractno"
          label="合同编号:"
          placeholder=""
          :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
        />
        <!-- 通过 pattern 进行正则校验 -->
        <Field
          v-model="contractName"
          name="contractName"
          label="合同名称:"
          placeholder=""
          :rules="[{ required: true, message: '请填写合同名称' }]"
        />
        <!-- 通过 validator 进行函数校验 -->
        <Field
          v-model="appUserName"
          name="appUserName"
          label="承办人:"
          placeholder=""
          :rules="[{  required: true, message: '请填写承办人' }]"
        />
        <!-- 通过 validator 返回错误提示 -->
        <Field
          v-model="fileTime"
          name="fileTime"
          label="归档时间:"
          placeholder=""
          disabled
        />
        
      </CellGroup>
      <div style="margin: 16px;">
        <Button :disabled="isDisabledSubmitButton" block type="primary" native-type="submit">
          提交
        </Button>
      </div>
    </Form>
  
    <Cell title="本次已归档合同列表" >
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <span class="custom-title">本次已归档数量:   {{totalScanned}}</span>
        <!-- <van-icon name="search" class="search-icon" /> -->
      </template>
    </Cell>
    <Grid :column-num="columnNames.length">
      <GridItem v-for="(item, index) in columnNames" :text="item" :key='item + index'/>
    </Grid>
    <div class="listH">
      <List
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad" 
      >
        <!-- <Cell v-for="item in list" :key="item" :title="item" /> -->
        <Grid v-for="item in list" :key="item" :column-num="columnNames.length">
          <GridItem :text="item.contractno" />
          <GridItem :text="item.contractName" />
          <GridItem :text="item.fileTime" />
        </Grid>
      </List>
    </div>
  </div>
</template>

<style scoped>
.iconStyle{margin: 0 auto;}
.listH{ height: calc( 100vh - 27.4rem) ; overflow-y: auto;}
.van-field--disabled .van-field__label{color:var(--van-field-label-color);}
</style>
