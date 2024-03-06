import { useEffect, useRef } from 'react'
import L, { divIcon } from 'leaflet'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  Coordinate,
  Marker as TMarker,
  SelectedObject,
  SetState,
} from '../types/common'
import { INITIAL_LAT, INITIAL_LNG } from '../constants'
import { MarkerIcon } from './Icon'

type MapProps = {
  setCoordinate: SetState<Coordinate>
  selectedObject: SelectedObject
  setSelectedObject: SetState<SelectedObject>
  selectedCoordinate: Coordinate | undefined
  setSelectedCoordinate: SetState<Coordinate | undefined>
  markers: TMarker[]
  setMarkers: SetState<TMarker[]>
  selectedMarker: TMarker | undefined
  setSelectedMarker: SetState<TMarker | undefined>
  trackingCoordiate: Boolean
  setTrackingCoordiate: SetState<Boolean>
}

const Map = (props: MapProps) => {
  const selectedObjectRef = useRef<SelectedObject>(SelectedObject.None)
  const trackingCoordiateRef = useRef<Boolean>(false)
  const selectedMarkerRef = useRef<Boolean>(false)

  useEffect(() => {
    selectedObjectRef.current = props.selectedObject
    trackingCoordiateRef.current = props.trackingCoordiate
  }, [props.selectedObject, props.trackingCoordiate])

  useEffect(() => {
    selectedMarkerRef.current = Boolean(props.selectedMarker)
  }, [props.selectedMarker])

  useEffect(() => {
    if (props.selectedCoordinate)
      props.setMarkers((p) => [
        ...p,
        {
          geocode: [
            props.selectedCoordinate!.lat,
            props.selectedCoordinate!.lng,
          ],
        },
      ])
  }, [props.selectedCoordinate])

  const handleMouseMove = (e: L.LeafletMouseEvent) => {
    if (trackingCoordiateRef.current)
      props.setCoordinate({ lat: e.latlng.lat, lng: e.latlng.lng })
  }

  const handleClick = (e: L.LeafletMouseEvent) => {
    if (
      selectedObjectRef.current === SelectedObject.Point &&
      !selectedMarkerRef.current
    ) {
      props.setSelectedObject(SelectedObject.None)
      props.setSelectedCoordinate({ lat: e.latlng.lat, lng: e.latlng.lng })
      props.setTrackingCoordiate(false)
    }
  }
  const iconMarkup = renderToStaticMarkup(<MarkerIcon />)

  const customMarkerIcon = divIcon({
    html: iconMarkup,
    iconSize: [40, 40],
    className: 'marker',
  })

  return (
    <MapContainer
      center={[INITIAL_LAT, INITIAL_LNG]}
      zoom={17}
      style={{ height: '100%' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {props.markers.map((marker) => (
        <Marker
          icon={customMarkerIcon}
          position={marker.geocode}
          key={marker.geocode[0]}
          eventHandlers={{
            click: (e) => {
              props.setSelectedMarker(
                props.markers.find(
                  (marker) =>
                    marker.geocode[0] == e.latlng.lat &&
                    marker.geocode[1] == e.latlng.lng
                )
              )
              props.setSelectedObject(SelectedObject.Point)
            },
          }}
        ></Marker>
      ))}
      <MapComponent
        handleClick={handleClick}
        handleMouseMove={handleMouseMove}
      />
    </MapContainer>
  )
}

const MapComponent = ({
  handleClick,
  handleMouseMove,
}: {
  handleClick: (e: L.LeafletMouseEvent) => void
  handleMouseMove: (e: L.LeafletMouseEvent) => void
}) => {
  const map = useMapEvents({
    click: (e) => {
      handleClick(e)
    },
    mousemove: (e) => {
      handleMouseMove(e)
    },
  })
  return null
}

export default Map
