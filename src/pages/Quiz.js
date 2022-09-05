import React, { useEffect, useState } from "react";
import { makeStyles } from '@mui/styles';
import Question from '../components/Question';
import he from 'he';
import { useSelector, useDispatch } from 'react-redux';
import { check, getQuizItems, shuffleAnswer, start } from "../features/quiz/quizSlice";
import { store } from "../store";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Quiz() {

    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    
    // useEffect(() => {
    //     dispatch(getQuizItems())
    // }, [])
    
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

                <div className={`${classes.center} ${classes.button}`}>
                    
                <Button
                variant="contained"
                size= "large"
                
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
                <div className={`${classes.center} ${classes.button}`}>
                <Button
                variant="contained"
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
        // justifyContent: "center",
        //alignItems: "center",
        marginTop: "15px",
        backgroundColor: "rgba(255,255,255, 0.8)",
        padding: "1% 15% 2% 15%",
        borderRadius: "10px",
        margin: "0 auto",

    },
    center: {
        display:"flex",
        flexDirection: "column",
        margin:"0 auto",
    },
    button: {
        marginTop:"20px"
    }
}));
export default Quiz;

    //API result
    // const [questionsData, setQuestionsData] = useState([]);

    //Call to the api
    // useEffect(() => {
    //     fetch("https://opentdb.com/api.php?amount=10")
    //         .then(res => res.json())
    //         .then(data => setQuestionsData(data.results))

    // }, []);

    //SHUFFLE ANSWERS 
    //ONLY FOR WORDS

    // const shuffleAnswers = (array) => {
    //     //if boolean question not shuffle
    //     if (array[0].toLowerCase() === "true" || array[0].toLowerCase() === "false") {
    //         array[0] = "True";
    //         array[1] = "False";
    //         return array;
    //     }
    //     if (array[0].match(/^\d*?[.,]?\d+$/) != null) {
    //         array = array.sort((a, b) => a - b);
    //         return array;
    //     }

    //     //Shuffle answers with Fisher-Yates algorithm
    //     let currentIndex = array.length;
    //     let randomIndex;

    //     // While there remain elements to shuffle.
    //     while (currentIndex !== 0) {

    //         // Pick a remaining element.
    //         randomIndex = Math.floor(Math.random() * currentIndex);
    //         currentIndex--;

    //         // And swap it with the current element.
    //         [array[currentIndex], array[randomIndex]] = [
    //             array[randomIndex], array[currentIndex]];
    //     }
    //     return (array);
    // }


    //Map api data to Question component 

    // const questionsMap = questionsData.map((question, index) => {
    //     //Create an array with answers to pass to Question component
    //     //decode HTML special chars with "he" library
    //     let shuffledAnswers = [...question.incorrect_answers.map(answer => { return he.decode(answer) }), he.decode(question.correct_answer)]
    //     //shuffle array
    //     shuffledAnswers = shuffleAnswers(shuffledAnswers);
    //     return (
    //         <Question
    //             key={index}
    //             category={question.category}
    //             difficulty={question.difficulty}
    //             //Useful to question
    //             booleanType={question.type === "multiple" ? false : true}
    //             question={he.decode(question.question)}
    //             correctAnswer={he.decode(question.correct_answer)}
    //             answers={shuffledAnswers}
    //             //Useful to answer
    //             isCorrect={false}
    //         // isSelected={isSelected(
    //         //     //selected answer

    //         // )}
    //         />
    //     )
    // })

    // const isSelected = (answer) => {
    //     questionsMap.map((question) => {
    //         if (answer === question.correctAnswer) {
    //             question.isCorrect=true;
    //         }
    //         return question;
    //     })
    //     return (questionsMap);
    // }