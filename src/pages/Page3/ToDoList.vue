<script setup>
    import { onMounted, reactive, ref, watch } from 'vue';
    import { DeleteOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons-vue';
    import { MultValueError } from '@/beans/error';
    import findIndex from 'lodash/findIndex'

    const list = reactive([{ value: '2', lock: false }, { value: '3', lock: true }])
    const value = ref()
    const emit = defineEmits(['change', 'add', 'remove', 'lock'])

    const onChange = (v) => {
        emit('change', v)
    }
    const onRemove = (e) => {
        const value = e?.currentTarget?.dataset?.itemValue
        const index = findIndex(list, (v) => v.value === value)
        if (index < 0 || !!list?.[index]?.lock) return

        list.splice(index, 1)
        emit('remove', value, list)
    }
    const onLock = (e) => {
        const value = e?.currentTarget?.dataset?.itemValue
        const index = findIndex(list, (v) => v.value === value)
        if (index < 0) return

        list[index].lock = !list[index]?.lock
        emit('remove', list[index])
    }
    const onAdd = () => {
        const has = list?.some((v) => v.value === value.value)
        emit('add', value, has)
        if (!has) {
            list.push({ value: value.value, lock: false })
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
        <template #renderItem="{item}">
            <a-list-item :class="{lock: item.lock}">
                <div class="item">
                    <span>{{ item.value }}</span>
                    <a-button :data-item-value="item.value" :disabled="item.lock" @click="onRemove">
                        <template #icon><delete-outlined /></template>
                    </a-button>
                    <a-button :data-item-value="item.value" @click="onLock">
                        <template #icon><unlock-outlined v-if="item.lock" /><lock-outlined v-else /></template>
                    </a-button>
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
.lock {
    background-color: rgba(255,0,0,.1);
}
.item>*:first-child{
    flex: 1;
}
.item>*:nth-child(n):not(:first-child){
    margin-left: 12px;
}
</style>