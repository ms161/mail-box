import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Inbox = () => {
  const [sentEmail,setSentEmail]=useState([])
  const [recievedEmail,setRecievedEmail]=useState([])

  //this is senderemail or logged in user
  //this is senderemail or logged in user
  let senderEmail=useSelector(state=>state.auth.email)
  if(!senderEmail){
    senderEmail=localStorage.getItem('senderEmail')
  }
async function sentHandler(){
  //removind . from email
  //removind . from email
  let senderEmailFil = "";
  for (let i = 0; i < senderEmail.length; i++) {
    if (senderEmail[i] === ".") {
      continue;
    }
    senderEmailFil = senderEmailFil + senderEmail[i];
  }

//get request for recieved emails
//get request for recieved emails
let arr=[]
  const resp=await fetch(`https://expensetracker-ff73b-default-rtdb.firebaseio.com/${senderEmailFil}/recievedEmail.json`)
  const data=await resp.json()
 console.log(data)
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
  setRecievedEmail(arr)
  // console.log(sentEmails,'this data is fitlered by email  ')
  // setSentEmail(sentEmails)
  console.log(data)

}
console.log(recievedEmail)  
useEffect(()=>{
  sentHandler()
},[])
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