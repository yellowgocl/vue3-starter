<script setup>
    import { onMounted, reactive, ref, watch } from 'vue';
    import { DeleteOutlined } from '@ant-design/icons-vue';
    import { MultValueError } from '@/beans/error';

    const list = reactive(['2', '3'])
    const value = ref()
    const emit = defineEmits(['change', 'add', 'remove'])
    
    const onChange = (v) => {
        // console.info(v)
        emit('change', v)
    }
    const onRemove = (e) => {
        const value = e?.currentTarget?.dataset?.itemValue
        const index = list.indexOf(value)
        if (index < 0) return

        list.splice(index, 1)
        emit('remove', value. list)
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
            <a-list-item>
                <div class="item">
                    <span>{{ item }}</span>
                    <a-button :data-item-value="item" @click="onRemove"><template #icon><delete-outlined /></template></a-button>
                </div>
            </a-list-item>
        </template>
    </a-list>
</template>

<style scoped>
.item {
    display: flex;
    width: 100%;
    align-items: center;
}
.item>*:first-child{
    flex: 1;
}
</style>