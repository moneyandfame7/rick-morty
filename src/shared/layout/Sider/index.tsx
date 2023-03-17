import { FC, useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import LocationSearchingIcon from '@mui/icons-material/LocationSearching'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import MovieIcon from '@mui/icons-material/Movie'
const mainItems = [
  { key: '1', icon: <SmartToyIcon />, label: 'Characters' },
  { key: '2', icon: <MovieIcon />, label: 'Episodes' },
  { key: '3', icon: <LocationSearchingIcon />, label: 'Locations' }
]
export const Sider: FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      style={{ backgroundColor: theme.useToken().token.colorBgContainer }}
      trigger={null}
    >
      <Menu
        mode='inline'
        items={mainItems}
        style={{ backgroundColor: theme.useToken().token.colorBgContainer, borderInlineEnd: 'none' }}
      />
    </Layout.Sider>
  )
}
