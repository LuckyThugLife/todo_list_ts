import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


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
                <button onClick={removeTodolist}> ✖ </button>
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
            <ul>
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


                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeStatusHandler}/>
                            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onClickHandler}> ✖ </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler} className={props.filter === 'All' ? 'active-filter' : ''}>All</button>
                <button onClick={onActiveClickHandler}  className={props.filter === 'Active' ? 'active-filter' : ''}>Active</button>
                <button onClick={onCompletedClickHandler} className={props.filter === 'Completed' ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}
