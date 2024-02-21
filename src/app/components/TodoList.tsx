import Todo from "../types/Todo";
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useState } from "react";

type TodoListProps = {
    todos:Todo[]
    filter:string
    toggleItem:(id:string)=>void
    deleteItem:(id:string)=>void
}

const todoItemStyle={
    display:"flex",
    borderRadius : "2em",
    background:"#fff",
    paddingX:"1em",
    alignItems:"center"
}

export default function TodoList(props:TodoListProps){
    let {todos,filter,toggleItem,deleteItem} = props;
    let [menuAnchorEl,setMenuAnchorEl] = useState<HTMLElement | null>(null)
    let [selectedTodoId,setSelectedTodoId] = useState<string | null>(null)
    let filterTodos=(todos:Todo[],filter:string)=>{
        if(filter=="NOT_DONE"){
          return todos.filter(item => !item.isDone)
        }
        if(filter=="DONE"){
          return todos.filter(item => item.isDone)
        }
        return [...todos]
    }

    let openMenu=(e:React.MouseEvent<HTMLButtonElement>)=>{
        let target=e.currentTarget;
        let itemId=target.dataset.itemId;
        if(itemId){
            setSelectedTodoId(itemId)
        }
        if(target){
            setMenuAnchorEl(target);
        }
    };
    let closeMenu=()=>{
        setSelectedTodoId(null)
        setMenuAnchorEl(null)
    };
    let handleDelete=()=>{
        if(selectedTodoId){
            deleteItem(selectedTodoId);
        }
        closeMenu()
    }

    let filteredTodos = filterTodos(todos,filter)
    let todoItems=[];
    for(let item of filteredTodos){
        todoItems.push(
        <Box key={item._id} sx={todoItemStyle}>
            <Checkbox defaultChecked={item.isDone} onChange={()=>{toggleItem(item._id)}}/>
            <Typography>{item.text}</Typography>
            <Box sx={{flexGrow:1}}></Box>
            <IconButton sx={{marginRight:"auto"}} data-item-id={item._id} onClick={openMenu}>
                <MoreHorizIcon />
            </IconButton>
            
        </Box>
        )
    }
    return(
        <>
            {todoItems.length == 0 && <Typography>No Items</Typography>}
            <Stack spacing={2}>
            {todoItems}
            </Stack>
            <Menu open={selectedTodoId!=null} anchorEl={menuAnchorEl} onClose={closeMenu}>
                <MenuItem onClick={handleDelete}>
                    <Typography color="red" variant="caption">Delete</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}