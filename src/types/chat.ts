export interface conversationInterface{
    id: Number,
    title: string, 
    users: string[],
    messages: Object[]
}
export interface messageInterface{
    content: string,
    user: string
    createdAt: string,
}

export interface addConversationAdapter{
    title: string,
    users: string,
}

export interface updateConversationMsgAdapter{
    id: Number,
    content: string,
    user: string
    createdAt: string,
}