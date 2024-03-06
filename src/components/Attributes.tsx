import { Stack, Divider } from '@mui/material'
import {
  Coordinate,
  Marker,
  PointData,
  SelectedObject,
  SetState,
} from '../types/common'
import { ActionIcon, CancelIcon, ColorPickerIcon, DropdownIcon } from './Icon'
import { useEffect, useState } from 'react'
import Select from './Select'
import {
  CATEGORY,
  LABEL_SIZE,
  INSTALL_YEAR,
  USAGE_STATE,
  OWNER,
} from '../constants'
import { generateRandomNumber, getSavedMarkers } from './utils'

type AttributesProps = {
  selectedCoordinate: Coordinate
  setSelectedObject: SetState<SelectedObject>
  setSelectedCoordinate: SetState<Coordinate | undefined>
  setMarkers: SetState<Marker[]>
  selectedMarker?: Marker
  setSelectedMarker: SetState<Marker | undefined>
}

const Attributes = (props: AttributesProps) => {
  const {
    selectedCoordinate,
    setSelectedObject,
    setMarkers,
    selectedMarker,
    setSelectedCoordinate,
    setSelectedMarker,
  } = props
  const [category, setCategory] = useState<string>('')
  const [labelSize, setLabelSize] = useState<string>('0')
  const [installYear, setInstallYear] = useState<string>('0')
  const [usageState, setUsageState] = useState<string>('0')
  const [owner, setOwner] = useState<string>('0')
  const [id, setId] = useState<string>(generateRandomNumber())

  const closeAttributesModal = () => {
    resetInput()
    !selectedMarker &&
      setMarkers((p) =>
        p.filter(
          (marker) =>
            !(
              marker.geocode[0] == selectedCoordinate.lat &&
              marker.geocode[1] == selectedCoordinate.lng
            )
        )
      )
  }

  useEffect(() => {
    const savedMarker = getSavedMarkers().find(
      (m) =>
        m.coordinate.lat === selectedCoordinate.lat &&
        m.coordinate.lng === selectedCoordinate.lng
    )
    if (savedMarker) {
      setId(savedMarker.id)
      setCategory(savedMarker.category)
      setLabelSize(savedMarker.labelSize)
      setInstallYear(savedMarker.installYear)
      setUsageState(savedMarker.usageState)
      setOwner(savedMarker.owner)
    }
  }, [selectedMarker])

  const isSaveAble = Boolean(
    category && labelSize && installYear && usageState && owner
  )

  const resetInput = () => {
    setId(generateRandomNumber())
    setCategory('')
    setLabelSize('0')
    setInstallYear('0')
    setUsageState('0')
    setOwner('0')
    setSelectedCoordinate(undefined)
    setSelectedMarker(undefined)
    setSelectedObject(SelectedObject.None)
  }

  const onSave = () => {
    let savedMarkers = getSavedMarkers()
    const data: PointData = {
      coordinate: selectedCoordinate,
      id,
      category,
      labelSize,
      installYear,
      usageState,
      owner,
    }
    const savedMarker = savedMarkers.find(
      (m) =>
        m.coordinate.lat === selectedCoordinate.lat &&
        m.coordinate.lng === selectedCoordinate.lng
    )
    if (!savedMarker) savedMarkers.push(data)
    else {
      savedMarkers = savedMarkers.map((m) => {
        if (
          m.coordinate.lat === selectedCoordinate.lat &&
          m.coordinate.lng === selectedCoordinate.lng
        )
          return data
        else return m
      })
    }

    localStorage.setItem('markers', JSON.stringify(savedMarkers))
    resetInput()
  }

  const onDiscard = () => {
    const savedMarkers = getSavedMarkers()
    const updatedMarkers = savedMarkers.filter(
      (m) =>
        m.coordinate.lat !== selectedCoordinate.lat &&
        m.coordinate.lng !== selectedCoordinate.lng
    )

    localStorage.setItem('markers', JSON.stringify(updatedMarkers))
    resetInput()
    setMarkers((p) =>
      p.filter(
        (marker) =>
          !(
            marker.geocode[0] == selectedCoordinate.lat &&
            marker.geocode[1] == selectedCoordinate.lng
          )
      )
    )
  }

  return (
    <div className='attributes modal'>
      <Stack>
        <Stack direction={'row'} className='header'>
          <div className='attributes-title modal-item'>
            <Select
              value={category}
              options={CATEGORY}
              placeHolder='Select category'
              className='category-select'
              onChange={(e) => {
                setCategory(e.target.value)
              }}
            />
          </div>
          <div className='hint-button'>
            <ActionIcon />
            <CancelIcon onClick={closeAttributesModal} />
          </div>
        </Stack>
        <Divider />
        <div className='label'>Label size</div>
        <Stack direction={'row'} className='header'>
          <div className='attributes-title modal-item'>
            <Select
              value={labelSize}
              options={LABEL_SIZE}
              defaultValue={'0'}
              className='label-select'
              onChange={(e) => {
                setLabelSize(e.target.value)
              }}
            />
          </div>
          <div className='hint-button'>
            <ColorPickerIcon />
          </div>
        </Stack>
        <Divider />
        <div className='label'>Settings</div>
        <Stack direction={'row'} className='modal-item'>
          <Stack className='small-selector-container' spacing={0.5}>
            <p>Identifier</p>
            <input value={id} disabled className='select small-input' />
          </Stack>
          <Stack className='small-selector-container' spacing={0.5}>
            <p>Install year</p>
            <Select
              value={installYear}
              options={INSTALL_YEAR}
              defaultValue={'0'}
              className='small-selector year-select'
              onChange={(e) => {
                setInstallYear(e.target.value)
              }}
            />
          </Stack>
        </Stack>
        <Stack direction={'row'} className='modal-item'>
          <Stack className='small-selector-container' spacing={0.5}>
            <p>Usage state</p>
            <Select
              value={usageState}
              options={USAGE_STATE}
              defaultValue={'0'}
              className='small-selector'
              onChange={(e) => {
                setUsageState(e.target.value)
              }}
            />
          </Stack>
          <Stack className='small-selector-container' spacing={0.5}>
            <p>Owner</p>
            <Select
              value={owner}
              options={OWNER}
              defaultValue={'0'}
              className='small-selector'
              onChange={(e) => {
                setOwner(e.target.value)
              }}
            />
          </Stack>
        </Stack>
        <Stack direction={'row'} className='more-settings'>
          <div className='label more-setting-title'>More settings</div>
          <DropdownIcon className='more-setting-icon' />
        </Stack>
        <Stack
          direction={'row'}
          className='modal-item'
          spacing={1}
          justifyContent={'flex-end'}
          paddingRight={'12px'}
        >
          <button className='small-button' onClick={onDiscard}>
            Discard
          </button>
          <button
            className='small-button'
            disabled={!isSaveAble}
            onClick={onSave}
          >
            Save
          </button>
        </Stack>
      </Stack>
    </div>
  )
}

export default Attributes
