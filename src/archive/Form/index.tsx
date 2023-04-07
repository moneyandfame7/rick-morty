import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'

export const Form = () => {
  const [file, setFile] = useState<string | Blob>()
  const [type, setType] = useState('')
  const [name, setName] = useState<string>('')
  const navigate = useNavigate()

  const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    const formData = new FormData()
    if (file) formData.append('image', file)
    formData.append('type', type)
    formData.append('name', name)
    // await axios.post("http://localhost:3001/api/create-character", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });

    navigate('/')
  }

  interface T {
    (event: any): () => any
  }

  const fileSelected: T = (event: Event): any => {
    const _event = event.target as HTMLInputElement
    if (_event.files) {
      const file = _event.files[0]
      setFile(file)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={submit} style={{ width: 650 }} className="flex flex-col space-y-5 px-5 py-14">
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Name"></input>
        <input value={type} onChange={e => setType(e.target.value)} type="text" placeholder="Type"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
