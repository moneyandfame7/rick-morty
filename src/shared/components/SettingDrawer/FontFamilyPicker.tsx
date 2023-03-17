import { ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'application/store'
import { FontFamily } from 'application/theme'
import { selectCustomization, setFontFamily } from 'application/theme/customization'
const fontItems = [
  {
    id: 0,
    value: FontFamily.DEFAULT,
    label: 'Default'
  },
  {
    id: 1,
    value: FontFamily.POPPINS,
    label: 'Poppins'
  },
  {
    id: 2,
    value: FontFamily.ROBOTO,
    label: 'Roboto'
  },
  {
    id: 3,
    value: FontFamily.IBM_PLEX,
    label: 'IBM Plex'
  }
]
export const FontFamilyPicker = () => {
  const smallViewport = useMediaQuery('(max-width:600px)')
  const dispatch = useAppDispatch()
  const fontFamily = useAppSelector(selectCustomization).fontFamily
  const handleChange = (event: React.MouseEvent<HTMLElement>, fontFamily: FontFamily | null) => {
    if (fontFamily !== null) {
      dispatch(setFontFamily(fontFamily))
    }
  }
  return (
    <ToggleButtonGroup
      value={fontFamily}
      exclusive
      onChange={handleChange}
      orientation={smallViewport ? 'vertical' : 'horizontal'}
    >
      {fontItems.map(item => (
        <ToggleButton key={item.id} value={item.value} sx={{ fontFamily: item.value }}>
          {item.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
