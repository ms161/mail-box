import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Inbox = () => {
  const [sentEmail,setSentEmail]=useState([])
  const [recievedEmail,setRecievedEmail]=useState([])

  let senderEmail=useSelector(state=>state.auth.email)
  if(!senderEmail){
    senderEmail=localStorage.getItem('senderEmail')
  }
async function sentHandler(){
let arr=[]
  const resp=await fetch('https://expensetracker-ff73b-default-rtdb.firebaseio.com/mailBox.json')
  const data=await resp.json()
 
  for(let key in data){

    console.log(data[key])
    arr.push({
       desc:data[key].desc,
       message:data[key].message,
       senderEmail:data[key].senderEmail,
       recieverEmail:data[key].recieverEmail

    })
  }
  console.log(arr,'this is all data')
  //sentEmails Data
  //sentEmails Data
  //sentEmails Data
 const sentEmails= arr.filter((ele)=>{
    return  ele.senderEmail===senderEmail
  })
  //recieved email Data
  //recieved email Data
  //recieved email Data
  const recievedEmails=arr.filter((ele)=>{
      return ele.recieverEmail
  })
  console.log(sentEmails,'this data is fitlered by email  ')
  setSentEmail(sentEmails)
  console.log(data)

}
console.log(sentEmail)
  return (
    <div>

    <div className='bg-gray-700 w-[14%] fixed left-0 h-screen top-0 font-bold text-white flex flex-col gap-11 '>
      <div className='p-3 bg-blue-700'>Inbox</div>
      <div ><button onClick={sentHandler}>Sent</button></div>
    </div>
   
<div className=''>


    {
      sentEmail.map((ele)=>(
        <div className='mt-[2rem]  ml-[20rem]'>
        <span className='bg-green-600 p-2 text-center'>{ele.desc}</span>
        <span className='bg-red-600 p-2 text-center ml-[7rem]'>{ele.message}</span>
        </div >
      ))
    }
    </div>
    </div>
  )
}

export default Inbox