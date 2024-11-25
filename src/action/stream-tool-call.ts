'use server'

import { githubTool } from '@/ai/tools/github-tool'
import getWeather from '@/ai/tools/weather-tool'
import { END, MessagesAnnotation, START, StateGraph } from '@langchain/langgraph'
import { ToolNode } from "@langchain/langgraph/prebuilt"
import { ChatOpenAI } from '@langchain/openai'
import { Message } from 'ai/react'
import { createStreamableValue } from 'ai/rsc'

const tools = [getWeather, githubTool]
const toolNode = new ToolNode(tools)

const llmWithTools = new ChatOpenAI({
  model: 'gpt-4o-mini',
  temperature: 0,
  streaming: true,
}).bindTools(tools);

const shouldContinue = (state: typeof MessagesAnnotation.State) => {
  const { messages } = state;
  const lastMessage = messages[messages.length - 1];
  if ("tool_calls" in lastMessage && Array.isArray(lastMessage.tool_calls) && lastMessage.tool_calls?.length) {
      return "tools";
  }
  return END;
}

const callModel = async (state: typeof MessagesAnnotation.State) => {
  const { messages } = state;
  const response = await llmWithTools.invoke(messages);
  return { messages: response };
}


const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge(START, "agent")
  .addConditionalEdges("agent", shouldContinue, ["tools", END])
  .addEdge("tools", "agent");

const app = workflow.compile()

export const streamToolCall = async (history: Message[]) => {
  const stream = createStreamableValue('');

  (async () => {
    const response = await app.stream({messages: history},{streamMode: "messages"})
    for await (const chunk of response) {
      const lastMessage = chunk[0]
      if(lastMessage._getType() === 'ai') {
        stream.update(lastMessage.content)
      }
    }
    
    stream.done()
  })();

  return { history, output: stream.value }
}
