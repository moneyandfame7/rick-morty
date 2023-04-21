import React, { type FC } from 'react'
import CountUp from 'react-countup'

import { Grid, Skeleton } from '@mui/material'
import Typography from '@mui/material/Typography'

import { useGetCount } from 'shared/hooks'

export const Metrics: FC = () => {
  const countOfEntities = useGetCount()

  return (
    <>
      {countOfEntities ? (
        <Grid container sx={{ userSelect: 'none' }}>
          {countOfEntities.map(entity => (
            <Grid
              key={entity.label}
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
            >
              <CountUp end={entity.count} duration={6} delay={0}>
                {({ countUpRef }) => (
                  <Typography ref={countUpRef} fontWeight={600} fontSize={60} color="primary.main" sx={{ mb: -1 }} />
                )}
              </CountUp>
              <Typography variant="body1" fontWeight={500}>
                {entity.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container>
          {Array.from(Array(4).keys()).map(index => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={3}
              sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', p: 1 }}
            >
              <Skeleton width="45%" height="40px" animation="wave" />
              <Skeleton width="20%" animation="wave" />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  )
}
