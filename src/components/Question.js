import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux/es/exports';
//import Answer from './Answer';
import { ButtonGroup, Button, Box, Stack } from '@mui/material';
import { selectAnswer } from '../features/quiz/quizSlice';

function Question({ question, answers, isCorrect, correct_answer }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isFinish = useSelector(state => state.quiz.isFinish);



    const renderColor = (item) => {

        if (!isFinish) {
            if (item.isSelect)
                return "primary";
            if (!item.isSelect)
                return "secondary";
        }
        if(isFinish) {
            if(item.answer === correct_answer) {
                return "success"
            }
            if(item.isSelect && !isCorrect) {
                // if (isCorrect) {
                //     return "success";
                // }
                // if (!isCorrect){
                    return "error";
                // } 
            }
            else{
                return "secondary";
            }
        }

        
        else return;
        // 
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
                variant={ isFinish ? "contained" : "outlined"}                
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
// function Question(props, { isSelected }) {
//     const classes = useStyles();

//     //To initialize the state of the component
//     const initialAnswers = props.answers.map((answer, index) => {
//         return ({
//             key: index,
//             id: index,
//             answer: props.answers[index].answer,
//             selected: false,
//             handleClick: selectAnswer,
//         })
//     });


//     //State of answers and map to Answer component
//     const [answers, setAnswers] = useState(initialAnswers);

//     // const [eachAnswer, setEachAnswer] = useState(
//     //     answers.map((item, index) => {
//     //         return (
//     //             <Button
//     //                 key={index}
//     //                 id={index}
//     //                 selected={item.selected}
//     //                 onClick={(index) => selectAnswer(index)}
//     //                 color={item.selected ? "primary" : "secondary"}
//     //             >
//     //                 {item.answer}
//     //             </Button>
//     //         )
//     //     })
//     // )

//     const answersMap = answers.map((item, index) => {
//         return (
//             <Button
//                 key={index}
//                 id={index}
//                 selected={item.selected}
//                 onClick={(index) => selectAnswer(index)}
//                 color={item.selected ? "primary" : "secondary"}
//             >
//                 {item.answer}
//             </Button>
//         )

//         // return (
//         //     <Answer
//         //         key={index}
//         //         id={index}
//         //         answer={item.answer}
//         //         selected={item.selected}
//         //         handleClick={selectAnswer}

//         //     />

//         // )
//     })

//     //if is selected pass by function to parent
//     // useEffect(() => {
//     //     answers.map((item, index) => {
//     //         if (item.selected) {
//     //             isSelected(item.answer);
//     //         }
//     //         return item;
//     //     })
//     // }, [answers])


//     //Manage selection of answers
//     function selectAnswer(id) {

//         setAnswers(prevAnswers => {
//             const newStateAnswers = prevAnswers.map(answer => {
//                 return (
//                     answer.id === id ? { ...answer, selected: true } : { ...answer, selected: false }
//                 )
//             })
//             return newStateAnswers;
//         })

//     }

//     return (
//         <div>
//             <p>{props.question}</p>
//             <ButtonGroup>
//                 {answersMap}
//             </ButtonGroup>
//             {/* {console.log(answers.map( item => {
//                 return (item.selected)
//             }))} */}

//         </div>
//     );
// }
export default Question;
