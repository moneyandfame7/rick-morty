import { useEffect, useState } from 'react'

interface UseWindowSize {
  windowWidth: number
  windowHeight: number
}
export const useWindowSize = (): UseWindowSize => {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight])

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight])
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])
  return { windowWidth: windowSize[0], windowHeight: windowSize[1] }
}
