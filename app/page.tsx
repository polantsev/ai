'use client'
import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [image, setImage] = useState('')
  const [audio, setAudio] = useState('')
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  async function callApi() {
    try {b
      if (!input) return
      setLoading(true)
      setImage('')
      setAudio('')
      setText('')
      const response = await fetch('/api/gpt', {
        method: 'POST',
        body: JSON.stringify({
          query: input,
        }),
      })
      const {data, type} = await response.json()
      if (type === 'image') {
        setImage(data[0])
      }
      if (type === 'audio') {
        setAudio(data)
      }
      if (type === 'text') {
        setText(data)
      }
      setLoading(false)
    } catch (err) {
      console.log('error: ', err);
    }
  }

  return (
    <main className="fle flex-col items-center justify-between p-24">
      <input
        className="text-black px-3 py-1 rounded"
        onChange={e => setInput(e.target.value)}
      />
      <button onClick={callApi} className="rounded-full bg-green-500 text-white py-3 px-14 mt-3 mb-4 cursor-pointer">
        IMAGINE
      </button>
      {
        image && <img src={image} width="500px"/>
      }
      {
        text && <p className="text-2xl">{text}</p>
      }
      {
        audio && (
          <audio controls>
            <source src={audio} type="audio/wav"/>
          </audio>
        )
      }
      {
        loading && <p className="text-2xl">Loading...</p>
      }
    </main>
  )
}
