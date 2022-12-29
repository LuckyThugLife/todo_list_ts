import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {FilterValueType} from "./App";


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(taskId:string)=> void
    changeFilter:(value:FilterValueType)=>void
    addTask:(title:string)=>void
    changeTaskStatus:(id: string, isDone: boolean)=>void
    filter:FilterValueType
}

export const Todolist = (props: TodolistPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string|null>(null)


    const addTask = () => {
        if (title.trim()!=='') {
            props.addTask(title.trim())
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
    }

    const onAllClickHandler = () => {
        props.changeFilter("All")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("Active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("Completed")
    }

    return (
        <div>
            <h3>{props.title}</h3>


            <div>
                <input value={title}
                       onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' :  ''}/>
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onClickHandler = ()=>props.removeTask(t.id)
                    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeTaskStatus(t.id, newIsDoneValue)
                    }
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <span> {t.title} </span>
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
