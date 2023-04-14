import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

const enum AuthHttpStack {
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
  USERNAME_ALREADY_USED = 'USERNAME_ALREADY_USED',
  EMAIL_ALREADY_USED = 'EMAIL_ALREADY_USED',
  PASSWORD_IS_EQUAL_OLD = 'PASSWORD_IS_EQUAL_OLD',

  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  ID_NOT_FOUND = 'ID_NOT_FOUND'
}

const enum CharacterHttpStack {
  EMPTY_FILE = 'EMPTY_FILE',
  CHARACTER_EXIST = 'CHARACTER_EXIST'
}

export const authHandler = (error: FetchBaseQueryError | SerializedError | undefined) => {
  if (!error) {
    return undefined
  }
  if ('status' in error) {
    /* todo: зробити якесь поле і виводити помилку*/
  } else {
    switch (error.stack) {
      case AuthHttpStack.EMAIL_NOT_FOUND:
        return {
          email: error.message
        }
      case AuthHttpStack.INCORRECT_PASSWORD:
        return {
          password: error.message
        }
      case AuthHttpStack.USERNAME_ALREADY_USED:
        return {
          username: error.message
        }
      case AuthHttpStack.EMAIL_ALREADY_USED:
        return {
          email: error.message
        }
      case AuthHttpStack.PASSWORD_IS_EQUAL_OLD:
        return {
          password: error.message
        }
      case AuthHttpStack.TOKEN_EXPIRED:
        return {
          token: error.message
        }
      case AuthHttpStack.INVALID_TOKEN:
        return {
          token: error.message
        }
      case AuthHttpStack.ID_NOT_FOUND:
        return {
          id: error.message
        }
    }
  }
}

export const characterHandler = (error: FetchBaseQueryError | SerializedError | undefined) => {
  if (!error) {
    return undefined
  }
  if ('status' in error) {
    /*  */
  } else {
    switch (error.stack) {
      case CharacterHttpStack.EMPTY_FILE:
        return {
          image: error.message
        }
      case CharacterHttpStack.CHARACTER_EXIST:
        return {
          character: error.message
        }
    }
  }
}
