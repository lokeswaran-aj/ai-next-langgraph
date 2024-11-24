'use server'
import MessagesAnnotation from '@/lib/messages-annotation';
import { HumanMessage } from '@langchain/core/messages';
import { END, START, StateGraph } from '@langchain/langgraph';
import { ChatOpenAI } from '@langchain/openai';

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

export const generateText = async (input: string) => {
  const result = await app.invoke({
    messages: [new HumanMessage(input)],
  })
  return result.messages[result.messages.length - 1].content
}
