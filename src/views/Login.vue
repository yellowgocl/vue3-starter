
<script setup>
import { ref, defineAsyncComponent, computed } from 'vue'
import { Icon,  Button, Field, CellGroup ,Row,Space ,Form,Divider} from 'vant';

//const value = ref('');
//console.log("value",value)
const username = ref('');
const onSubmit = (values) => {
  console.log('submit', values, username.value);

};
</script>
<template>
  <div class="index main_space" >
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
            <Button  block type="primary" native-type="submit">
              提交
            </Button>
          </div>
        </Form>
    
    
  </div>
</template>

<style>
.iconStyle{margin: 0 auto;}
</style>
