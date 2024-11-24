import { generateText } from "@/action/generate-text"
import { generateId } from "ai"
import { Message } from "ai/react"
import { useState } from "react"

export const useGenerateText = () => { 
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userMessage: Message = {
      role: 'user',
      content: input,
      id: generateId(),
    }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)

    const result = await generateText(newMessages)

    setInput('')
    setMessages([
      ...newMessages,
      {
        role: 'assistant' as const,
        content: result,
        id: generateId(),
      },
    ])
  }

  return {
    input,
    setInput,
    messages,
    handleSubmit,
  }
}
