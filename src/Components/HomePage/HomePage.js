import React from 'react'
import { Link } from 'react-router-dom'
import ViewMessage from '../Inbox/ViewMessage'
import Header from '../Header/Header'
const HomePage = () => {
  return (
    <div className='bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500 h-screen'>

    <div className='bg-transparent'>
      <Header/>
     
     
    </div>
    <div className='animate__animated animate__backInLeft  text-8xl  text-center mt-56   '>
Welcome To MailBox
    </div>
    </div>
  )
}

export default HomePage