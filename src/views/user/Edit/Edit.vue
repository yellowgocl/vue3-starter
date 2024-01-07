<script setup>
import { useUserStore } from '@/store'

const userStore = useUserStore()
const { avatar, name, phone } = userStore

const formRef = ref(null)
const model = ref({
  name,
  phone,
})
const rules = {
  phone: [
    {
      required: true,
      validator(_, value) {
        if (!value)
          return new Error('Age is required')

        return true
      },
      trigger: ['input', 'blur'],
    },
  ],
  name: {
    required: true,
    validator(rule, value) {
      if (!value)
        return new Error('Age is required')

      return true
    },
    trigger: ['input', 'blur'],
  },
}
</script>

<template>
  <common-page>
    <n-space vertical size="large" h-full>
      <article mt-16>
        <n-space justify="center" relative>
          <div relative>
            <n-avatar
              circle
              class="h-[96px] w-[96px]"
              :src="avatar"
            />
            <n-button size="small" type="info" circle absolute bottom-0 right-0>
              <template #icon>
                <n-icon>
                  <icon-mdi-pencil />
                </n-icon>
              </template>
            </n-button>
          </div>
        </n-space>
      </article>
      <n-layout mb-6 mt-12>
        <n-layout-content px-2>
          <n-form ref="formRef" :model="model" :rules="rules">
            <n-form-item path="name" label="Name">
              <n-input v-model:value="model.name" @keydown.enter.prevent />
            </n-form-item>
            <n-form-item path="phone" label="Phone number">
              <n-input
                v-model:value="model.phone"
                @keydown.enter.prevent
              />
            </n-form-item>
          </n-form>
        </n-layout-content>
      </n-layout>
    </n-space>
    <n-button type="primary" size="large" round mx-12>
      {{ $t('user.edit.confirm') }}
    </n-button>
  </common-page>
</template>
