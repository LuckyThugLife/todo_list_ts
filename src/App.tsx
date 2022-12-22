import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {

    const title='What to learn'

    let [tasks, setTasks] = useState( [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "Rest API", isDone: false },
        { id: 5, title: "GraphQL", isDone: false }
    ])

 function removeTask (id:number) {
      let filteredTasks = tasks.filter(t => t.id !== id)
       setTasks(filteredTasks)
    }

    return (
        <div className="App">
           <Todolist title={title}  tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}


export default App;
