import { FC, useRef } from 'react'
import { Box, Button, Grid, Paper, Typography, useTheme } from '@mui/material'
import { ConfigProvider, Input, Select, Tag, theme as antdTheme } from 'antd'
import { BaseSelectRef, CustomTagProps } from 'rc-select/lib/BaseSelect'
import { SelectItems } from './SelectItems'
import 'antd/dist/reset.css'
import { IPageInformation } from 'shared/types'

const statuses = [{ value: 'Alive' }, { value: 'Dead' }, { value: 'unknown', label: 'Unknown' }]
const genders = [
  { value: 'Male' },
  { value: 'Female' },
  { value: 'Genderless' },
  { value: 'unknown', label: 'Unknown' }
]
const species = [
  { value: 'Human' },
  { value: 'Alien' },
  { value: 'Animal' },
  { value: 'Cronenberg' },
  { value: 'Humanoid' },
  { value: 'Mythological Creature' }
]
type ColorStatusField = 'Alive' | 'Dead' | 'Unknown'
const colorStatus = {
  Alive: 'green',
  Dead: 'red',
  Unknown: 'grey'
}

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }
  const myLabel: ColorStatusField = label as any
  return (
    <Tag
      color={colorStatus[myLabel]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  )
}

const SelectStatus: FC = () => {
  const selectRef = useRef<BaseSelectRef>(null)

  return (
    <Select
      ref={selectRef}
      mode='multiple'
      placeholder='Status'
      showArrow
      tagRender={tagRender}
      showSearch={false}
      style={{ width: '100%' }}
      options={statuses}
      onSelect={(value, option) => {
        selectRef.current?.blur()
      }}
    />
  )
}
interface FiltersProps {
  info: IPageInformation | undefined
}
export const Filters: FC<FiltersProps> = ({ info }) => {
  const theme = useTheme()
  return (
    <Paper component='div' variant='outlined' sx={{ p: 2, borderRadius: 4 }}>
      <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant='body1' fontWeight={600} fontSize={22}>
          Filters
        </Typography>

        <Button size='small' variant='contained' sx={{ fontWeight: 600 }}>
          Apply filters
        </Button>
      </Box>

      <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <Grid
          container
          spacing={1}
          rowGap={1}
          sx={{
            justifyContent: 'space-between'
          }}
          height='max-content'
        >
          <Grid item xs={6} sm={3} display='flex' justifyContent='center'>
            <Input
              placeholder='Name'
              style={{
                width: '100%'
              }}
            />
          </Grid>

          <Grid item xs={6} sm={3} display='flex' justifyContent='center'>
            <SelectItems items={genders} placeholder='Gender' />
          </Grid>
          <Grid item xs={6} sm={3} display='flex' justifyContent='center'>
            <SelectStatus />
          </Grid>
          <Grid item xs={6} sm={3} display='flex' justifyContent='center'>
            <SelectItems items={species} placeholder='Species' />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}
