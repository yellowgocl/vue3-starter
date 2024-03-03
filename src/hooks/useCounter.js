import { ref } from 'vue'

/**
 * @callback IncreaseCall
 * @param {number} [delta=1] delta
 * @returns {number} increased value
 */

/**
 * @callback DecreaseCall
 * @param {number} [delta=1] delta
 * @returns {number} decreased value
 */

/**
 * @callback SetValueCall
 * @param {number} value value
 * @returns {number} value
 */

/**
 * @callback ResetValueCall
 * @param {number} [value] value
 * @returns {number} value
 */

/**
 * @typedef {object} Actions
 * @property {IncreaseCall} inc increse the value
 * @property {DecreaseCall} dec decrese the value
 * @property {SetValueCall} set set the value
 * @property {ResetValueCall} reset reset the value, default initial value from pass in hook
 */

/**
 *
 * @param {number} initial
 * @returns {[import('vue').Ref<number>, Actions]} an array for mon counter state
 */

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
