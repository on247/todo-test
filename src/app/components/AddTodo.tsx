import Box from '@mui/material/Box'
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useState } from 'react';
type AddTodoProps = {
    addItem:(text:string)=>void
}

export default function ProgressDisplay(props:AddTodoProps){
    let {addItem} = props;
    let [todoContent,setTodoContent]=useState("")
    let onTextChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        let content=e.currentTarget.value;
        setTodoContent(content)
        return true
    }
    let handleAddClick=()=>{
        addItem(todoContent);
    }
    return (
        <Box sx={{width:"100%",marginY:"1em" }}>
        <TextField
            placeholder="Add your to-do..."
            fullWidth
            sx={{
                backgroundColor:"white",
                borderRadius:"2em",
                "& fieldset": { border: 'none' },
            }}
            onChange={onTextChange}
            InputProps={{
                endAdornment: (
                <InputAdornment position="end">
                    <Button 
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius:"0.5em",
                        background: "#526F92"
                    }}
                    disableElevation
                    onClick={handleAddClick}>
                        Add
                    </Button>
                </InputAdornment>
                ),
            }}
        />
      </Box>
    )
}