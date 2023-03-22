import React, { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Box, Pagination as MuiPagination } from '@mui/material'

interface PaginationProps {
  currentPage: number
  pages: number
}

export const Pagination3: FC<PaginationProps> = ({ currentPage, pages }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const onPaginationChange = (e: React.ChangeEvent<unknown>, page: number) => {
    searchParams.set('page', String(page))
    const search = Object.fromEntries(new URLSearchParams(searchParams))
    setSearchParams(search)
  }
  return (
    <Box component='div' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MuiPagination
        showFirstButton
        showLastButton
        count={pages}
        shape='rounded'
        variant='outlined'
        onChange={onPaginationChange}
        size='small'
        page={currentPage}
      />
    </Box>
  )
}
