import { FC } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Pagination as MuiPagination } from '@mui/material'
import { useLocation } from 'react-router'
import { useIsSomethingLoading } from '../../application/store/selectors'

interface PaginationProps {
  currentPage: number
  pages: number
}

export const Pagination3: FC<PaginationProps> = ({ currentPage, pages }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const isLoading = useIsSomethingLoading()
  const location = useLocation()
  return (
    <Box component='div' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <MuiPagination
        showFirstButton
        showLastButton
        disabled={isLoading}
        count={pages}
        shape='rounded'
        variant='outlined'
        onChange={(e, page) => {
          searchParams.set('page', String(page))
          const search = Object.fromEntries(new URLSearchParams(searchParams))

          setSearchParams(search)
        }}
        page={currentPage}
      />
    </Box>
  )
}
