import { useEffect, useState } from 'react'
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  MutationDefinition,
  QueryDefinition
} from '@reduxjs/toolkit/dist/query'
import { UseLazyQuery, UseMutation } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import _ from 'lodash'

import { GridRowSelectionModel } from '@mui/x-data-grid'

import { useSnackbar } from 'shared/components'
import { AlertProps } from '@mui/material'

interface UseTableProps<DeleteArg, DeleteResult, UpdateArg, UpdateResult, GetArg, GetResult> {
  useRemove: UseMutation<
    MutationDefinition<
      DeleteArg,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      DeleteResult,
      'api'
    >
  >
  useUpdate: UseMutation<
    MutationDefinition<
      UpdateArg,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      never,
      UpdateResult,
      'api'
    >
  >
  useGet: UseLazyQuery<
    QueryDefinition<GetArg, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, never, GetResult, 'api'>
  >
  setSnackbar: React.Dispatch<React.SetStateAction<Pick<AlertProps, 'children' | 'severity'> | null>>
  onUpdateSuccessMessage?: string
  onUpdateErrorMessage?: string
}

export const useTable = <DeleteArg, DeleteResult, UpdateArg, UpdateResult extends { id: any }, GetArg, GetResult>({
  useGet,
  useUpdate,
  useRemove,
  setSnackbar,
  onUpdateSuccessMessage = 'Operation "update" - success!',
  onUpdateErrorMessage = 'Operation "update" - failed!'
}: UseTableProps<DeleteArg, DeleteResult, UpdateArg, UpdateResult, GetArg, GetResult>) => {
  const [remove, { isLoading: isRemoveLoading, error: onRemoveError }] = useRemove()
  const [update, { isLoading: isUpdateLoading, error: onUpdateError }] = useUpdate()
  const [get, { isLoading: isGetLoading, data }] = useGet()

  const [selected, setSelected] = useState<string[]>([])

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0
  })

  const processRowUpdate = async (newRow: UpdateResult, oldRow: UpdateResult) => {
    if (_.isEqual(newRow, oldRow)) {
      return oldRow
    }
    const updated = _.pickBy(newRow, (value, key) => {
      return !_.isEqual(value, oldRow[key as never])
    })
    const info = await update({ id: newRow.id, updated } as any)
    if ('data' in info) {
      setSnackbar({ children: onUpdateSuccessMessage, severity: 'success' })
      await handleUpdate()
      return info.data
    }

    setSnackbar({ children: onUpdateErrorMessage, severity: 'error' })
    return oldRow
  }

  const onSelect = (model: GridRowSelectionModel) => {
    setSelected(model as string[])
  }

  const onRemove = async () => {
    const info = await remove(selected as any)
    if ('data' in info) {
      setSnackbar({ children: 'User successfully removed', severity: 'success' })
      await handleUpdate()
    } else {
      setSnackbar({ children: 'User removing failed', severity: 'error' })
    }
  }

  const handleUpdate = async () => {
    await get({ ...paginationModel } as any)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      await handleUpdate()
    })()
  }, [])

  return {
    isLoading: isGetLoading || isRemoveLoading || isUpdateLoading,
    onRemove,
    onSelect,
    handleUpdate,
    processRowUpdate,
    paginationModel,
    setPaginationModel,
    data,
    selected,
    error: onUpdateError || onRemoveError
  }
}
