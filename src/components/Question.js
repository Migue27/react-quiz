
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux/es/exports';
//import Answer from './Answer';
import { Button, Stack } from '@mui/material';
import { selectAnswer } from '../features/quiz/quizSlice';

function Question({ question, answers, isCorrect, correct_answer }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isFinish = useSelector(state => state.quiz.isFinish);



    const renderColor = (item) => {

        if (!isFinish) {
            if (item.isSelect)
                return "primary";

            return "secondary";
        }
        if (isFinish) {
            if (item.answer === correct_answer) {
                return "success"
            }
            if (item.isSelect && !isCorrect) {
                return "error";
            }
            else {
                return "secondary";
            }
        }
        else return;
    }

    const answersMap = answers.map((item, index) => {
        return (
            <Button
                className={classes.answer}
                key={item.key}
                selected={item.isSelect}
                onClick={() => dispatch(selectAnswer({ answerId: item.key, question: question }))}
                color={renderColor(item)}
                // variant="outlined"
                variant={isFinish ? "contained" : "outlined"}
            >
                {item.answer}
            </Button>
        )
    })
    return (
        <div>
            <p>{question}</p>
            <Stack className={classes.buttonContainer}>
                {answersMap}
            </Stack>
        </div>
    );
}
const useStyles = makeStyles(theme => ({
}));



export default Question;
