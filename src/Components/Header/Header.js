import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { authActions } from '../Store/Authentication'
const Header = () => {
    const dispatch=useDispatch()
const logOutHandler=e=>{
    localStorage.removeItem('token')
    dispatch(authActions.logOut())
}

  return (
    <div>
         <div className="flex rounded-xl gap-3 animate__animated animate__fadeInDown p-4 items-center">

<div className=" right-[40rem] bg-green-700 text-white font-bold  p-2 t-0 rounded-xl">
  <Link to={"/home"}>Go TO HomePage</Link>
</div>
 <Link to='/editor'>
  <div><button className='bg-blue-700 text-white font-bold p-2 rounded-2xl'>Compose Email</button></div>
  </Link>
  <Link to={'/inbox'}>
  <div ><button className='bg-green-500 text-white font-bold p-2 rounded-xl'>Check Your Inbox</button></div>
  </Link>
  <Link to={'/sent'}>
  <div ><button className='bg-green-500 text-white font-bold p-2 rounded-xl'>Sent Emails</button></div>
  </Link>
  <Link to={'/login'}>
      <div onClick={logOutHandler} className='bg-red-700 text-white font-bold font-serif p-4 rounded-2xl'>LogOut</div>
      </Link>
</div>
    </div>
  )
}

export default Header