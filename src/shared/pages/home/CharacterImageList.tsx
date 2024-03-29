import React, { type FC } from 'react'
import Box from '@mui/material/Box'
import { ImageList, ImageListItem, Skeleton, useMediaQuery, useTheme } from '@mui/material'
import Image from 'mui-image'

import { useGetCharactersImagesQuery } from 'features/characters/services'
import { CircularLoader } from 'shared/components/common'

export const CharacterImageList: FC = () => {
  const theme = useTheme()

  const { data, isFetching } = useGetCharactersImagesQuery()
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      {!isFetching && data ? (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            p: 1,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <ImageList
            variant="masonry"
            sx={{
              columnCount: {
                xs: '1 !important',
                sm: '3 !important',
                md: '5 !important'
              },
              width: { xs: '100%', md: 'max-content' }
            }}
            gap={matchDownMd ? 8 : 20}
          >
            {data?.map(image => (
              <ImageListItem key={image} sx={{ width: '100%' }}>
                <Image
                  src={image}
                  alt={'Character image'}
                  duration={300}
                  height="100%"
                  showLoading={<Skeleton width="100%" height="300px" animation="wave" />}
                  style={{
                    borderRadius: 8
                  }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      ) : (
        <CircularLoader />
      )}
    </>
  )
}
