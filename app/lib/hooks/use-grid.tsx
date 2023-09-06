import {create} from 'zustand'

export enum layoutEnums {
  GRID = 'grid',
  NO_GRID = 'no_grid',
}

interface GridState {
  layout: layoutEnums
  setLayout: (layout: layoutEnums) => void
}

const useGrid = create<GridState>()(set => ({
  layout: layoutEnums.GRID,
  setLayout: layout => set(state => ({layout: layout})),
}))

export default useGrid
