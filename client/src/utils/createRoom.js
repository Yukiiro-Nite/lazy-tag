import {get, omit} from 'lodash'
import h from 'hyperscript'

const wallDepth = 0.05 // 5cm
/**
 * Creates a closed room centered on the at position of the given sizes
 * @param {number[]} at - [x, y, z] coords to center the room at
 * @param {number[]} size - [width, height, depth] size of the room
 * @param {object} parentAttrs - an object of attrs to spread on to the a-entity parent of the room.
 * @param {object} subAttrs - an object of attrs to spread onto the walls and floors.
 * Example: {color: 'red', floor: {color: 'gray'}, ceiling: {color: 'black'}}
 * @param {any[]} children - a list of elements to put in the room
 */
export const createRoom = (at, size, parentAttrs = {}, subAttrs = {}, children = []) => {
  const [cx, cy, cz] = at
  const [width, height, depth] = size
  const groupAttrs = omit(subAttrs, ['floor', 'leftWall', 'rightWall', 'forwardWall', 'backWall', 'ceiling'])
  const floorAttrs = { ...groupAttrs, ...get(subAttrs, 'floor', {}) }
  const leftWallAttrs = { ...groupAttrs, ...get(subAttrs, 'leftWall', {}) }
  const rightWallAttrs = { ...groupAttrs, ...get(subAttrs, 'rightWall', {}) }
  const forwardWallAttrs = { ...groupAttrs, ...get(subAttrs, 'forwardWall', {}) }
  const backWallAttrs = { ...groupAttrs, ...get(subAttrs, 'backWall', {}) }
  const ceilingAttrs = { ...groupAttrs, ...get(subAttrs, 'ceiling', {}) }

  const floor = h('a-box', {
    attrs: {
      width,
      height: wallDepth,
      depth,
      position: {
        x: 0,
        y: -height / 2,
        z: 0
      },
      ...floorAttrs
    }
  })

  const leftWall = h('a-box', {
    attrs: {
      width: wallDepth,
      height,
      depth,
      position: {
        x: -width / 2,
        y: 0,
        z: 0
      },
      ...leftWallAttrs
    }
  })

  const rightWall = h('a-box', {
    attrs: {
      width: wallDepth,
      height,
      depth,
      position: {
        x: width / 2,
        y: 0,
        z: 0
      },
      ...rightWallAttrs
    }
  })

  const forwardWall = h('a-box', {
    attrs: {
      width,
      height,
      depth: wallDepth,
      position: {
        x: 0,
        y: 0,
        z: -depth / 2,
      },
      ...forwardWallAttrs
    }
  })

  const backWall = h('a-box', {
    attrs: {
      width,
      height,
      depth: wallDepth,
      position: {
        x: 0,
        y: 0,
        z: depth / 2,
      },
      ...backWallAttrs
    }
  })

  const ceiling = h('a-box', {
    attrs: {
      width,
      height: wallDepth,
      depth,
      position: {
        x: 0,
        y: height / 2,
        z: 0
      },
      ...ceilingAttrs
    }
  })

  return h('a-entity',
    {
      attrs: {
        position: {x: cx, y: cy, z: cz},
        ...parentAttrs
      }
    },
    [
      floor,
      leftWall,
      rightWall,
      forwardWall,
      backWall,
      ceiling,
      ...children
    ]
  )
}