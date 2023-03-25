import {tasksReducer} from "../state/tasks_reducer";
import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import { v1 } from 'uuid'
import { AppRootStateType } from '.././state/store'
import {todolistReducer} from "../state/todolists_reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'All', addedDate: "", order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'All', addedDate: "", order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {todoListId: "todolistID1", id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID1", id: v1(), title: 'JS', status: TaskStatuses.Completed,description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        ['todolistId2']: [
            {todoListId: "todolistID2", id: v1(), title: 'Milk', status: TaskStatuses.Completed,description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID2", id: v1(), title: 'React Book', status: TaskStatuses.Completed,description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
