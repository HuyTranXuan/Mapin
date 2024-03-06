export const INITIAL_LAT = 60.16651385487605
export const INITIAL_LNG = 24.90170135767169

export const START_YEAR = 1990
export const END_YEAR = 2024

export const CATEGORY = [
  'Manhole',
  'categoryItem1',
  'categoryItem2',
  'categoryItem3',
  'categoryItem4',
]

export const LABEL_SIZE = [
  'Medium (default)',
  'labelSizeItem1',
  'labelSizeItem2',
  'labelSizeItem3',
  'labelSizeItem4',
]

export const INSTALL_YEAR: string[] = []
for (let year = START_YEAR; year <= END_YEAR; year++) {
  INSTALL_YEAR.push(String(year))
}

export const USAGE_STATE = [
  'Planned',
  'usageStateItem1',
  'usageStateItem2',
  'usageStateItem3',
  'usageStateItem4',
]

export const OWNER = ['Owner 1', 'Owner 2', 'Owner 3', 'Owner 4', 'Owner 5']
