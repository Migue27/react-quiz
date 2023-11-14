import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import he from 'he';
import uniqid from 'uniqid';
import {Redirect} from 'react';

const initialState = {
    questionItems: [
        {
            key: "",
            category: "",
            type: "",
            difficulty: "",
            question: "",
            correct_answer: "",
            answers: [],
            isCorrect: false,
        }
    ],
    isLoading: true,
    isFinish: false,
    points: 0,
<<<<<<< HEAD
    categories:[{
        key: "",
        name:"",
    }],
    category: 0,
    categoriesIsLoading: true,
}
const urlQuestions = 'https://opentdb.com/api.php?amount=10';
const urlCategories = 'https://opentdb.com/api_category.php';

export const getQuizItems = createAsyncThunk('quiz/getQuizItems',
    async (name,thunkAPI) => {
        try {
            let url = urlQuestions;
            const allCategories = thunkAPI.getState().quiz.categories[0].key;
            
            const category = thunkAPI.getState().quiz.category

            if(category !== allCategories && category !== undefined)
            {
                
                url = urlQuestions + "&category="+category;
                // `${urlQuestions}&category=${category}`
            }

            const resp = await axios(url);
            //const finalPayload = resp.data;   
            //thunkAPI.dispatch(shuffleAnswer())
            //return finalPayload;
=======
}
const url = 'https://opentdb.com/api.php?amount=10';

export const getQuizItems = createAsyncThunk('quiz/getQuizItems',
    async (name, thunkAPI) => {
        try {
            const resp = await axios(url);
            //const finalPayload = resp.data;   
            //thunkAPI.dispatch(shuffleAnswer())
            //retunr finalPayload;
>>>>>>> main
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong :(');
        }

    })

<<<<<<< HEAD
export const getCategories = createAsyncThunk('quiz/getCategories',
    async (name,thunkAPI) => {
        try {
            const resp = await axios(urlCategories);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong :(');
        }
        
    })

=======
>>>>>>> main
const quizSlice = createSlice({
    
    name: 'quiz',
    initialState: initialState,
    extraReducers: {
<<<<<<< HEAD
        [getCategories.pending]: (state) =>{
            state.categoriesIsLoading = true;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.categories = action.payload;
            state.categories = state.categories.trivia_categories.map((item) => {
                return {
                    key: item.id,
                    ...item,
                    name: item.name,
                }
            })
            state.categoriesIsLoading = false;
            const newKey = Math.max(...state.categories.map(item => item.key))
            state.categories = [{key: newKey+1, id: newKey+1, name:"All Categories"}, ...state.categories ]
        },
        [getCategories.rejected]: (state) => {
            state.categoriesIsLoading = false;
        },
=======
>>>>>>> main
        [getQuizItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getQuizItems.fulfilled]: (state, action) => {
            // console.log(action);

            state.questionItems = action.payload;
            state.questionItems = state.questionItems.results.map((item, index) => {
                return {
                    key: index,
                    ...item,
                    question: he.decode(item.question),
                    correct_answer: he.decode(item.correct_answer),
                    answers: [
                        ...item.incorrect_answers.map((item) => {

                            return ({
                                key: uniqid(),
                                answer: he.decode(item),
                                isSelect: false,
                            })
                        })
                        , {
                            key: uniqid(),
                            answer: he.decode(item.correct_answer),
                            isSelect: false,
                        }],
                    isCorrect: false,
                }

            })
            state.isFinish = false;
            state.isLoading = false;
            shuffleAnswers(state.questionItems);

            //console.log(state.questionItems[0].answers[0]);
            // .caseReducers used to make calls to other reducers
            // .caseReducers is an object with keys and values

            //quizSlice.caseReducers.shuffleAnswer();
            console.log(state.questionItems);
            

        },
        [getQuizItems.rejected]: (state) => {
            state.isLoading = false;
        }
    },
    reducers: {
        selectAnswer: (state, action) => {
            if (state.isFinish) {
                return;
            }
            const { answerId, question } = action.payload;
            //find question object
            const section = state.questionItems.find(item => {
                if (item.question === question)
                    return item;
                return false;
            })
            //change isSelect prop on answers array of obj 
            const answers = section.answers.map(item => {
                if (item.key === answerId) {
                    return ({ ...item, isSelect: !item.isSelect })
                }
                if (item.isSelect) {
                    return ({ ...item, isSelect: false })
                }
                return ({ ...item })
            })
            section.answers = answers;
        },
        check: (state, action) => {
            if(state.isFinish)
<<<<<<< HEAD
            return state;
=======
            return;
>>>>>>> main
            //toggle to block questions and check button
            state.isFinish = true;
            let { questions, points } = action.payload;
            
            //range questions, and over that range answers.
            //If is correct change "isCorrect" toggle and manage points.
            questions = questions.map(item => {
                const answerSelect = item.answers.find(answer => {
                    if (answer.isSelect)
                        return answer;
                    return false;
                })
                if (typeof answerSelect !== 'undefined' && item.correct_answer === answerSelect.answer) {
                    
                    points++;
                    item ={
                        ...item,
                        isCorrect: true,
                    }
                }
                return item;
<<<<<<< HEAD
            })             
            
=======
            })
>>>>>>> main
            state.points = points;
            state.questionItems = questions;
        },
        start: (state, action) =>{
            <Redirect to="/"></Redirect>
<<<<<<< HEAD
        },
        startGame: (state, action) =>{
            state.category = action.payload;
            console.log( state.category)
            // if(state.category)
                // <Redirect to="/Quiz"></Redirect>
            return state;
            // console.log(state.category);
            
=======
>>>>>>> main
        }
    }



});
const shuffleAnswers = (array) => {
    array = array.map(item => {
        //Order boolean
        if (item.answers[0].answer.toLowerCase() === "true" || item.answers[0].answer.toLowerCase() === "false") {
            item.answers[0].answer = "True";
            item.answers[1].answer = "False";

            return { ...item, answers: item.answers };
        }
        //Order nums
        if (item.answers[0].answer.match(/^\d+?[.,]?\d*$/) != null) {
            item.answers = item.answers.sort((a, b) => a.answer - b.answer);
            return { ...item, answers: item.answers };
        }

        //Shuffle answers with Fisher-Yates algorithm
        let currentIndex = item.answers.length;
        let randomIndex;

        //While there are remain elements to shuffle.
        while (currentIndex !== 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [item.answers[currentIndex].answer, item.answers[randomIndex].answer] = [
                item.answers[randomIndex].answer, item.answers[currentIndex].answer];
        }
        return { ...item, answers: item.answers };
    })
}

// console.log(quizSlice);

<<<<<<< HEAD
export const { selectAnswer, check, start, startGame } = quizSlice.actions;
=======
export const { selectAnswer, check, start } = quizSlice.actions;
>>>>>>> main

export default quizSlice.reducer;