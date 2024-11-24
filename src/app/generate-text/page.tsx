'use client'

import { generateText } from '@/action/generate-text'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { generateId } from 'ai'
import { Message } from 'ai/react'
import { Send } from 'lucide-react'
import { useState } from 'react'

const GenerateText = () => {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userMessage: Message = {
      role: 'user',
      content: input,
      id: generateId(),
    }
    setMessages((messages) => [...messages, userMessage])

    const result = await generateText(input)
    setMessages((messages) => [
      ...messages,
      {
        role: 'assistant' as const,
        content: result,
        id: generateId(),
      },
    ])
    setInput('')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Generate Text</h1>
      <p className="text-center mb-2">
        🤖 In this AI Chat example, the AI message is displayed once complete
        message is generated✨ BTW, this AI does not know the previous messages.
        🔄
      </p>
      <ScrollArea className="flex-grow mb-4 p-4 border rounded-md">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block p-2 rounded-lg ${
                m.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Generate a 100 word text about love..."
          className="flex-grow"
        />
        <Button type="submit">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

export default GenerateText
