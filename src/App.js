import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Start from './pages/Start';
import Quiz from './pages/Quiz';
import { makeStyles } from '@mui/styles';
import background from './images/background-2.jpg';


function App() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Routes>
        <Route path='/Quiz' element={<Quiz />} />
        <Route path='/' element={<Start />} />
      </Routes>
    </div>
  );


}
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100vw",
    // height: "100vh",
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',

  },
}))
export default App;
