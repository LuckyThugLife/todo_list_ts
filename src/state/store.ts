import {combineReducers, legacy_createStore} from "redux";
import {todolistReducer} from "./todolists_reducer";
import {tasksReducer} from "./tasks_reducer";


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: tasksReducer
})

/*type AppRootStateType = {
    todolists: Array<TodoListsType>
    tasks:TasksStateType
}*/
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store


