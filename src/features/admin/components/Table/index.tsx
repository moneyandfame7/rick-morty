import React, { type FC } from 'react'
// import dayjs from 'dayjs'

import {
  Paper,
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody
  /* Chip, */
  // Avatar
} from '@mui/material'
import _ from 'lodash'
import { RecentUsers } from '../../type'

export interface Column {
  field: string
  headerName: string
}
export interface NeedToFormatValues {
  field: string
  implement: (row: RecentUsers) => React.ReactNode
}

interface TableProps {
  data: RecentUsers[]
  excludedFields: Array<keyof RecentUsers>
  needToFormat: Array<NeedToFormatValues>
}
export function excludeByFields<T>(arr: Column[], excludedFields: Array<keyof T>): Column[] {
  return arr.filter(item => {
    for (const field of excludedFields) {
      if (item.field === field) {
        return false
      }
    }
    return true
  })
}
export const Table: FC<TableProps> = ({ data, excludedFields, needToFormat }) => {
  function formatValues<T extends object>(data: T[], needToFormat: Array<NeedToFormatValues>) {
    return data.map(row => {
      const formatted = needToFormat.map(format => ({
        [format.field]: format.implement(row as RecentUsers)
      }))
      const transformedFormattedValues = formatted.reduce((acc, curr) => Object.assign(acc, curr), {})
      return {
        ...row,
        ...transformedFormattedValues
      }
    })
  }
  function transformData<T extends object>(
    data: T[],
    excludeKey: Array<keyof T>,
    needToFormat: Array<NeedToFormatValues>
  ) {
    /* заготовка колонок */
    const unexcludedColumns = Object.keys(data[0]).map(key => ({
      field: key,
      /* Capitalized word */
      headerName:
        key === 'username'
          ? 'User'
          : key.replace(/_/g, ' ').replace(/(?:^|\s)\S/g, (match: string) => match.toUpperCase())
    }))

    const columns = excludeByFields<T>(unexcludedColumns, excludeKey)

    const unexcludedRows = formatValues(data, needToFormat)
    const rows = unexcludedRows.map(user => _.omit(user, excludeKey))

    console.log({ rows, columns })
    return {
      columns,
      rows
    }
  }

  const { rows, columns } = transformData(data, excludedFields, needToFormat)

  return (
    <TableContainer
      component={Paper}
      sx={{ borderRadius: '12px', userSelect: 'none', mt: 2, maxHeight: 350, overflowY: 'scroll' }}
    >
      <MuiTable aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell
                key={index}
                sx={{ fontSize: 16, fontWeight: 500, color: 'text.primary' }}
                align={!index ? 'left' : 'right'}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map((col, colIndex) => (
                <TableCell align={colIndex ? 'right' : 'left'} key={colIndex} sx={{ color: 'text.secondary' }}>
                  {row[col.field as never]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}
