import { createSlice, nanoid } from "@reduxjs/toolkit";
import { text } from "express";

interface Todo{
    id:number,
    text:string,
    todos:Todo[]
}

const initialState:Todo = {
    id:0,
    text:"hello word",
    todos:[]
}

export const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            const todo={
                id:nanoid(),
                text:action.payload,
            }
            state.todos.push(todo)
        },
        removeTodo:(state,action)=>{
            todo
        }
    }
})