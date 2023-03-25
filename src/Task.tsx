import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {TaskStatuses, TaskType} from "./api/todolists-api";

type TaskPropsType = {
    removeTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, id: string, status: TaskStatuses) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.todolistId, props.task.id)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.todolistId, props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {

        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.todolistId, props.task.id, props.changeTaskTitle])
    return (


        <div key={props.task.id} className={props.task.status ===TaskStatuses.Completed ? 'is-done' : ''}>

            <Checkbox checked={props.task.status === TaskStatuses.Completed}
                      color={"primary"}
                      onChange={onChangeStatusHandler}/>

            <EditableSpan value={props.task.title} onChange={onChangeTitleHandler}/>

            <IconButton aria-label="delete"
                        onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
})