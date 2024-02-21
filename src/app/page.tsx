
'use client';
import Todo from "./types/Todo";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from 'react';

import TodoList from './components/TodoList';
import ProgressDisplay from './components/ProgressDisplay';
import TodoFilter from './components/TodoFilter';
import AddTodo from './components/AddTodo'

import {getTodos,createTodo,deleteTodo, toggleTodo} from "./api/api"

export default function Home() {
  let [todos,setTodos] = useState<Todo[]>([])
  let [filter,setFilter] = useState<string>("ALL")
  let [loading,setLoading] = useState(true);

  let changeFilter=(e:SelectChangeEvent)=>{
    let value=e.target.value
    setFilter(value)
  }

  let toggleItem=async (id:string)=>{
    let result = await toggleTodo(id);
    if(result && !result.error){
      let todo=todos.find(item => item._id == id)
      if(todo){
        todo.isDone=!todo.isDone;
      }
      setTodos([...todos])
    }
  }

  let deleteItem=async (id:string)=>{
    let result=await deleteTodo(id);
    if(result && !result.error){
      let newTodos=todos.filter(item => item._id != id)
      setTodos(newTodos)
    }
  }

  let addItem=async(text:string)=>{
    let createdTodo=await createTodo(text)
    if(createdTodo && !createdTodo.error){
      todos.push(createdTodo);
      setTodos([...todos])
    }
  }
  
  
  useEffect(()=>{
    let setup=async()=>{
      let todoItems=await getTodos()
      todoItems.sort((a:Todo,b:Todo)=>{
        return a.createdAt - b.createdAt;
      })
      setLoading(false);
      if(todoItems!=null){
        setTodos(todoItems)
      }
    }
    setup();
  },[loading])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Card sx={{ 
        backgroundColor:"#F5F5F5",
        width: { xs: "calc(100% - 16px)" , md: 620 }, 
        minHeight:"80vh",
        paddingTop:"4em",
        paddingLeft:{"xs":"1em","md":"5em"},
        paddingRight:{"xs":"1em","md":"5em"},
      }}>
        <CardContent>
          <ProgressDisplay todos={todos}></ProgressDisplay>
          <Box sx={{
            display:"flex",
            flexDirection:"row",
            paddingLeft:"0 !important",
            paddingTop:"1em",
            justifyContent:"space-between"
          }}>
            <Typography variant='h6' fontWeight={500}>
              To-dos
            </Typography>
            <TodoFilter filter={filter} changeFilter={changeFilter}></TodoFilter>
          </Box>
          <AddTodo addItem={addItem}></AddTodo>
          {!loading &&
            <TodoList
            todos={todos} 
            filter={filter}
            toggleItem={toggleItem}
            deleteItem={deleteItem}>
            </TodoList>
          }
          {loading &&
            <Typography>Loading TODOs...</Typography>
          }
        </CardContent>
      </Card>
    </main>
  );
}
