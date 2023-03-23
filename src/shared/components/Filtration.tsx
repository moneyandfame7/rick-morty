import { FC, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { omitBy, isEmpty, isEqual, pick } from 'lodash'
import { useFormik } from 'formik'
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Stack, Tooltip, Typography } from '@mui/material'
import TuneIconOutlined from '@mui/icons-material/TuneOutlined'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined'

import { NumberInput } from './Form/NumberInput'
import { SelectInput } from './Form/SelectInput'
import { TextInput } from './Form/TextInput'

const MAX_PER_PAGE = 50
const MIN_PER_PAGE = 1
const statuses = ['Alive', 'Dead', 'unknown']
const genders = ['Male', 'Female', 'Genderless', 'unknown']
const species = ['Human', 'Alien', 'Animal', 'Cronenberg', 'Humanoid', 'Mythological Creature']

interface CharacterFilters {
  status: string
  species: string
  gender: string
  name: string
  take: string
}

export const Filtration: FC = () => {
  const onSubmit = (filters: CharacterFilters) => {
    Object.keys(filters).map((key: string) => {
      if (String(filters[key as keyof CharacterFilters]).length) {
        searchParams.set(key, String(filters[key as keyof CharacterFilters]))
      }
    })
    const query = Object.fromEntries(new URLSearchParams(searchParams))
    setSearchParams(query)
  }
  const onReset = () => {
    Object.keys(formik.values).map((key: string) => {
      if (formik.values[key as keyof CharacterFilters].length) {
        key === 'take' ? formik.setFieldValue('take', '20') : formik.setFieldValue(key, '')

        if (searchParams.has(key)) {
          key === 'take' ? searchParams.set('take', '20') : searchParams.delete(key)
        }
      }
    })
    const query = Object.fromEntries(new URLSearchParams(searchParams))
    setSearchParams(query)
  }
  const [searchParams, setSearchParams] = useSearchParams()

  const formik = useFormik<CharacterFilters>({
    initialValues: {
      status: searchParams.get('status') || '',
      species: searchParams.get('species') || '',
      gender: searchParams.get('gender') || '',
      name: searchParams.get('name') || '',
      take: searchParams.get('take') || '20'
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit
  })
  const formValues = omitBy(formik.values, isEmpty)
  const formInitialValues = omitBy(formik.initialValues, isEmpty)

  const queryStringObj = pick(Object.fromEntries(new URLSearchParams(searchParams)), [
    'take',
    'gender',
    'name',
    'species',
    'status'
  ])
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const handleClickOpen = () => {
    setIsOpenModal(true)
  }

  const handleClose = () => {
    setIsOpenModal(false)
  }
  return (
    <>
      <Tooltip title='Filters'>
        <Button
          size='small'
          color='primary'
          sx={{
            width: 'max-content',
            p: 1.5,
            borderRadius: 4,
            position: 'fixed',
            top: '50%',
            right: -20,
            pr: 4
          }}
          variant='contained'
          onClick={handleClickOpen}
        >
          <TuneIconOutlined />
        </Button>
      </Tooltip>
      <Dialog
        open={isOpenModal}
        onClose={handleClose}
        PaperProps={{
          sx: {
            border: '1px solid',
            borderColor: 'primary.border',
            minWidth: { xs: '100%', sm: 500 }
          }
        }}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: 'blur(8px)'
            }
          }
        }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: 'background.default',
            py: 1,
            userSelect: 'none',
            px: 2
          }}
        >
          <Typography variant='body2' fontWeight={500} sx={{ opacity: 0.7 }}>
            Search by species, status, name, etc...
          </Typography>
          <TuneIconOutlined sx={{ opacity: 0.7 }} />
        </DialogTitle>
        <DialogContent sx={{ px: 0, pt: '10px !important', pb: '0px !important' }}>
          <Box component='form' onSubmit={formik.handleSubmit} noValidate>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ px: 2 }}>
              <Typography variant='body2' fontWeight={500} sx={{ opacity: 0.7 }}>
                Name
              </Typography>
              <TextInput
                id='name'
                name='name'
                onChange={formik.handleChange}
                value={formik.values.name}
                sx={{ width: 200 }}
              />
            </Stack>

            <Divider sx={{ my: 1.5 }} />
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ px: 2 }}>
              <Typography variant='body2' fontWeight={500} sx={{ opacity: 0.7 }}>
                Genders
              </Typography>
              <SelectInput
                id='gender'
                name='gender'
                onChange={formik.handleChange}
                items={genders}
                value={formik.values.gender}
                sx={{ width: 200 }}
              />
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ px: 2 }}>
              <Typography variant='body2' fontWeight={500} sx={{ opacity: 0.7 }}>
                Statuses
              </Typography>

              <SelectInput
                id='status'
                name='status'
                onChange={formik.handleChange}
                items={statuses}
                value={formik.values.status}
                sx={{ width: 200 }}
              />
            </Stack>
            <Divider sx={{ my: 1.5 }} />

            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ px: 2 }}>
              <Typography variant='body2' fontWeight={500} sx={{ opacity: 0.7 }}>
                Species
              </Typography>

              <SelectInput
                id='species'
                name='species'
                onChange={formik.handleChange}
                items={species}
                value={formik.values.species}
                sx={{ width: 200 }}
              />
            </Stack>

            <Divider sx={{ my: 1.5 }} />

            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ px: 2 }}>
              <Typography variant='body2' fontWeight={500} sx={{ opacity: 0.7 }}>
                Entries per page
              </Typography>
              <NumberInput
                id='take'
                name='take'
                onChange={e => {
                  formik.setFieldValue('take', String(e.target.value))
                }}
                onBlur={e => {
                  const value = parseInt(e.target.value)
                  if (value > MAX_PER_PAGE) {
                    formik.setFieldValue('take', String(MAX_PER_PAGE))
                  } else if (value < MIN_PER_PAGE) {
                    formik.setFieldValue('take', String(MIN_PER_PAGE))
                  }
                }}
                value={formik.values.take}
                sx={{ width: 100 }}
                max={MAX_PER_PAGE}
                min={MIN_PER_PAGE}
              />
            </Stack>

            <Divider sx={{ mt: 1.5 }} />

            <Box
              component='div'
              sx={{ display: 'flex', p: 1, backgroundColor: 'background.default', justifyContent: 'space-between' }}
            >
              <Button
                startIcon={<BackspaceOutlinedIcon sx={{ width: 14 }} />}
                variant='outlined'
                onClick={onReset}
                disabled={isEqual(formValues, formInitialValues)}
              >
                Reset all filters
              </Button>
              <Button
                variant='contained'
                type='submit'
                onClick={() => {
                  // handleClose()
                }}
                disabled={isEqual(queryStringObj, formValues)}
              >
                Apply filters
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
