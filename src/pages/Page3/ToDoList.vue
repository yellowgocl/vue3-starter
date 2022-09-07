<script setup>
    import { onMounted, reactive, ref, watch } from 'vue';
    import { MultValueError } from '@/beans/error';

    const list = reactive(['2', '3'])
    const value = ref()
    const emit = defineEmits(['change', 'add'])
    
    const onChange = (v) => {
        // console.info(v)
        emit('change', v)
    }
    const onAdd = () => {
        const has = list?.some((v) => v === value.value)
        emit('add', value, has)
        if (!has) {
            list.push(value.value)
        } else {
            const v = value.value
            value.value = null
            throw new MultValueError(`列表内已經存在了[${v}]`)
        }
    }
</script>

<template>
    <h1>To do list</h1>
    <a-input-search
      v-model:value="value"
      placeholder="input to do value"
      @change="onChange"
      @search="onAdd">
      <template #enterButton>
        <a-button :disabled="!value">Add</a-button>
      </template>
    </a-input-search>
    <slot name="error"></slot>
    <a-list bordered :data-source="list">
        <template #renderItem="{ item }">
            <a-list-item>{{ item }}</a-list-item>
        </template>
    </a-list>
</template>