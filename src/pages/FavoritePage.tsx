import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../application/store'
import { CardList, Modal } from '../components'
import { selectFavoriteCharacters } from '../features/characters/services/selector'

const FavoritePage: FC = () => {
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const characters = useAppSelector(selectFavoriteCharacters)
  const navigate = useNavigate()
  useEffect(() => {
    characters.length ? setIsEmpty(false) : setIsEmpty(true)
  }, [characters])
  const handleClose = () => {
    setIsEmpty(false)
    navigate('/character')
  }
  return (
    <>
      {!isEmpty ? (
        <CardList items={characters} />
      ) : (
        <Modal
          title='Your favorites list is empty.'
          onClose={handleClose}
          open={isEmpty}
          message='Please, add characters to see them.'
        />
      )}
    </>
  )
}

export default FavoritePage
