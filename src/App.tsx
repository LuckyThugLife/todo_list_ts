import React, {useState} from 'react';
import './App.css';
import { TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "All" | "Active" | "Completed"
type TodoListsType = { id: string, title: string, filter: FilterValueType }

type TaskStateType = {
    [key:string]:Array<TaskType>
}


function App() {


    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: "All"},
        {id: todolistID2, title: 'What to buy', filter: "All"},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const removeTodolist = (id:string) => {
      setTodolists(todolists.filter(todolist => todolist.id !== id))
        delete tasks[id]

        setTasks({...tasks})
    }


    const addTask = (title: string, todolistId: string) => {

        let task = {id:v1(),title:title,isDone:false}
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = [task, ...todolistTasks]
        setTasks({...tasks})

    }


    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function changeTaskStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId]
        let task = todolistTasks.find(task => task.id === id)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {
                todolists.map(todolist => {
                    let allTodolistTasks = tasks[todolist.id]
                    let taskForTodolist = allTodolistTasks

                    if (todolist.filter === "Active") {
                        taskForTodolist = taskForTodolist.filter(t => t.isDone === false)
                    }
                    if (todolist.filter === "Completed") {
                        taskForTodolist = taskForTodolist.filter(t => t.isDone === true)
                    }

                    return <Todolist
                        key={todolist.id}
                        id={todolist.id}
                        title={todolist.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                    />
                })

            }

        </div>
    );
}


export default App;
