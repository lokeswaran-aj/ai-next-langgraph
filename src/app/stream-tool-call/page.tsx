'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useStreamToolCall } from '@/hook/useStreamToolCall'
import { Send } from 'lucide-react'

const StreamToolCall = () => {
  const { input, messages, handleSubmit, setInput } = useStreamToolCall()

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Stream Tool Calls</h1>
      <p className="text-center mb-2">
        🤖 In this AI Chat example, the LLM can call github and weather tools and stream the
        response✨
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
          placeholder="How many stars does the langchain-ai/langchain repo have?"
          className="flex-grow"
        />
        <Button type="submit">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}

export default StreamToolCall
