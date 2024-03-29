import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists_reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
type AddTaskActionType = {
    type: "ADD-TASK"
    todolistId: string
    title: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    status: TaskStatuses
}
type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}

const initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.taskId)
            stateCopy[action.todolistId] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const newTask:TaskType = {todoListId: action.todolistId,id: v1(), title: action.title, status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks
            return stateCopy
        }

        case 'CHANGE-TASK-STATUS': {

            let tasks = state[action.todolistId]
            state[action.todolistId] = tasks
                .map(t => t.id === action.taskId
                    ? {...t, status: action.status}
                    : t)
            return ({...state})
        }
        case 'CHANGE-TASK-TITLE': {
            let tasks = state[action.todolistId]
            state[action.todolistId] = tasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t)
            return ({...state})
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = []

            return stateCopy
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
}


export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId, title}
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status}
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}

/*export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolistId: v1(), title}
}*/

