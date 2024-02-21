import Todo from "../types/Todo";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

type ProgressDisplayProps = {
    todos:Todo[]
}

export default function ProgressDisplay(props:ProgressDisplayProps){
    let todos=props.todos;
    let itemCount = todos.length;
    let doneCount = todos.filter(item => item.isDone).length
    let progressPercent = todos.length > 0 ? (doneCount * 100) / itemCount : 0
    return <Card sx={{backgroundColor:"#576371",borderRadius:"1em"}}>
    <CardContent>
      <Typography variant="h5" color="white" fontWeight={500}>
        Progress
      </Typography>
      <LinearProgress variant="determinate" value={progressPercent} sx={{
        height:"0.5em",
        marginY:"8px",
        borderRadius:"0.25em"
      }} />
      <Typography variant="caption" color="white">
        {itemCount> 0 && 
          <span>{doneCount} of {itemCount} Completed.</span>
        }
         {itemCount == 0 && 
          <span>No Items.</span>
        }
      </Typography>
    </CardContent>
  </Card>
}