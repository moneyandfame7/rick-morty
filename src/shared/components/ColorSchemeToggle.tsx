import React, { FC } from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from 'application/store'
import { selectCustomization } from 'application/theme/customization.selector'
import { setMode } from 'application/theme/customization.slice'
import { Switch } from 'antd'
export const ColorSchemeToggle: FC = () => {
  const mode = useAppSelector(selectCustomization).mode
  const dispatch = useAppDispatch()
  const isDarkMode = mode === 'dark'

  return (
    <Switch
      size='default'
      style={{ width: 50, display: 'block', alignItems: 'center' }}
      onChange={() => {
        dispatch(setMode(isDarkMode ? 'light' : 'dark'))
      }}
      unCheckedChildren={<MdLightMode size={15} />}
      checkedChildren={<MdDarkMode size={15} style={{ marginTop: '2.5px' }} />}
      defaultChecked={isDarkMode}
    />
  )
}
