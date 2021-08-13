import { useState } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

import classes from "./AddUser.module.css";

const AddUser = props => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const resetUserInputs = () => {
    setEnteredUsername(''); // Reseting form username input
    setEnteredAge(''); // Reseting form age input
  };

  const addUserHandler = (event) => {
    event.preventDefault(); // preventing reloading a page when submiting

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) { // Checks if entered field is empty field
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).'
      });

      return; // return finishes the function
    }

    if (+enteredAge < 1) { // + converts enteredAge to number since its a string
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).'
      });
      
      return;
    }

    // console.log(enteredUsername, enteredAge); // Loggin user input and will only log if user entered valid inputs
    props.onAddUser(enteredUsername, enteredAge);
    resetUserInputs();
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value); // Getting username value 
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value); // Getting age value
  };

  const errorHandler = () => { // null is treated as faulsy value
    setError(null);
  };

  return (
    <div>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>} 

      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" value={enteredUsername} onChange={usernameChangeHandler} /> 

          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" value={enteredAge} onChange={ageChangeHandler} /> 

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;