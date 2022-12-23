import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {FilterValueType} from "./App";
import {log} from "util";

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
}

export const Todolist = (props: TodolistPropsType) => {
    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e:KeyboardEvent<HTMLInputElement>) => {
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
                <input value={title} onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onClickHandler = ()=>props.removeTask(t.id)

                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span> {t.title} </span>
                            <button onClick={onClickHandler}> ✖ </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
