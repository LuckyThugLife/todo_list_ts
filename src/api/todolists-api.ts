import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "api-key": "a36967c8-1439-4243-a154-ec2e321d0323"
    }
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
//
// type CreateTodolistResponseType = {
//     resultCode: number
//     messages: string[]
//     fieldsErrors: Array<string>
//     data: {
//         item: TodolistType
//     }
// }
//
// type DeleteTodolistResponseType = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: {}
// }
//
// type UpdateTodolistResponseType = {
//     resultCode: number
//     messages: Array<string>
//     fieldsErrors: Array<string>
//     data: {}
// }

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadLine: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>("todo-lists")

    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: "Rustam todolist"})

    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)

    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title})

    },

    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)

    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)

    },

    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})

    },

    updateTask(todolistId: string, taskId: string, model:UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)

    },

}
