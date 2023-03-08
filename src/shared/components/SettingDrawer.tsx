import { FC, useState } from 'react'
import { Button, Drawer, FloatButton, Radio, Space, Typography } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import { useWindowSize } from 'react-use'
import { ColorSchemeToggle } from './ColorSchemeToggle'
import { FontFamilyPicker } from './FontFamilyPicker'
import { LeftSideIcon } from './LeftSideIcon'
import { ColorPalette } from './ColorPalette'
import { CompactMode } from './CompactMode'

export const SettingDrawer: FC = () => {
  const [open, setOpen] = useState(false)
  const { width } = useWindowSize()
  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  const drawerWidth = width < 425 ? '100%' : '325px'
  return (
    <>
      <FloatButton
        shape='square'
        icon={<SettingOutlined />}
        style={{ top: '50%', right: -10, height: '40px', width: '40px' }}
        type='primary'
        onClick={showDrawer}
      />

      <Drawer
        title='General style customization'
        placement='right'
        width={drawerWidth}
        onClose={onClose}
        open={open}
        closable={drawerWidth === '100%'}
      >
        <Space direction='vertical' size={20} style={{ width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 57 }}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Color mode
            </Typography.Title>
            <ColorSchemeToggle />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 30 }}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Compact mode
            </Typography.Title>
            <CompactMode />
          </div>

          <div>
            <Typography.Title level={5}>Font family</Typography.Title>
            <FontFamilyPicker />
          </div>
          <div>
            <Typography.Title level={5}>Color palette</Typography.Title>
            <ColorPalette />
          </div>
          <div>
            <Typography.Title level={5}>Drawer placement</Typography.Title>
          </div>
        </Space>
      </Drawer>
    </>
  )
}
