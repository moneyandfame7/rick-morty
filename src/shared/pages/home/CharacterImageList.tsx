import React, { FC, useRef } from 'react'
import Box from '@mui/material/Box'
import { ImageList, ImageListItem, Skeleton, useMediaQuery, useTheme } from '@mui/material'
import Image from 'mui-image'

import { useGetManyCharactersQuery } from 'features/characters/services'
import { CircularLoader } from 'shared/components/common'

export const CharacterImageList: FC = () => {
  const theme = useTheme()

  const { data, isFetching, isError, error } = useGetManyCharactersQuery(`page=1&take=46`)
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
            {data.results.map(character => (
              <ImageListItem key={character.image} sx={{ width: '100%' }}>
                <Image
                  src={character.image}
                  alt={character.name}
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
