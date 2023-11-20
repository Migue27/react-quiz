import { makeStyles } from '@mui/styles';
import Question from '../components/Question';
import { useSelector, useDispatch } from 'react-redux';
import { check, getQuizItems} from "../features/quiz/quizSlice";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function Quiz() {

    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(getQuizItems())
    }, [])
    
    const {questionItems, isLoading, points, isFinish} = useSelector(state => state.quiz);
    
    
    const changeRoute = ()=>{
        navigate('../')
    }

    if(isLoading){
        return(
            <div className={classes.container}>
                <h1>Quiz</h1>
                <h2>Loading...</h2>
            </div>
        )
    }
    return (
        <>
            <div className={classes.container}>
                <div className={classes.center}>
                    <h1>Quiz</h1>
                </div>
                {questionItems.map(item => {
                    return <Question key={item.id} {...item} />
                })}
                {!isFinish?

                <div className={`${classes.center} ${classes.button} ${classes.MarginBottom}`}>
                    
                <Button
                variant="contained"
                size= "large"
                color= "secondary"
                onClick={()=> dispatch(check({questions: questionItems, points: points}))}
                >
                    Check
                </Button>  
                </div>

                :
                <>
                <div className={classes.center}>
                     <h3> You obtain: {points} / {questionItems.length} points</h3>
                </div>
                <div className={`${classes.center} ${classes.button} ${classes.MarginBottom}`}>
                <Button
                variant="contained"
                color= "secondary"
                size= "large"
                onClick = {changeRoute}
                >
                    Play again!
                </Button>
                </div>
                </>
                }
            
            </div>
            
        </>
    );
}

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        marginTop: "15px",
        backgroundColor: "rgba(255,255,255, 0.8)",
        borderRadius: "10px",
        margin: "0 auto",
        maxWidth:"90vw",

    },
    center: {
        display:"flex",
        flexDirection: "column",
        margin:"0 auto",
    },
    button: {
        marginTop:"20px"
    },
    MarginBottom: {
        marginBottom:"40px",
    }

}));
export default Quiz;

 