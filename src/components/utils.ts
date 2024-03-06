import { Coordinate, PointData } from '../types/common'

export const formatCoordinate = ({ lat, lng }: Coordinate): string => {
  const latDegrees = Math.floor(lat)
  const latMinutes = Math.floor((lat - latDegrees) * 60)
  const latSeconds =
    Math.round(((lat - latDegrees) * 3600 - latMinutes * 60) * 100) / 100

  const lngDegrees = Math.floor(lng)
  const lngMinutes = Math.floor((lng - lngDegrees) * 60)
  const lngSeconds =
    Math.round(((lng - lngDegrees) * 3600 - lngMinutes * 60) * 100) / 100

  return `${latDegrees}°${latMinutes}’${latSeconds}”N ${lngDegrees}°${lngMinutes}’${lngSeconds}”E`
}

export const generateRandomNumber = (): string => {
  let result = ''
  for (let i = 0; i < 5; i++) {
    result += Math.floor(Math.random() * 10)
  }

  return `39-${result}`
}

export const getSavedMarkers = () => {
  const savedMarkersJSON = localStorage.getItem('markers')
  const savedMarkers: PointData[] = savedMarkersJSON
    ? JSON.parse(savedMarkersJSON)
    : []
  return savedMarkers
}
