import './App.css';
import Header from './MyComponents/Header';
import {Todos} from './MyComponents/Todos';
import {Footer} from './MyComponents/Footer';
import { useEffect, useState } from 'react';
import { AddTodo } from './MyComponents/AddTodo';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { About } from './MyComponents/About';

function App() {
  let initTodo; // 4. related to local storage & initialization part
  if(localStorage.getItem("todos")===null) { // when todos is not set
    initTodo= [];
  }else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  let onDelete = (todo)=>{
    console.log("onDelete Clicked of todo",todo);
    /* Deleteing this way in react does not work
    let index = todos.indexOf(todo);
    todos.splice(index,1);
    as state change is not getting updated
    so we use useState hook and update setTodos
    */
   setTodos(todos.filter((e)=>{
     return e!==todo;
   }))
   localStorage.setItem("todos", JSON.stringify(todos)); // 3. related to local storage
  }

  const addTodo = (title,desc) => {
    console.log("I am adding this todo", title, desc);
    let sno;
    if(todos.length===0){
      sno = 0;
    }else { 
      sno = todos[todos.length-1].sno+1; // as we are adding a new item so sno will be last item + 1
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    console.log(myTodo);
    setTodos([...todos,myTodo]);  // adding my new object from AddTodo to todo list

    //localStorage.setItem("todos", JSON.stringify(todos)); // 2. related to local storage
    // for storing the data we need to stringify it & for retriving the data we need to parse it
  }

  const [todos, setTodos] = useState(initTodo); // 1. related to local storage
  useEffect(()=>{ // type ueh , part of react hook snippet to get useEffect format
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // todos in dpendency list whenever it gets changed then  useEffect is called & set it in local storage

  return (
    <>
      <Router>
        <Header title= "My Todos List" searchBar={false}/>
        <Switch>
          <Route exact path="/" render={()=>{
            return(
              <>
                <AddTodo addTodo={addTodo}/>
                <Todos todos={todos} onDelete={onDelete}/>
              </>)
          }}>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
        </Switch>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
