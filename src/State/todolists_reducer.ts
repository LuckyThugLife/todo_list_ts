import {FilterValueType, TodoListsType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTodolistActionType
| AddTodolistActionType
| ChangeTodolistTitleActionType
| ChangeTodolistFilterActionType

type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id:string
}
type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title:string
}

type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id:string
    title:string
}
type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id:string
    filter:FilterValueType
}



// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const todolistsReducer = (state: Array<TodoListsType>, action: ActionType):Array<TodoListsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(todolist => todolist.id !== action.id)
        case "ADD-TODOLIST":
            return [...state,{
                id: v1(),
                title: action.title,
                filter: "All"
            }]
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }

default:
    throw new Error('I don\'t understand this type')
}
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}

export const ChangeTodolistTitleAC = (id: string,title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE',id:id,title:title}
}

export const ChangeTodolistFilterAC = (id: string,filter: FilterValueType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id,
        filter: filter}
}

