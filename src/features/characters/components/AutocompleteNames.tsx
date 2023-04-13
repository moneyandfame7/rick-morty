import React, { useEffect, useMemo, useState } from 'react'
import { Autocomplete, CircularProgress, debounce, TextField } from '@mui/material'

import { useGetCharactersNamesMutation } from '@features/characters/services'

export const AutocompleteNames = () => {
  const [fetchNames, { data, isLoading }] = useGetCharactersNamesMutation()
  const [value, setValue] = React.useState<string | null>(null)
  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = useState<readonly string[]>([])
  const onInputChange = async (value: string) => {
    if (value.length) {
      await fetchNames(value)
      if (data) {
        setOptions(data)
      }
    }
  }
  const fetch = useMemo(() => debounce(onInputChange, 400), [])

  useEffect(() => {
    let active = true
    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      await fetch(inputValue)
      if (active) {
        let newOptions: readonly string[] = []

        if (value) {
          newOptions = [value]
        }

        if (data) {
          newOptions = [...newOptions, ...data]
        }

        setOptions(newOptions)
        active = false
      }
    })()
  }, [value, inputValue, fetch])

  return (
    <>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300 }}
        filterOptions={x => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        getOptionLabel={option => option}
        noOptionsText="No options"
        renderInput={params => (
          <TextField
            {...params}
            label="Asynchronous"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              )
            }}
          />
        )}
        loading={isLoading}
        onChange={(event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
          setOptions(newValue ? [newValue, ...options] : options)
          setValue(newValue)
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
      />
    </>
  )
}
