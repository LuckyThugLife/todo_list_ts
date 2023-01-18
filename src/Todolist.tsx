import React, {ChangeEvent} from "react"
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';





export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(taskId:string,todolistId: string)=> void
    changeFilter:(value:FilterValueType,todolistId: string)=>void
    addTask:(title:string,todolistId: string)=>void
    changeTaskStatus:(id: string, isDone: boolean,todolistId: string)=>void
    changeTaskTitle:(id: string, newTitle:string,todolistId: string)=>void
    filter:FilterValueType
    id: string
    removeTodolist:(id:string)=> void
    changeTodolistTitle:(id:string, newTitle:string)=> void
}

export const Todolist = (props: TodolistPropsType) => {



   /* let [title, setTitle] = useState('')
    let [error, setError] = useState<string|null>(null)


    const addTask = () => {
        if (title.trim()!=='') {
            props.addTask(title.trim(),props.id)
            setTitle('')
        }else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key==='Enter'){
            addTask()
        }
    }*/

    const addTask = (title:string  ) => {
    props.addTask(title, props.id)
    }



    const onAllClickHandler = () => {
        props.changeFilter("All", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("Active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("Completed", props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle:string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton aria-label="delete"
                            onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>


           {/* <div>
                <input value={title}
                       onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' :  ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>*/}
            <div>
                {props.tasks.map((t) => {
                    const onClickHandler = ()=>props.removeTask(t.id,props.id)
                    const onChangeStatusHandler = (e:ChangeEvent<HTMLInputElement>)=> {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id)
                    }
                    const onChangeTitleHandler = (newValue:string)=> {

                       props.changeTaskTitle(t.id, newValue, props.id)
                    }
                    return (


                        <div key={t.id} className={t.isDone ? 'is-done' : ''}>

                            <Checkbox checked={t.isDone}
                                      color={"primary"}
                                      onChange={onChangeStatusHandler}/>

                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>

                            <IconButton aria-label="delete"
                                        onClick={onClickHandler}>
                                <Delete />
                            </IconButton>
                        </div>
                    )
                })}
            </div>
            <div>


                <Button onClick={onAllClickHandler} color={"secondary"} variant={props.filter === 'All' ? 'contained' : 'text'}>All</Button>
                <Button onClick={onActiveClickHandler} color={"success"} variant={props.filter === 'Active' ? 'contained' : 'text'}>Active</Button>
                <Button onClick={onCompletedClickHandler} color={"primary"} variant={props.filter === 'Completed' ? 'contained' : 'text'}>Completed</Button>
            </div>
        </div>
    )
}
