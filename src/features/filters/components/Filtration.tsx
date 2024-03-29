import React, { type FC, useState } from 'react'
import { isEqual } from 'lodash'
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Stack, Tooltip, Typography } from '@mui/material'
import TuneIconOutlined from '@mui/icons-material/TuneOutlined'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined'

import type { Filters, FiltersTypes, FiltersValues } from 'features/filters/types'
import { getInputByType } from 'features/filters/utils'
import { useFiltration } from 'features/filters/hooks'

import { wordFromUpperCase } from 'shared/utils'
import { PrimaryButton, OutlinedButton } from 'shared/components/common/buttons'

interface FiltrationProps {
  filters: Filters
}

export const Filtration: FC<FiltrationProps> = ({ filters }) => {
  const { formValues, formInitialValues, onReset, queryStringObj, formik } = useFiltration(filters.values)

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const handleClickOpen = () => {
    setIsOpenModal(true)
  }
  const handleClose = () => {
    setIsOpenModal(false)
  }
  return (
    <>
      <Tooltip title="Filters">
        <Button
          size="small"
          color="primary"
          sx={{
            width: 'max-content',
            p: 1.5,
            borderRadius: 4,
            position: 'fixed',
            top: '50%',
            right: -20,
            pr: 4
          }}
          variant="contained"
          onClick={handleClickOpen}
          disableRipple
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
          <Typography variant="body2" fontWeight={500} sx={{ opacity: 0.7 }}>
            Search by species, status, name, etc...
          </Typography>
          <TuneIconOutlined sx={{ opacity: 0.7 }} />
        </DialogTitle>
        <DialogContent sx={{ px: 0, pt: '10px !important', pb: '0px !important' }}>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            {/* Show all inputs */}
            {Object.keys(filters.values).map(key => (
              <React.Fragment key={key}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2 }}>
                  <Typography variant="body2" fontWeight={500} sx={{ opacity: 0.7 }}>
                    {wordFromUpperCase(key)}
                  </Typography>
                  {getInputByType(filters.type[key as keyof FiltersTypes], key as keyof FiltersValues, formik)}
                </Stack>
                <Divider sx={{ my: 1.5 }} />
              </React.Fragment>
            ))}
            <Box
              component="div"
              sx={{ display: 'flex', p: 1, backgroundColor: 'background.default', justifyContent: 'space-between' }}
            >
              <OutlinedButton
                startIcon={<BackspaceOutlinedIcon sx={{ width: 14 }} />}
                variant="outlined"
                onClick={onReset}
                disabled={isEqual(formValues, formInitialValues)}
              >
                Reset all filters
              </OutlinedButton>
              <PrimaryButton type="submit" disabled={isEqual(queryStringObj, formValues)}>
                Apply filters
              </PrimaryButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
