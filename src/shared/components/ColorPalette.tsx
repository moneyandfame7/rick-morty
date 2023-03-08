import { CheckOutlined } from '@ant-design/icons'
import { Col, Radio, RadioChangeEvent, Row, theme } from 'antd'
import { useAppDispatch } from 'application/store'
import { setPrimaryColor } from 'application/theme/customization.slice'
import { useState } from 'react'
import { ColorResult, TwitterPicker } from 'react-color'
export const ColorPalette = () => {
  const token = theme.useToken()
  const dispatch = useAppDispatch()
  const onChange = (color: ColorResult, e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(color, e)
    dispatch(setPrimaryColor(color.hex))
  }
  return (
    // <Radio.Group onChange={onChange}>
    //   <Row gutter={16}>
    //     <Col className='gutter-row' span={4}>
    //       <Radio.Button
    //         style={{
    //           background: 'red',
    //           border: 'none',
    //           borderRadius: 3,
    //           width: 20,
    //           height: 20,
    //           padding: '2px 2px',
    //           color: 'white',
    //           position: 'relative'
    //         }}
    //         value={'#123123'}
    //       >
    //         <CheckOutlined style={{ fontSize: 12, position: 'absolute', top: '30%', left: '30%' }} />
    //       </Radio.Button>
    //     </Col>
    //     <Col className='gutter-row' span={4}>
    //       <div>col-6</div>
    //     </Col>
    //     <Col className='gutter-row' span={4}>
    //       <div>col-6</div>
    //     </Col>
    //     <Col className='gutter-row' span={4}>
    //       <div>col-6</div>
    //     </Col>
    //     <Col className='gutter-row' span={4}>
    //       <div>col-6</div>
    //     </Col>
    //     <Col className='gutter-row' span={4}>
    //       <div>col-6</div>
    //     </Col>
    //   </Row>
    // </Radio.Group>
    <TwitterPicker
      onChange={onChange}
      color='red'
      triangle='hide'
      styles={{
        default: {
          body: {
            backgroundColor: 'transparent'
          },
          card: {
            backgroundColor: 'transparent'
          },
          input: {
            backgroundColor: token.token.colorPrimary,
            color: token.token.colorText,
            borderColor: 'red'
          }
        }
      }}
    />
  )
}
