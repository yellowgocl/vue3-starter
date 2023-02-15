const LAYER_MODE = Object.freeze({
    E: 'EDIT',
    V: 'MOVE AND SELECT TOOLS',
})

const LAYER_KEY_MAP = Object.freeze({
    [LAYER_MODE.E]: { ctrl: false, code: 'e', focus: true },
    [LAYER_MODE.V]: { ctrl: false, code: 'v', focus: true },
})

export { LAYER_KEY_MAP, LAYER_MODE }
export default { LAYER_KEY_MAP, LAYER_MODE }