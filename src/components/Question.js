
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux/es/exports';
//import Answer from './Answer';
import { Button, Stack } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { selectAnswer } from '../features/quiz/quizSlice';

function Question({ question, answers, isCorrect, correct_answer }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isFinish = useSelector(state => state.quiz.isFinish);

    



    const renderColor = (item) => {

        if (!isFinish) {
            // if (item.isSelect)
            //     return "primary";

            return "secondary";
        }
        if (isFinish) {
            if(item.answer === correct_answer && !item.isSelect) {
                return "correct"
            }
            if (item.answer === correct_answer && item.isSelect) {
                return "success";
            }
            if (item.isSelect && !isCorrect) {
                return "error";
            }
            else {
                return "disabled";
            }
        }
        else return;
    }

    const answersMap = answers.map((item, index) => {
        return (
            <ThemeProvider theme={theme}>
                <Button
                    className={classes.answer}
                    key={item.key}
                    selected={item.isSelect}
                    onClick={() => dispatch(selectAnswer({ answerId: item.key, question: question }))}
                    color={renderColor(item)}
                    // variant="outlined"
                    variant={item.isSelect ? "contained" : isFinish && (item.answer === correct_answer || (item.isSelect && !isCorrect)) ? "contained" : "outlined"}
                    style={isFinish ? { cursor: "default" } : {}}
                >
                    {item.answer}
                </Button>
            </ThemeProvider>
        )
    })
    return (
        <div className={classes.questionContainer}>
            <p className={classes.questionText}>{question}</p>
            <Stack className={classes.buttonContainer}>
                {answersMap}
            </Stack>
        </div>
    );
}
const useStyles = makeStyles(theme => ({
    answer:{
        // width: "50%",
        // minWidth: "350px",
    },
    questionText: {
        display: "flex",
        justifyContent:"center",
        textAlign: "center",
    },
    
    questionContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "1% 15% 2% 15%",
        // justifyContent: "center",
        margin:"0 auto",
    },
    buttonContainer: {
        display: "flex",
        
        // justifyContent: "center",
        margin:"0 auto",
    },
}));

const theme = createTheme({
    palette: {
        error: {
            main: '#DF2E38',
            contrastText:'#fff',
        },
        correct: {
            main: '#5D9C59',
            contrastText:'#fff',
        },
        disabled: {
            main: '#9f9f9f'
        },
        // secondary: {
        //     main: '#BB36D3'
        // }
      },
});



export default Question;
