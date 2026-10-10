import { simulate, type Pt } from '../../lib/physics/kinematics'

export const route: Pt[] = [
  { x: 0, y: 0 },
  { x: 300, y: 0 },
  { x: 300, y: 200 },
  { x: 0, y: 200 },
]
export const VMAX = 10
export const ACC = 2
export const data = simulate(route, VMAX, ACC)