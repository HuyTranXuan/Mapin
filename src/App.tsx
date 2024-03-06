import { useEffect, useState } from 'react'
import './App.css'
import 'leaflet/dist/leaflet.css'
import Stack from '@mui/material/Stack'
import Map from '../src/components/Map'
import Attributes from '../src/components/Attributes'
import Hint from '../src/components/Hint'
import { PointIcon } from './components/Icon'
import { Coordinate, Marker, SelectedObject } from './types/common'
import { INITIAL_LAT, INITIAL_LNG } from './constants'
import { getSavedMarkers } from './components/utils'

const App = () => {
  const initialCoordinate = { lat: INITIAL_LAT, lng: INITIAL_LNG }
  const [markers, setMarkers] = useState<Marker[]>([])
  const [selectedMarker, setSelectedMarker] = useState<Marker>()
  const [coordinate, setCoordinate] = useState<Coordinate>(initialCoordinate)
  const [selectedCoordinate, setSelectedCoordinate] = useState<Coordinate>()
  const [trackingCoordiate, setTrackingCoordiate] = useState<Boolean>(false)
  const [selectedObject, setSelectedObject] = useState<SelectedObject>(
    SelectedObject.None
  )

  useEffect(() => {
    const savedMarkers = getSavedMarkers()
    setMarkers(
      savedMarkers.map((m) => ({
        geocode: [m.coordinate.lat, m.coordinate.lng],
      }))
    )
  }, [])

  const handlePointClick = () => {
    setSelectedObject(SelectedObject.Point)
    setTrackingCoordiate(true)
  }

  const displayHint = selectedObject == SelectedObject.Point

  const renderAttributes = () => {
    if (selectedCoordinate) {
      return (
        <Attributes
          setMarkers={setMarkers}
          selectedCoordinate={selectedCoordinate}
          setSelectedObject={setSelectedObject}
          setSelectedCoordinate={setSelectedCoordinate}
          setSelectedMarker={setSelectedMarker}
        />
      )
    } else if (selectedMarker) {
      return (
        <Attributes
          setMarkers={setMarkers}
          selectedCoordinate={{
            lat: selectedMarker.geocode[0],
            lng: selectedMarker.geocode[1],
          }}
          setSelectedObject={setSelectedObject}
          setSelectedCoordinate={setSelectedCoordinate}
          setSelectedMarker={setSelectedMarker}
          selectedMarker={selectedMarker}
        />
      )
    }
  }

  return (
    <div className='container'>
      {displayHint && (
        <Hint coordinate={coordinate} setSelectedObject={setSelectedObject} />
      )}
      {renderAttributes()}
      <Stack direction={'row'} style={{ height: '100%', width: '100%' }}>
        <div>
          <button onClick={handlePointClick} className='mocked-point-button'>
            <PointIcon />
            <b>Point</b>
          </button>
          <img
            src={'../src/assets/mocked-tool-bar.jpg'}
            alt='Mocked Tool Bar'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ height: '100%', width: '100%' }}>
          <Map
            markers={markers}
            setMarkers={setMarkers}
            setCoordinate={setCoordinate}
            selectedObject={selectedObject}
            setSelectedObject={setSelectedObject}
            selectedCoordinate={selectedCoordinate}
            setSelectedCoordinate={setSelectedCoordinate}
            selectedMarker={selectedMarker}
            setSelectedMarker={setSelectedMarker}
            trackingCoordiate={trackingCoordiate}
            setTrackingCoordiate={setTrackingCoordiate}
          />
        </div>
      </Stack>
    </div>
  )
}

export default App
