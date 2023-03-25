import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks_reducer'
import {TasksStateType} from '../App'
import {addTodolistAC, removeTodolistAC} from "./todolists_reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {todoListId: "todolistID1", id: '1', title: 'CSS', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID1", id: '2', title: 'JS', status: TaskStatuses.Completed, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID1", id: '3', title: 'React', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {todoListId: "todolistID2", id: '1', title: 'bread', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID2", id: '2', title: 'milk', status: TaskStatuses.Completed, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID2", id: '3', title: 'tea', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }

    const action = removeTaskAC('todolistId2', '2')
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3)
    expect(endState["todolistId2"].length).toBe(2)
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy()

})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {todoListId: "todolistID1", id: '1', title: 'CSS', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID1", id: '2', title: 'JS', status: TaskStatuses.Completed, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID1", id: '3', title: 'React', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {todoListId: "todolistID2", id: '1', title: 'bread', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID2", id: '2', title: 'milk', status: TaskStatuses.Completed, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID2", id: '3', title: 'tea', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }

    const action = addTaskAC('todolistId2', 'juce')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe("juce")
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {todoListId: "todolistID1", id: '1', title: 'CSS', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID1", id: '2', title: 'JS', status: TaskStatuses.Completed, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID1", id: '3', title: 'React', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {todoListId: "todolistID2", id: '1', title: 'bread', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID2", id: '2', title: 'milk', status: TaskStatuses.Completed, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID2", id: '3', title: 'tea', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }

    const action = changeTaskStatusAC('todolistId2', '2', TaskStatuses.New, )

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBeFalsy()
    expect(endState['todolistId1'][1].status).toBeTruthy()
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {todoListId: "todolistID1", id: '1', title: 'CSS', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID1", id: '2', title: 'JS', status: TaskStatuses.Completed, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID1", id: '3', title: 'React', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {todoListId: "todolistID2", id: '1', title: 'bread', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID2", id: '2', title: 'milk', status: TaskStatuses.Completed, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID2", id: '3', title: 'tea', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }

    const action = changeTaskTitleAC('todolistId2', '2', "MilkyWay", )

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe("MilkyWay")
    expect(endState['todolistId1'][1].title).toBe("JS")
})

test(' new property with new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {todoListId: "todolistID1", id: '1', title: 'CSS', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID1", id: '2', title: 'JS', status: TaskStatuses.Completed, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID1", id: '3', title: 'React', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {todoListId: "todolistID2", id: '1', title: 'bread', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID2", id: '2', title: 'milk', status: TaskStatuses.Completed, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID2", id: '3', title: 'tea', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }

    const action = addTodolistAC('new todolist' )

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {todoListId: "todolistID1", id: '1', title: 'CSS', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID1", id: '2', title: 'JS', status: TaskStatuses.Completed, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID1", id: '3', title: 'React', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        'todolistId2': [
            {todoListId: "todolistID2", id: '1', title: 'bread', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID2", id: '2', title: 'milk', status: TaskStatuses.Completed, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {todoListId: "todolistID2", id: '3', title: 'tea', status: TaskStatuses.New, description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).toBeUndefined()
})



