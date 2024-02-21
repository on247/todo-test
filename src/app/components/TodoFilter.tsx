import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
type TodosFilterProps = {
    filter:string,
    changeFilter:(event: SelectChangeEvent) => void
}
export default function TodoFilter(props:TodosFilterProps) {
    return (
        <FormControl sx={{minWidth:120}} size='small'>
            <Select
            autoWidth
            value={props.filter}
            sx={{
                fontSize:"small",
                background:"#fff"
            }}
            onChange={props.changeFilter}
            >
            <MenuItem value={"ALL"}>All</MenuItem>
            <MenuItem value={"DONE"}>Done</MenuItem>
            <MenuItem value={"NOT_DONE"}>Not Done</MenuItem>
            </Select>
        </FormControl>
    )
}