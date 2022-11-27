
<script setup>
import { ref, defineAsyncComponent, computed, watch } from 'vue'
import { Icon, Button, Field, CellGroup ,Row, Space, Form, Divider, Notify,Toast } from 'vant';
import { useRouter } from 'vue-router'
import { useService, usePromise, useRetry, useApi } from '@/hooks'
const username = ref('');
const router = useRouter();
const services = useService()
const [promiseWrapper, loginState, loginActions] = useApi(services.login)
const onSubmit = async (values) => {
  try {
    const data = await promiseWrapper({ account: username.value })
    sessionStorage.setItem('staff', JSON.stringify({...data, account: username.value }))
    router.replace({ path: '/' })
  } catch (e) {
    // Notify({ type: 'danger', message: e?.message, position: 'bottom' });
    Toast(e?.error?.message);
    throw e
  }
};

// const [retryWrapper, retryState] = useRetry(onSubmit)

</script>
<template>
  <div class="index main_space" >
    {{retryState}}
    <!-- <Icon name="chat-o" color="#1989fa" size="40"></Icon> -->
    <!-- <van-icon name="friends" /> -->
    <!-- <van-icon name="user-circle-o" /> -->
    
        <Row justify="center" class="spaceUp_3">
          <Icon name="user-circle-o" color="#f28a67" size="200"/>
        </Row>
        
        <Form @submit="onSubmit" class="spaceUp_2">
          <CellGroup inset>
            <Field
              v-model="username"
              name="输入工号"
              label="输入工号"
              placeholder="请输入工号"
              :border="true"
              :rules="[{ required: true, message: '请输入工号' }]"
            />
          </CellGroup>
          <Divider />
          <div style="margin:20px 16px;">
            <Button :loading="loginState.isPending"  :disabled="loginState.isPending" block type="primary" native-type="submit">
              {{loginState.isRejected ? "请重试" : "提交"}}
            </Button>
          </div>
        </Form>
  </div>
</template>

<style>
.iconStyle{margin: 0 auto;}
</style>
