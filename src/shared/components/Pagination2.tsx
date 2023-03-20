import { FC, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import _ from 'lodash'

import { Box, Typography, useTheme, Button as MuiButton } from '@mui/material'
import { Button, ConfigProvider, Form, InputNumber, theme as antdTheme } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { IPageInformation } from 'shared/types'

interface PaginationProps {
  info: IPageInformation | undefined
  isFetching: boolean
}
export const Pagination2: FC<PaginationProps> = ({ info, isFetching }) => {
  const theme = useTheme()
  const [searchParams, setSearchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || info?.page || 1

  const currentTake = Number(searchParams.get('take')) || info?.take || 20
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      page: currentPage,
      take: currentTake
    })
  }, [currentPage, currentTake])

  const onFinish = (values: any) => {
    const search = Object.fromEntries(new URLSearchParams(searchParams))
    setSearchParams(search)
  }
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.palette.mode === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm
      }}
    >
      <Box component='div'>
        <Form component='form' onFinish={onFinish} form={form}>
          <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant='body1' fontWeight={600} fontSize={22}>
              Pagination
            </Typography>

            <Form.Item>
              <MuiButton disabled={isFetching} size='small' variant='contained' sx={{ fontWeight: 600 }} type='submit'>
                Apply
              </MuiButton>
            </Form.Item>
          </Box>
          <Box
            component='div'
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
          >
            <Box component='div' sx={{ display: { xs: 'block', sm: 'flex' }, gap: 1, alignItems: 'center' }}>
              <Typography variant='body2' fontWeight={500} fontSize={13} textAlign='center'>
                Entries per page
              </Typography>
              <Form.Item name='take' initialValue={currentTake}>
                <InputNumber
                  disabled={isFetching}
                  style={{ width: 60 }}
                  min={1}
                  value={currentTake}
                  onChange={value => {
                    if (value) {
                      searchParams.set('take', `${value}`)
                      form.setFieldValue('take', value)
                    }
                  }}
                  max={50}
                  keyboard
                />
              </Form.Item>
            </Box>
            <Box component='div' sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormItem>
                <Button
                  disabled={!!!info?.prev || isFetching}
                  size='small'
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  icon={<LeftOutlined style={{ fontSize: 10 }} />}
                  onClick={() => {
                    searchParams.set('page', `${currentPage - 1}`)
                    const search = Object.fromEntries(new URLSearchParams(searchParams))

                    setSearchParams(search)
                  }}
                />
              </FormItem>
              <Typography fontWeight={600} fontSize={13}>
                {currentPage}
              </Typography>
              <Form.Item>
                <Button
                  disabled={!!!info?.next || isFetching}
                  size='small'
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  icon={<RightOutlined style={{ fontSize: 10 }} />}
                  onClick={() => {
                    searchParams.set('page', `${currentPage + 1}`)
                    const search = Object.fromEntries(new URLSearchParams(searchParams))

                    setSearchParams(search)
                  }}
                />
              </Form.Item>
            </Box>
            <Box component='div' sx={{ display: { xs: 'block', sm: 'flex' }, gap: 1, alignItems: 'center' }}>
              <Typography variant='body2' fontWeight={500} fontSize={13} textAlign='center'>
                Page
              </Typography>
              <Form.Item name='page' initialValue={currentPage}>
                <InputNumber
                  disabled={isFetching}
                  style={{ width: 60 }}
                  min={1}
                  value={currentPage}
                  max={info?.pages}
                  keyboard
                  onChange={value => {
                    if (value) {
                      searchParams.set('page', `${value}`)
                      form.setFieldValue('page', value)

                      // const search = Object.fromEntries(new URLSearchParams(searchParams))

                      // setSearchParams(search)
                    }
                  }}
                />
              </Form.Item>
            </Box>
          </Box>
        </Form>
      </Box>
    </ConfigProvider>
  )
}
