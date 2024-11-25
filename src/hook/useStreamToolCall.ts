import { streamToolCall } from '@/action/stream-tool-call'
import { generateId } from 'ai'
import { Message } from 'ai/react'
import { readStreamableValue } from 'ai/rsc'
import { useState } from 'react'

export const useStreamToolCall = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userMessage: Message = {
      role: "user",
      content: input,
      id: generateId(),
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)

    const { history, output } = await streamToolCall(newMessages)
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
