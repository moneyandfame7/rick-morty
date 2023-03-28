import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

const enum HttpStack {
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
  USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED',
  EMAIL_ALREADY_USED = 'EMAIL_ALREADY_USED',
  PASSWORD_IS_EQUAL_OLD = 'PASSWORD_IS_EQUAL_OLD',

  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  ID_NOT_FOUND = 'ID_NOT_FOUND'
}

export const errorHandler = (error: FetchBaseQueryError | SerializedError | undefined) => {
  if (!error) {
    return undefined
  }
  if ('status' in error) {
    /* todo: зробити якесь поле і виводити помилку*/
  } else {
    switch (error.stack) {
      case HttpStack.EMAIL_NOT_FOUND:
        return {
          email: error.message
        }
      case HttpStack.INCORRECT_PASSWORD:
        return {
          password: error.message
        }
      case HttpStack.USERNAME_ALREADY_USED:
        return {
          username: error.message
        }
      case HttpStack.EMAIL_ALREADY_USED:
        return {
          email: error.message
        }
      case HttpStack.PASSWORD_IS_EQUAL_OLD:
        return {
          password: error.message
        }
      case HttpStack.TOKEN_EXPIRED:
        return {
          token: error.message
        }
      case HttpStack.INVALID_TOKEN:
        return {
          token: error.message
        }
      case HttpStack.ID_NOT_FOUND:
        return {
          id: error.message
        }
    }
  }
}
