import React, {useCallback} from "react"
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    changeFilter:(value:FilterValueType,todolistId: string)=>void
    addTask:(title:string,todolistId: string)=>void
    removeTask:(taskId:string,todolistId: string)=> void
    changeTaskStatus:(todolistId: string, id: string, isDone: boolean)=>void
    changeTaskTitle:(id: string, newTitle:string,todolistId: string)=>void
    filter:FilterValueType
    id: string
    removeTodolist:(id:string)=> void
    changeTodolistTitle:(id:string, newTitle:string)=> void
}

export const Todolist = React.memo(function (props: TodolistPropsType) {
    console.log("Todolist is called")

    const addTask = useCallback((title:string  ) => {
    props.addTask(props.id,title)
    },[props.id, props.addTask])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("All", props.id)
    }, [props.id, props.changeFilter])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("Active", props.id)
    }, [props.id, props.changeFilter])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("Completed", props.id)
    }, [props.id, props.changeFilter])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = useCallback ((newTitle:string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle])

    let taskForTodolist = props.tasks

    if (props.filter === "Active") {
        taskForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "Completed") {
        taskForTodolist = props.tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete"
                            onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>


            <div>
                {
                    props.tasks.map(t => <Task
                    task={t}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todolistId={props.id}
                    key={t.id}
                    />)
                }
            </div>
            <div>


                <Button onClick={onAllClickHandler} color={"secondary"} variant={props.filter === 'All' ? 'contained' : 'text'}>All</Button>
                <Button onClick={onActiveClickHandler} color={"success"} variant={props.filter === 'Active' ? 'contained' : 'text'}>Active</Button>
                <Button onClick={onCompletedClickHandler} color={"primary"} variant={props.filter === 'Completed' ? 'contained' : 'text'}>Completed</Button>
            </div>
        </div>
    )
})

