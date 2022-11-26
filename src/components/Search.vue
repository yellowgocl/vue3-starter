<script setup>
import { ref, defineAsyncComponent, defineEmits, computed, defineProps } from 'vue'
import { Calendar,Icon,Col,  Button, Field, CellGroup ,Row,Space ,Form,Cell,Toast,Divider,List,Grid, GridItem,PullRefresh} from 'vant';
import {useRouter} from 'vue-router'
import Title from '@/components/Title.vue'
import moment from 'moment'
const props = defineProps({
    title:{
      type: String, default: () => ""
    },
    modelValue: {
      type: Array, default: () => []
    },
    disabled: {
      type: Boolean, default: () => false
    }
}) 
//const submit = ref(props.onSubmit);
const show = ref(false);

const dateStart = computed(() => props.modelValue?.[0])
const dateEnd = computed(() => props.modelValue?.[1])
const date = computed(() => props.modelValue?.join(' - '))

const emit = defineEmits(['submit', 'update:modelValue'])

const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const onConfirm = (values) => {
  const [start, end] = values;
  //console.log("date",start,end,moment().format())
  show.value = false;
  emit('update:modelValue', [
    moment(start).format('YYYY-MM-DD'),
    moment(end).format('YYYY-MM-DD'),
  ])
};
const onSubmit=(values)=>{
  console.log('submit', props.mockValue);

  // submit.value=values
  emit('submit', props.mockValue)
  
}
const onFailed=(errorInfo)=>{
  console.log('failed', errorInfo);
}
</script>
<template>
  <div>
    <Title :value="props.title"></Title>
    <!-- <Cell :value="props.title" /> -->
    <Form @failed="onFailed" @submit="onSubmit" style="margin-top: 10px;">
       <CellGroup inset>
        <Row justify="center">
          <Col span="18" class="rowRight">
            <Field
              :disabled="disabled"
              v-model="date"
              is-link
              readonly
              name="datetimePicker"
              label="呈批时间"
              placeholder="点击选择时间"
              @click="show = true"
              :rules="[{required: true, message: '请点击选择时间' }]"
            />
          </Col>
          <Col span="5">
            <Button :disabled="disabled" block type="primary" native-type="submit" class="buttonStyle">
              提交
            </Button>    
          </Col>
       </Row>
      </CellGroup>
      <Calendar v-model:show="show" color="#1989fa" type="range" @confirm="onConfirm" :round="false" />
    </Form>
  </div>
</template>

<style>
/* .rowRight{ margin:0 .4rem;} */
.rowRight .van-field__label{width: auto;}
.rowRight .van-field__value{width:180px;}
/* .buttonStyle{margin-right: 0.2rem;} */
.rowRight .van-cell--clickable{ padding: var(--van-cell-vertical-padding) .3rem;}
</style>