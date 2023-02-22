import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import EditableSpan from "./EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.todolistId, props.task.id, newIsDoneValue)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {

        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.todolistId, props.task.id, props.changeTaskTitle])
    return (


        <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>

            <Checkbox checked={props.task.isDone}
                      color={"primary"}
                      onChange={onChangeStatusHandler}/>

            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>

            <IconButton aria-label="delete"
                        onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})