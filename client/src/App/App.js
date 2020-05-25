import aframe from 'aframe'
import h from 'hyperscript'
import { Assets } from '../Assets/Assets'
import Lobby from '../Lobby/Lobby'

const App = () => h('a-scene',
  {
    attrs: {
      cursor: {rayOrigin: 'mouse'},
      raycaster: {raycaster: {interval: 30, objects: ['data-clickable']}}
    }
  },
  [
    Assets(),
    Lobby()
  ]
)

export default App