import { Col, Radio, RadioChangeEvent, Row, Select, Space } from 'antd'
import { FontFamily } from 'application'
import { useAppDispatch, useAppSelector } from 'application/store'
import { selectCustomization } from 'application/theme/customization.selector'
import { setFontFamily } from 'application/theme/customization.slice'
import { FC } from 'react'

export const FontFamilyPicker: FC = () => {
  const fontFamily = useAppSelector(selectCustomization).fontFamily
  const dispatch = useAppDispatch()
  const onChange = (value: string) => {
    console.log(value)
    dispatch(setFontFamily(value))
  }

  const radioChange = (e: RadioChangeEvent) => {
    dispatch(setFontFamily(e.target.value))
  }
  return (
    <>
      <Radio.Group onChange={radioChange} value={fontFamily} style={{ width: '100%' }}>
        <Row justify='center' align='middle'>
          <Col span={24}>
            <Radio value={FontFamily.DEFAULT}>Default</Radio>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Radio value={FontFamily.INTER}>Inter</Radio>
          </Col>
          <Col span={12}>
            <Radio value={FontFamily.POPPINS}>Poppins</Radio>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Radio value={FontFamily.ROBOTO}>Roboto</Radio>
          </Col>
          <Col span={12}>
            <Radio value={FontFamily.OPEN_SANS}>Open Sans</Radio>
          </Col>
        </Row>
        {/* <Select
          defaultValue={fontFamily}
          onChange={onChange}
          style={{ width: 120 }}
          options={[
            { value: FontFamily.DEFAULT, label: 'Default' },
            { value: FontFamily.INTER, label: 'Inter' },
            { value: FontFamily.POPPINS, label: 'Poppins' },
            { value: FontFamily.ROBOTO, label: 'Roboto' },
            { value: FontFamily.OPEN_SANS, label: 'Open Sans' }
          ]}
        /> */}
      </Radio.Group>
    </>
  )
}
