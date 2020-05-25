import h from 'hyperscript'
import hueWheel from '../HuePicker/hueWheel.png'

export const Assets = () => {
  return h('a-assets', [
    h('img', {attrs: {id: 'hueWheel', src: hueWheel}})
  ])
}