
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const LoginPage = () => {
    const [enteredEmail, setEnteredEmail] = useState();
    const [enteredPassword, setEnteredPassword] = useState();
    const [passwordMatch, setPasswordMatch] = useState(null);
    const [isLoading,setIsLoading]=useState(null)
    const navigate=useNavigate()
 
    const emailHandler = (e) => {
      setEnteredEmail(e.target.value);
    };
    const passwordHandler = (e) => {
      setEnteredPassword(e.target.value);
   
    };
   
   
  
    const signUpHandler = (event) => {
     setIsLoading('Logging You In...')
    //  event.preventDefault()
      loginApi()
  
    };
  
    async function loginApi() {
      try{
  
        const resp = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBgWxt6RxW_LbQKHbJk3IHn2MgI1yhAp6o",
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
            console.log(data)
            console.log(resp)
          console.log('Login successfull')
          setIsLoading(null)
          navigate('/home') 
          // ctx.onLogin(data.idToken)
          localStorage.setItem('token',data.idToken)
        

        }
        else{
            setIsLoading(null)
          setPasswordMatch(data.error.message)
          setTimeout(() => {
             setPasswordMatch(null)
          }, 3000);
        }   
      }
      catch (error){
        // console.log(error)
  
  
      }
    }
  return (
    <div className=" h-screen bg-gradient-to-b  from-blue-500 via-purple-500 to-pink-500m auto mt-[15re] w-screen bg-green-400 flex flex-col gap-5 justify-center items-center">
    <div className=" animate__animated animate__backInRight animate__slow  flex flex-col bg-slate-900-800  border rounded-lg border-gray-500 shadow-2xl gap-5 p-[10rem] ">
      <div className="text-center font-bold text-2xl text-red-200 ">
        Log In
      </div>
     

     
      <div className=" w-[20rem] ">
        <input
          onChange={emailHandler}
          className="p-4 w-full  text-white shadow-2xl rounded-lg "
          type="text"
          placeholder="Email"
          required
        />
      </div>
      <div className=" w-[20rem] mt-4 ">
        <input
          onChange={passwordHandler}
          className="p-4 w-full text-white shadow-2xl rounded-lg "
          type="password"
          placeholder="Password"
          required
        />
      </div>
     
      <div className="font-bold font-serif text-center text-xl underline  text-white  italic">
        {passwordMatch && <span>{passwordMatch}</span>}
      </div>
      {isLoading&& <div className='text-white font-bold  text-center text-xl' >{isLoading}</div>  }
      <div className=" text-center">
        <button
          onClick={signUpHandler}
          className="relative bg-gradient-to-r hover:animate-none from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full w-full shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-105 animate-pulse  "
        >
          Log In
        </button>
      {/* <Link to={'/forget'}> */}
      <button className='bg-gradient-to-b  from-red-600  to-blue-600  p-3 rounded-xl mt-4  hover:scale-110  text-white'>
          Forget Password 
        </button>
      {/* </Link>  */}
      </div>
    </div>
    <div className='animate__animated animate__backInLeft animate__slow'>
      <button className=" bg-green-400 p-4 relative hover:animate-none animate-pulse bg-gradient-to-r from-yellow-400 to-red-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-lg overflow-hidden transition-all duration-500 transform hover:scale-110 hover:bg-green-900 hover:text-white  ">
      <Link to={'/'}>
      Dont't Have an account? SignUp 
      </Link> 
      </button>
    </div>
  </div>
  )
}

export default LoginPage