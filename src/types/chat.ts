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