import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { FC } from 'react'

interface ErrorHandlerProps {
  error: FetchBaseQueryError | SerializedError
}
const enum HttpErrorCode {
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
  USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED',
  EMAIL_ALREADY_USED = 'EMAIL_ALREADY_USED',

  CHARACTERS_NOT_FOUND = 'CHARACTERS_NOT_FOUND'
}
export const ErrorHandler: FC<ErrorHandlerProps> = ({ error }) => {
  if ('status' in error) {
    console.log(error)
  } else {
    switch (error.code) {
      case HttpErrorCode.EMAIL_NOT_FOUND:
        break

      default:
        break
    }
  }

  return <></>
}

export const errorHandler = (error: FetchBaseQueryError | SerializedError | undefined) => {
  if (!error) {
    return undefined
  }
  console.log(error, '<<<< errorrrrr...')
  if ('status' in error) {
    /*switch(error.){

    }*/
  } else {
    switch (error.code) {
      case HttpErrorCode.EMAIL_NOT_FOUND:
        return {
          email: error.message
        }
      case HttpErrorCode.INCORRECT_PASSWORD:
        return {
          password: error.message
        }
      case HttpErrorCode.USERNAME_ALREADY_USED:
        return {
          username: error.message
        }
      case HttpErrorCode.EMAIL_ALREADY_USED:
        return {
          email: error.message
        }
    }
  }
}
