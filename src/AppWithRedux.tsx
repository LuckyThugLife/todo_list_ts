import React, {useReducer} from 'react';

import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import Button from "@mui/material/Button";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolists_reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks_reducer";
import {useDispatch, useSelector} from "react-redux";
import { AppRootStateType } from './state/store';

export type FilterValueType = "All" | "Active" | "Completed"
export type TodoListsType = { id: string, title: string, filter: FilterValueType }

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {


    // let [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer, [
    //     {id: todolistID1, title: 'What to learn', filter: "All"},
    //     {id: todolistID2, title: 'What to buy', filter: "All"},
    // ])
    let todolists = useSelector<AppRootStateType, Array<TodoListsType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    // let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
    //     [todolistID1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //         {id: v1(), title: 'Rest API', isDone: true},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: 'Milk', isDone: true},
    //         {id: v1(), title: 'Sugar', isDone: false},
    //         {id: v1(), title: 'Salt', isDone: true},
    //         {id: v1(), title: 'Bread', isDone: false},
    //         {id: v1(), title: 'Butter', isDone: true}
    //     ]
    // })

    const removeTodolist = (id: string) => {
        let action = removeTodolistAC(id)
        dispatch(action)

    }

    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatch(action)

    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id,newTitle))
    }

    const changeTodolistFilter = (value: FilterValueType, todolistId: string) => {
        dispatch( changeTodolistFilterAC(todolistId,value))
    }

    function removeTask(todolistId: string, id: string) {
        dispatch(removeTaskAC(todolistId,id))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }

    function changeTaskStatus(todolistId: string,id: string, isDone: boolean, ) {
        dispatch(changeTaskStatusAC(todolistId,id,isDone))
    }

    function changeTaskTitle(todolistId: string,id: string, newTitle: string, ) {
        dispatch( changeTaskTitleAC(todolistId,id,newTitle))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton

                        edge="start"
                        color="inherit"
                        aria-label="menu"

                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}} >
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todolist => {
                            let allTodolistTasks = tasks[todolist.id]
                            let taskForTodolist = allTodolistTasks

                            if (todolist.filter === "Active") {
                                taskForTodolist = allTodolistTasks.filter(t => !t.isDone)
                            }
                            if (todolist.filter === "Completed") {
                                taskForTodolist = allTodolistTasks.filter(t => t.isDone)
                            }

                            return <Grid item>
                                <Paper style={{padding: "10px"}}>
                                <Todolist
                                    key={todolist.id}
                                    id={todolist.id}
                                    title={todolist.title}
                                    tasks={taskForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeTodolistFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    changeTaskTitle={changeTaskTitle}
                                    filter={todolist.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                                </Paper>
                            </Grid>
                        })

                    }
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithRedux;
