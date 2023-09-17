import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

const enum CharacterHttpStack {
  EMPTY_FILE = 'EMPTY_FILE',
  CHARACTER_EXIST = 'CHARACTER_EXIST'
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
