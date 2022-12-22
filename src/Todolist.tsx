import React from "react"
import {FilterValueType} from "./App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(taskId:number)=> void
    changeFilter:(value:FilterValueType)=>void
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>


            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span> {t.title} </span>
                            <button onClick={()=>{props.removeTask(t.id)}}> ✖ </button>
                        </li>
                    )
                })}

                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            </ul>
            <div>
                <button onClick={()=>{props.changeFilter("All")}}>All</button>
                <button onClick={()=>{props.changeFilter("Active")}}>Active</button>
                <button onClick={()=>{props.changeFilter("Completed")}}>Completed</button>
            </div>
        </div>
    )
}