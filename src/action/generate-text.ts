'use server'
import { END, MessagesAnnotation, START, StateGraph } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';
import { Message } from 'ai/react';

const llm = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
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


export const generateText = async (history: Message[]) => {
  const result = await app.invoke({
    messages: history,
  })
  return result.messages[result.messages.length - 1].content
}
