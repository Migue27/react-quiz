import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getQuizItems } from '../features/quiz/quizSlice';


function Start(){
    const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeRoute = () =>{
    navigate('./Quiz');
    dispatch(getQuizItems());
  }
  
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <h1 className={classes.title}>Quizz!</h1>
        <div className={classes.button}>
         
          <Button variant="contained" 
          onClick={changeRoute}
            >
            Start
          </Button>

        </div>
      </div>
      </div>
  );


}
const useStyles = makeStyles(theme => ({
  root:{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
    width:"100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255, 0.8)",
    padding: "1% 15% 2% 15%",
    borderRadius: "10px",
    margin: "0 auto",
   

  },
  title: {

  },
  button: {

    marginTop: "1rem",
  },

}));

export default Start;
