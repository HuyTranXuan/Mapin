import { Stack, Divider } from '@mui/material'
import { Coordinate, SelectedObject, SetState } from '../types/common'
import { AddPointIcon, CancelIcon } from './Icon'
import { formatCoordinate } from './utils'

type HintProps = {
  coordinate: Coordinate
  setSelectedObject: SetState<SelectedObject>
}

const Hint = (props: HintProps) => {
  const { coordinate, setSelectedObject } = props
  const closeHintModal = () => {
    setSelectedObject(SelectedObject.None)
  }

  return (
    <div className='hint modal'>
      <Stack>
        <Stack direction={'row'} className='header'>
          <div style={{ paddingTop: '18px', paddingLeft: '16px' }}>
            <AddPointIcon />
            <div className='hint-title'>Add point</div>
          </div>
          <div className='hint-button'>
            <CancelIcon onClick={closeHintModal} />
          </div>
        </Stack>
        <Divider />
        <div className='text'>Click on the map to drop the point</div>
        <div className='location'>Location</div>
        <div className='coordinate'>{formatCoordinate(coordinate)}</div>
      </Stack>
    </div>
  )
}

export default Hint
