import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header/Header'
import { useSelector } from 'react-redux'

const ViewMessage = (props) => {
  const [recievedMessage,setrecievedMessage]=useState([])
    let param=useParams()
   console.log(param.id)

//this is senderemail or logged in user
  //this is senderemail or logged in user
   let senderEmail = useSelector((state) => state.auth.email);
   if (!senderEmail) {
     senderEmail = localStorage.getItem("senderEmail");
   }
async function getData(){
  let senderEmailFil = "";
  for (let i = 0; i < senderEmail.length; i++) {
    if (senderEmail[i] === ".") {
      continue;
    }
    senderEmailFil = senderEmailFil + senderEmail[i];
  }
  const resp = await fetch(
    `https://expensetracker-ff73b-default-rtdb.firebaseio.com/${senderEmailFil}/recievedEmail.json`
  );
  const data = await resp.json();
  console.log(data);
  let arr=[]
  for (let key in data) {
    console.log(data[key]);
    arr.push({
      desc: data[key].desc,
      message: data[key].message,
      senderEmail: data[key].senderEmail,
      recieverEmail: data[key].recieverEmail,
      unRead:true,
      id1:key,
    });
  }
  setrecievedMessage(arr)
}

const filteredMessage=recievedMessage.filter((ele)=>{
  return ele.id1===param.id 
})
let f2={...filteredMessage[0]}
console.log(f2)

console.log(filteredMessage)
useEffect(()=>{
  getData()
},[])

  return (
    <div>
<Header></Header>
    <div className='border w-[70%] m-auto p-10 rounded-xl mt-5'>
  
    <div className='w-[95%] bg-gray-300 m-auto p-4 rounded-xl'>From:{f2.senderEmail}</div>
    <div className='w-[95%] m-auto font-bold mt-2'>{f2.message}</div>
  
    {/* why the hejadfljdlf */}
    </div>
    </div>
  )
}

export default ViewMessage