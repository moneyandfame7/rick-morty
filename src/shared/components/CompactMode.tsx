import { CompressOutlined, ExpandOutlined } from '@ant-design/icons'
import { Switch } from 'antd'
import { useAppDispatch, useAppSelector } from 'application/store'
import { selectCustomization } from 'application/theme/customization.selector'
import { setCompactAlgorithm } from 'application/theme/customization.slice'

export const CompactMode = () => {
  const compact = useAppSelector(selectCustomization).compactAlgorithm
  const dispatch = useAppDispatch()

  return (
    <Switch
      size='default'
      style={{ width: 50 }}
      onChange={() => {
        dispatch(setCompactAlgorithm(compact ? false : true))
      }}
      unCheckedChildren={<CompressOutlined size={15} style={{ marginTop: '4px' }} />}
      checkedChildren={<ExpandOutlined size={15} />}
      defaultChecked={compact}
    />
  )
}
