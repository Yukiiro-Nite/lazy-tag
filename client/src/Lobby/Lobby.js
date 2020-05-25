// import h from 'hyperscript'
import { createRoom } from '../utils/createRoom'
import { HuePicker } from '../HuePicker/HuePicker'

const width = 10
const height = 3
const depth = 10

const Lobby = () => {
  return createRoom(
    [0, height / 2, 0],
    [width, height, depth],
    {},
    {
      color: 'gray',
      floor: {color: 'white'},
      ceiling: {color: 'black'}
    },
    [
      HuePicker()
    ]
  )
}

export default Lobby