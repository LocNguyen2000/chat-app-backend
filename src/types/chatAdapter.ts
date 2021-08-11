export interface conversationInterface {
  id: number
  title: string
  users: string[]
  messages: messageInterface[]
}
export interface messageInterface {
  content: string
  user: string
  createdAt: string
}

export interface addConversationAdapter {
  title: string
  users: string
}

export interface updateConversationMsgAdapter {
  id: number
  content: string
  user: string
  createdAt: string
}