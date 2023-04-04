import React, { FC } from 'react'
import { Box, Button, Grid, Skeleton } from '@mui/material'

interface SkeletonListProps {
  count: number
}

export const SkeletonList: FC<SkeletonListProps> = ({ count }) => {
  return (
    <Grid container spacing={2}>
      {Array.from(Array(count).keys()).map(index => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Box
            component='div'
            sx={{
              p: 2,
              border: '1px solid',
              borderColor: 'primary.border',
              borderRadius: 1
            }}
          >
            <div style={{ paddingBottom: '10px' }}>
              <Skeleton width='45%' animation='wave' />
              <Skeleton width='30%' animation='wave' />
            </div>
            <Skeleton variant='rectangular' width='100%' sx={{ borderRadius: '8px' }} animation='wave'>
              <div style={{ minHeight: '160px', maxHeight: '200px' }} />
            </Skeleton>
            <Box component='div' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ paddingTop: '10px', width: '100%' }}>
                <Skeleton width='20%' animation='wave' />
                <Skeleton width='30%' animation='wave' />
              </div>
              <Skeleton animation='wave'>
                <Button>Show more</Button>
              </Skeleton>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}
