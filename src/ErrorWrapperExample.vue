<script setup>
    import { onMounted, onUpdated, ref, computed } from 'vue'
    
    import HelloWorld from './components/HelloWorld.vue'
    import ErrorWrapper from './components/ErrorWrapper.vue';
    import { ERROR_TYPES, DIRECTION } from '@/constants/types'
    
    const errorWrapper = ref()
    onMounted(() => {
      console.info(errorWrapper.value)
    })
    const reset = computed(() => {
      return errorWrapper.value.reset
    })
    const onError = (innerError) => {
      console.info(innerError.message, innerError?.message.indexOf('Vite + God'))
      return innerError?.message.indexOf('Vite + God') >= 0
    }
    
    const onErrorRoot = (innerError) => {
      console.error(innerError)
    }
    
    </script>
    
    <template>
    <ErrorWrapper :onError="onErrorRoot" :type="ERROR_TYPES.PARTS_START" :direction="DIRECTION.COLUMN">
        <ErrorWrapper :onError="onError" ref="errorWrapper" :type="ERROR_TYPES.PARTS_START" :direction="DIRECTION.COLUMN">
          <template v-slot:error="{ error, reset }" >
            <span class="error-tips">{{error}}</span>
            <button @click="reset">clear error by error slot</button>
          </template>
          <HelloWorld msg="Vite + Color" />
          <HelloWorld msg="Vite + God" />
          <button @click="reset">clear error by default slot</button>
        </ErrorWrapper>
      </ErrorWrapper>
</template>
    
<style scoped>
    .error-tips{
      color: red;
    }
</style>
    