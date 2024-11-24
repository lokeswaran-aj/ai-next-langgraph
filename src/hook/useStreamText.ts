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

    const { history, output } = await streamText([...messages, userMessage])
    setInput('')
    const assistantMessageId = generateId()

    let textContent = ''

    for await (const chunk of readStreamableValue(output)) {
      textContent += chunk
      setMessages([...history, {role: 'assistant', content: textContent, id: assistantMessageId}])
    }
  }

  return {
    input,
    setInput,
    messages,
    handleSubmit,
  }
}
