import { Select } from 'antd'
import { FC, useRef } from 'react'
import { BaseSelectRef } from 'rc-select/lib/BaseSelect'

interface ItemsType {
  value: string
  label?: string
}

interface SelectItemsProps {
  items: ItemsType[]
  placeholder: string
}
export const SelectItems: FC<SelectItemsProps> = ({ items, placeholder }) => {
  const selectRef = useRef<BaseSelectRef>(null)

  return (
    <Select
      ref={selectRef}
      mode='multiple'
      placeholder={placeholder}
      showArrow
      showSearch={false}
      style={{ width: '100%', height: '100%' }}
      options={items}
      onSelect={(value, option) => {
        selectRef.current?.blur()
      }}
      
    />
  )
}
