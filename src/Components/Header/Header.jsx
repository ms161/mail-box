import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div>
         <div className="flex rounded-xl border gap-3 bg-gray-300 p-4 items-center">

<div className=" right-[40rem] bg-green-700 p-2 t-0 rounded-xl">
  <Link to={"/home"}>Go TO HomePage</Link>
</div>
 <Link to='/editor'>
  <div><button className='bg-blue-700 p-2 rounded-2xl'>Compose Email</button></div>
  </Link>
  <Link to={'/inbox'}>
  <div ><button className='bg-green-500 p-2 rounded-xl'>Check Your Inbox</button></div>
  </Link>
</div>
    </div>
  )
}

export default Header