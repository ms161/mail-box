import React from 'react'
import { Link } from 'react-router-dom'
import ViewMessage from '../Inbox/ViewMessage'
const HomePage = () => {
  return (
    <div className='text-2xl'>
        <Link to='/editor'>
        <div><button className='bg-blue-700 p-4 rounded-2xl'>Compose Email</button></div>
        </Link>
        <Link to={'/inbox'}>
        <div className='mt-5'><button className='bg-green-500 p-4 rounded-xl'>Check Your Inbox</button></div>
        </Link>
      
    </div>
  )
}

export default HomePage