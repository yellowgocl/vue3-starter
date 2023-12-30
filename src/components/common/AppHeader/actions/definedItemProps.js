export const PRESET = {
  AVATAR: 'app_header_item_avatar_preset',
  SETTING: 'app_header_item_setting_preset',
}
export const TYPE = {
  ROUTE: 'route',
  EXTERNAL_LINK: 'external_link',
}
export const itemProps = {
  color: { type: String },
  size: { type: Number, default: 24 },
  preset: {
    validator(value) {
      return Object.keys(PRESET).includes(value)
    },
  },
  type: {
    validator(value, props) {
      return props?.to || Object.keys(TYPE).includes(value)
    },
    default: (props) => {
      return props?.to ? TYPE.ROUTE : null
    },
  },
  url: {
    type: String,
    default: props => props?.to,
  },
  to: {
    type: String,
  },
}
