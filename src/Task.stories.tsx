import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";


export default {
    title:"Task Component",
    component:Task
}

const changeTaskStatus = action("Status changed")
const changeTaskTitle = action("Title changed")
const removeTask = action("Task removed")

export const TaskBaseExample = (props:any) => {
  return <>
      <Task
          task={{todoListId: "todolistID1", id:"1",title:"CSS", status: TaskStatuses.Completed,description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
          changeTaskStatus={changeTaskStatus}
          changeTaskTitle={changeTaskTitle}
          removeTask={removeTask}
          todolistId={"todolistId1"}
      />
      <Task
          task={{todoListId: "todolistID2", id:"2",title:"JS", status: TaskStatuses.New,description: '' , startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
          changeTaskStatus={changeTaskStatus}
          changeTaskTitle={changeTaskTitle}
          removeTask={removeTask}
          todolistId={"todolistId2"}
      />
  </>
}