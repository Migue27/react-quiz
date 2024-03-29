import {React, useState} from 'react';
import { Button, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, startGame } from '../features/quiz/quizSlice';
import { useEffect } from 'react';


function Start(){
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories())

  }, [])


  const {categories, categoriesIsLoading} = useSelector(state => state.quiz);


  const[category, setCategory] = useState('');


    const handleChange = (e) => {
      setCategory(e.target.value);    
    };

    // useEffect(()=>{
    //   console.log({category})
    // },[category])


  // const startGame = () =>{
  //   navigate('./Quiz');
  // }

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        minWidth: 200,
      },
    },
  };

  const handleStartGame = async ()=>{
    await dispatch(startGame(category))
    navigate('./Quiz');
  }

  if(categoriesIsLoading)
  {
    return (
      <div className={classes.root}>
      <div className={classes.container}>
        <h1 className={classes.title}>Quiz!</h1>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }
  return (
    
    <div className={classes.root}>
      <div className={classes.container}>
        <h1 className={classes.title}>Quiz!</h1>
        
        <FormControl fullWidth>
          <InputLabel 
          id="demo-simple-select-label"
          color= "secondary"
          >
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            color= "secondary"
            id="demo-simple-select"
            value={category}
            label="Category"
            MenuProps={MenuProps}
            onChange={handleChange}
          >
            {categories.map((item) => {

              return(
                
              <MenuItem value={item.id}>{item.name}</MenuItem>
              )
            })}
            
          </Select>
          
        </FormControl>
        <div className={classes.button}>
         
          <Button 
          variant="contained"
          color= "secondary"
          onClick={handleStartGame} 
          // onClick={changeRoute}
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
    minWidth:"300px"
   

  },
  title: {

  },
  button: {

    marginTop: "1rem",
  },
  InputLabel: {
    minWidth: "120",
  },

}));

export default Start;
