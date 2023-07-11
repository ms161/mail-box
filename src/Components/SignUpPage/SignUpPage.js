import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(null);
  const navigate=useNavigate()

  const emailHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setEnteredPassword(e.target.value);
    console.log(confirmPassword)
  };
  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const signUpHandler = (e) => {
    if (enteredPassword!== confirmPassword ) {
      setPasswordMatch('Password dont match');

      setTimeout(() => {
        setPasswordMatch(false);
      }, 3000);
      return 
    }
    if(enteredPassword.length<=5 ){
      setPasswordMatch('Length should be more then 5')

      setTimeout(() => {
        setPasswordMatch(null)
      }, 3000);
      console.log('running')
      return 
    }
    signUpApi()

  };

  async function signUpApi() {
    try{

      const resp = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBgWxt6RxW_LbQKHbJk3IHn2MgI1yhAp6o",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
  
      const data = await resp.json();
  
      if(resp.ok){
        console.log('sign up successfull')
        navigate('/home')

      }
      else{
        setPasswordMatch(data.error.message)
        setTimeout(() => {
           setPasswordMatch(null)
        }, 3000);
      }
    }
    catch (error){


    }
  }

  return (
    <div className="h-screen bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 m-auto mt-[15re] w-screen bg-green-400 flex flex-col gap-5 justify-center items-center">
    <div className=" animate__animated animate__backInRight animate__slow  flex flex-col bg-slate-900-800  border rounded-lg border-gray-500 shadow-2xl gap-5 p-[10rem] ">
      <div className="text-center font-bold text-2xl text-red-200 ">
        Sign UP
      </div>
      <div className=" w-[20rem] ">
        <input 
          onChange={emailHandler}
          className="p-4 w-full  text-white shadow-2xl require rounded-lg "
          type="text"
          placeholder="Email"
        />
      </div>
      <div className=" w-[20rem] ">
        <input
          onChange={passwordHandler}
          className="p-4 w-full text-white shadow-2xl rounded-lg "
          type="password"
          placeholder="Password"
        />
      </div>
      <div className=" w-[20rem] ">
        <input
          onChange={confirmPasswordHandler}
          className="p-4 w-full text-white  shadow-2xl rounded-lg "
          type="password"
          placeholder="Confirm Password"
        />
      </div>
      <div className="font-bold font-serif text-center text-xl underline  text-white  italic">
        {passwordMatch && <span>{passwordMatch}</span>}
      </div>
      <div className=" text-center">
        <button
          onClick={signUpHandler}
          className="relative bg-gradient-to-r hover:animate-none from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full w-full shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-105 animate-pulse  "
        >
          Sign Up
        </button>
      </div>
    </div>
    <div className="animate__animated animate__backInLeft animate__slow">
      <button className="bg-green-400 p-4 relative hover:animate-none animate-pulse bg-gradient-to-r from-yellow-400 to-red-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-110 hover:bg-green-900 hover:text-white  ">
   <Link to={'/login'}>
       Already have an account? Login
   </Link>
    
      </button>
    </div>
  </div>
  )
}

export default SignUpPage