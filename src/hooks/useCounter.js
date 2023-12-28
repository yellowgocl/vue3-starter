import { ref } from 'vue'

function useCounter(initial = 1) {
  const count = ref(initial)
  const inc = (delta = 1) => (count.value += delta)
  const dec = (delta = 1) => (count.value -= delta)

  const set = value => (count.value = value)
  const reset = (value = initial) => {
    initial = value
    return set(value)
  }

  const actions = { inc, dec, set, reset }
  return [count, actions]
}

export default useCounter
