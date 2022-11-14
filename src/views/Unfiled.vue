
<script setup>
import { ref, defineAsyncComponent, computed } from 'vue'
import { Calendar,Cell,DatetimePicker,Popup} from 'vant';
import {useRouter} from 'vue-router'
import moment from 'moment'; 

    const date = ref('');
    const show = ref(false);

    const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
    const onConfirm = (values) => {
      const [start, end] = values;
      show.value = false;
      date.value = `${formatDate(start)} - ${formatDate(end)}`;
    };


</script>
<template>
  <div>
    <Cell value="搜索条件" />
    <Form @failed="onFailed" @submit="onSubmit">
      <CellGroup inset>
        <van-field
            v-model="date"
            is-link
            readonly
            name="datetimePicker"
            label="呈批时间"
            placeholder="点击选择时间"
            @click="show = true"
          />
      </CellGroup>
      <Popup v-model:show="showPicker" position="bottom">
      <DatetimePicker
        type="time"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </Popup>
      <Cell title="选择日期区间" :value="date" @click="show = true" />
      <Calendar v-model:show="show" color="#1989fa" type="range" @confirm="onConfirm" :round="false" />
    </Form>
      
  </div>
</template>

<style>
.iconStyle{margin: 0 auto;}
.listH{ height: calc( 100vh - 27.4rem) ; overflow-y: auto;}
</style>
