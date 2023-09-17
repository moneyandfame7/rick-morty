import { type SerializedError } from '@reduxjs/toolkit'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

const enum ErrorHttpStack {
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
  USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED',
  EMAIL_ALREADY_USED = 'EMAIL_ALREADY_USED',
  PASSWORD_IS_EQUAL_OLD = 'PASSWORD_IS_EQUAL_OLD',

  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  ID_NOT_FOUND = 'ID_NOT_FOUND',
  ALREADY_VERIFIED = 'ALREADY_VERIFIED',
  INVALID_LINK = 'INVALID_LINK'
}

export const errorHandler = (error: FetchBaseQueryError | SerializedError | undefined) => {
  if (!error) {
    return undefined
  }
  if ('stack' in error) {
    switch (error.stack) {
      case ErrorHttpStack.EMAIL_NOT_FOUND:
        return {
          email: error.message
        }
      case ErrorHttpStack.INCORRECT_PASSWORD:
        return {
          password: error.message
        }
      case ErrorHttpStack.USERNAME_ALREADY_USED:
        return {
          username: error.message
        }
      case ErrorHttpStack.EMAIL_ALREADY_USED:
        return {
          email: error.message
        }
      case ErrorHttpStack.PASSWORD_IS_EQUAL_OLD || ErrorHttpStack.INCORRECT_PASSWORD:
        return {
          password: error.message
        }
      case ErrorHttpStack.TOKEN_EXPIRED:
        return {
          token: error.message
        }
      case ErrorHttpStack.INVALID_TOKEN:
        return {
          token: error.message
        }
      case ErrorHttpStack.ID_NOT_FOUND:
        return {
          id: error.message
        }
      case ErrorHttpStack.ALREADY_VERIFIED || ErrorHttpStack.INVALID_LINK:
        return {
          message: error.message
        }
    }
  } else {
    return undefined
  }
}
