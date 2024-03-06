export interface SetState<T> extends React.Dispatch<React.SetStateAction<T>> {}

export type Coordinate = {
  lat: number
  lng: number
}

export type Marker = {
  geocode: [number, number]
}

export type PointData = {
  coordinate: Coordinate
  id: string
  category: string
  labelSize: string
  installYear: string
  usageState: string
  owner: string
}

export enum SelectedObject {
  None = 0,
  Text,
  Point,
  Line,
  Polygon,
  Note,
  More,
}
