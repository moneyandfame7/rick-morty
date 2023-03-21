import { Select } from 'antd'
import React, { FC, useRef } from 'react'
import { BaseSelectRef } from 'rc-select/lib/BaseSelect'

interface ItemsType {
  value: string
  label?: string
}

interface SelectItemsProps {
  items: ItemsType[]
  placeholder?: string
  style?: React.CSSProperties
}

export const SelectItems: FC<SelectItemsProps> = ({ items, placeholder, ...style }) => {
  const selectRef = useRef<BaseSelectRef>(null)
  return (
    <Select
      className='zIndex-for-antd-select'
      ref={selectRef}
      mode='multiple'
      placeholder={placeholder}
      showArrow
      showSearch={false}
      options={items}
      onSelect={(value, option) => {
        selectRef.current?.blur()
      }}
      style={{ width: '200px' }}
    />
  )
}
