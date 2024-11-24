import { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph";

const MAX_MESSAGES = 5;

let storedMessages: BaseMessage[] = [];

const MessagesAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (state: BaseMessage[], update: BaseMessage[]) => {
      const allMessages = [...storedMessages, ...update];
      storedMessages = allMessages.slice(-MAX_MESSAGES);
      return storedMessages;
    },
    default: () => storedMessages,
  }),
})

export default MessagesAnnotation