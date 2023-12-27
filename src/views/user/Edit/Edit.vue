<script setup>
import { isString, isObject } from 'lodash'
import { useUserStore, usePermissionStore } from '@/store'
const userStore = useUserStore()
const { avatar, name, email, role, phone } = userStore

const formRef = ref(null);
const model = ref({
    name,
    phone,
});
const rules = {
    phone: [
        {
            required: true,
            validator(rule, value) {
            if (!value) {
                return new Error("Age is required");
            }
            return true;
            },
            trigger: ["input", "blur"]
        }
    ],
    name: {
        required: true,
            validator(rule, value) {
            if (!value) {
                return new Error("Age is required");
            }
            return true;
            },
            trigger: ["input", "blur"]
    }
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
                            class='w-[96px] h-[96px]'
                            :src='avatar'>
                        </n-avatar>
                        <n-button size="small" type="info" circle absolute bottom-0 right-0 >
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
                                @input="handlePasswordInput"
                                @keydown.enter.prevent
                            />
                        </n-form-item>
                    </n-form>
                </n-layout-content>
            </n-layout>
            
        </n-space>
        <n-button round type="primary" fixed bottom-12 right-22 left-22>确认修改</n-button>
    </common-page>
</template>