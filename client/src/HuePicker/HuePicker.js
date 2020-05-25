import AFRAME from 'aframe'
import {get} from 'lodash'
import h from 'hyperscript'
import { Pipe } from '../Pipe/Pipe'
import { wrappingModulus } from '../utils/wrappingModulus'

AFRAME.registerComponent('hue-picker', {
  schema: {},
  init: function () {
    this.colorIndicator = h('a-cylinder',
      {
        attrs: {
          radius: 0.2,
          height: 0.025,
          rotation: { x: 90, y: 0, z: 0 },
          'segments-radial': 32
        }
      }
    )

    this.needle = h('a-entity', // wrapping entity for needle for easy rotation
      [
        h('a-box', // box from center color indicator to edge
          {
            attrs: {
              width: 0.05,
              height: 0.04,
              depth: 0.55,
              color: 'white',
              position: {x: 0, y: 0, z: -0.5}
            }
          }
        ),
        h('a-box', // top box of needle window
          {
            attrs: {
              width: 0.05,
              height: 0.1,
              depth: 0.35,
              color: 'white',
              position: {x: 0.05, y: 0, z: -0.9}
            }
          }
        ),
        h('a-box', // bottom box of needle window
          {
            attrs: {
              width: 0.05,
              height: 0.1,
              depth: 0.35,
              color: 'white',
              position: {x: -0.05, y: 0, z: -0.9}
            }
          }
        ),
        h('a-box', // outside box of needle window
          {
            attrs: {
              width: 0.1,
              height: 0.1,
              depth: 0.05,
              color: 'white',
              position: {x: 0, y: 0, z: -1.05}
            }
          }
        ),
        h('a-box', // inside box of needle window
          {
            attrs: {
              width: 0.1,
              height: 0.1,
              depth: 0.05,
              color: 'white',
              position: {x: 0, y: 0, z: -.75}
            }
          }
        )
      ]
    )

    this.frame = h('a-entity',
      {
        attrs: {
          rotation: { x: 90, y: 0, z: 0 }
        }
      },
      [
        Pipe({outerRadius: 1.05, innerRadius: 1.0, height: 0.05, segments: 32}),
        Pipe({outerRadius: 0.8, innerRadius: 0.75, height: 0.05, segments: 32}),
        Pipe({outerRadius: 0.25, innerRadius: 0.2, height: 0.05, segments: 32}),
        this.needle
      ]
    )

    this.colorRing = h('a-ring',
      {
        attrs: {
          'radius-outer': 1,
          'radius-inner': 0.8,
          side: 'double',
          src: '#hueWheel',
          height: 512,
          width: 512,
          'data-clickable': true
        },
        onclick: this.changeColor.bind(this)
      },
      [
        this.colorIndicator,
        this.frame
      ]
    )
    this.el.appendChild(this.colorRing)
  },
  update: function () {},
  tick: function () {
    // this.needle.object3D.rotation.y += 0.1
  },
  remove: function () {},
  pause: function () {},
  play: function () {},
  changeColor: function(clickEvent) {
    const uv = clickEvent.detail.intersection.uv
    const angle = Math.atan2(uv.y - 0.5, uv.x - 0.5) - (Math.PI / 2)
    const hue = wrappingModulus(angle, Math.PI * 2) / (Math.PI * 2) * 360
    
    this.needle.object3D.rotation.y = angle
    this.colorIndicator.setAttribute('color', `hsl(${hue}, 100%, 50%)`)
  }
});

export const HuePicker = (attributes = {}, children) => {
  return h('a-entity',
    {
      ...attributes,
      attrs: {
        ...get(attributes, 'attrs', {}),
        'hue-picker': true
      }
    },
    children
  )
}