import { streamText } from '@/action/stream-text'
import { generateId } from 'ai'
import { Message } from 'ai/react'
import { readStreamableValue } from 'ai/rsc'
import { useState } from 'react'

export const useStreamText = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userMessage: Message = {
      role: "user",
      content: input,
      id: generateId(),
    }
    setMessages((messages) => [...messages, userMessage])

    const { output } = await streamText(input)
    setInput('')
    const assistantMessageId = generateId()

    let fullChunk = ''

    for await (const chunk of readStreamableValue(output)) { 
      fullChunk += chunk
      setMessages(prev => {
        const lastMessage = prev.at(-1)
        if (lastMessage?.role === 'assistant') { 
          return [...prev.slice(0,-1),{...lastMessage, content: fullChunk}]
        }
        return [...prev, {role: 'assistant', content: fullChunk, id: assistantMessageId}]
      })
    }
  }

  return {
    input,
    setInput,
    messages,
    handleSubmit,
  }
}
