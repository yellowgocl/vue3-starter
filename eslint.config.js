import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    rules: {
      'no-console': 'off',
    },
    globals: {
      $loadingBar: true,
      $message: true,
      defineOptions: true,
      $dialog: true,
      $notification: true,
      EffectScope: true,
      computed: true,
      createApp: true,
      customRef: true,
      defineAsyncComponent: true,
      defineComponent: true,
      effectScope: true,
      getCurrentInstance: true,
      getCurrentScope: true,
      h: true,
      inject: true,
      isProxy: true,
      isReactive: true,
      isReadonly: true,
      isRef: true,
      markRaw: true,
      nextTick: true,
      onActivated: true,
      onBeforeMount: true,
      onBeforeUnmount: true,
      onBeforeUpdate: true,
      onDeactivated: true,
      onErrorCaptured: true,
      onMounted: true,
      onRenderTracked: true,
      onRenderTriggered: true,
      onScopeDispose: true,
      onServerPrefetch: true,
      onUnmounted: true,
      onUpdated: true,
      provide: true,
      reactive: true,
      readonly: true,
      ref: true,
      resolveComponent: true,
      shallowReactive: true,
      shallowReadonly: true,
      shallowRef: true,
      toRaw: true,
      toRef: true,
      toRefs: true,
      triggerRef: true,
      unref: true,
      useAttrs: true,
      useCssModule: true,
      useCssVars: true,
      useRoute: true,
      useRouter: true,
      useSlots: true,
      watch: true,
      watchEffect: true,
      watchPostEffect: true,
      watchSyncEffect: true,
    },
  },
  {
    ignores: [
      '**/public',
      'src/services/mocks',
      './dist',
      './package.json',
    ],
  },
)
