'use server'

import { END, MessagesAnnotation, START, StateGraph } from '@langchain/langgraph'
import { ChatOpenAI } from '@langchain/openai'
import { Message } from 'ai/react'
import { createStreamableValue } from 'ai/rsc'

const llm = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
  streaming: true,
})

const callModel = async (state: typeof MessagesAnnotation.State) => {
  const response = await llm.invoke(state.messages)
  return {
    messages: [response],
  }
}

const workflow = new StateGraph(MessagesAnnotation)
  .addNode('callModel', callModel)
  .addEdge(START, 'callModel')
  .addEdge('callModel', END)

const app = workflow.compile()

export const streamText = async (history: Message[]) => {
  const stream = createStreamableValue('');

  (async () => {
  const response = await app.stream({
    messages: history,
  }, { streamMode: "messages" });
    for await (const chunk of response) {
      const messageContent = chunk[0].content
      stream.update(messageContent)
    }
    stream.done()
  })();
  
  return { history, output: stream.value }
}
