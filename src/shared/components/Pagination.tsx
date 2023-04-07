import React, { type FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Pagination as MuiPagination, useMediaQuery } from '@mui/material'

interface PaginationProps {
  currentPage: number
  pages: number
}

export const Pagination: FC<PaginationProps> = ({ currentPage, pages }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const onPaginationChange = (e: React.ChangeEvent<unknown>, page: number) => {
    searchParams.set('page', String(page))
    const search = Object.fromEntries(new URLSearchParams(searchParams))
    setSearchParams(search)
  }
  const isMobile = useMediaQuery('(max-width:485px)')
  const isTablet = useMediaQuery('(max-width:768px)')
  return (
    <Box component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MuiPagination
        showFirstButton
        showLastButton
        count={pages}
        color="secondary"
        shape="rounded"
        variant="outlined"
        onChange={onPaginationChange}
        size={isMobile ? 'small' : 'medium'}
        page={currentPage}
        siblingCount={isMobile ? 0 : isTablet ? 1 : 4}
      />
    </Box>
  )
}
