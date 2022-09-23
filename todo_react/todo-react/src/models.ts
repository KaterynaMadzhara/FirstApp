export interface ITodo {
    id?: number
    completed?: boolean
    title: string
}

export interface IAction {
    type?: string
    id?: number
    completed?: boolean
    title: string|""
}