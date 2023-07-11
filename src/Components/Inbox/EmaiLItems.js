import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ViewMessage from "./ViewMessage";
import BlueDot from "../BlueDot";
import { useSelector } from "react-redux";

const EmaiLItems = (ele) => {
  let params = useParams();
  // const [random,setRandomState]=useState({  })
  console.log(ele.paramKey,'this is firebase key');
  let senderEmail = useSelector((state) => state.auth.email);
  if (!senderEmail) {
    senderEmail = localStorage.getItem("senderEmail");
  }
  //patch request for unread//////////////////////////////////////////////////////////////////////////////////// 
  //patch request for unread//////////////////////////////////////////////////////////////////////////////////// 
  async function unReadHandler(){
     //removind . from email
    //removind . from email
    let senderEmailFil = "";
    for (let i = 0; i < senderEmail.length; i++) {
      if (senderEmail[i] === ".") {
        continue;
      }
      senderEmailFil = senderEmailFil + senderEmail[i];
    }
    const resp= await fetch(`https://expensetracker-ff73b-default-rtdb.firebaseio.com/${senderEmailFil}/recievedEmail/${ele.paramKey}.json`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ unRead: false }),
    })
    if(resp.ok){
        console.log('response is ok')
    }
  }
  //Delete an Email//////////////////////////////////////////////////////////////////////
  //Delete an Email///////////////////////////////////////////////////////////////////////

async function deleteApiRequest(){
    let senderEmailFil = "";
    for (let i = 0; i < senderEmail.length; i++) {
      if (senderEmail[i] === ".") {
        continue;
      }
      senderEmailFil = senderEmailFil + senderEmail[i];
    }
    const resp= await fetch(`https://expensetracker-ff73b-default-rtdb.firebaseio.com/${senderEmailFil}/recievedEmail/${ele.paramKey}.json`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      
    })
}  
  const deleteEmailHandler=e=>{
    console.log('deletebtn clicked')
    e.target.parentElement.parentElement.parentElement.remove()
deleteApiRequest()
  }

  
  
const unread=e=>{
    unReadHandler()
}
console.log(ele.unRead,'this is unread emailitmes')
  return (
      <div className="flex justify-center items-center ">
   
  {ele.unRead&&  <div><BlueDot></BlueDot></div>}
        <div className="mt-4 w-full bg-blue-800">
          <div onClick={unread} className="flex justify-between  bg-gray-300 p-4 rounded-xl ">
        <Link to={`/Message/${ele.paramKey}`}>
            <div>
              Recieved From:{ele.senderEmail}
              <p>{ele.desc}</p>
            </div>
            {console.log('line 79')}
         
          {console.log('line 83')}
      </Link>
            <div>
              <button onClick={deleteEmailHandler} className="bg-red-500 p-4 rounded-xl">Delete</button>
            </div>
          </div>
        </div>
      
       
   
    </div>
  );
};

export default EmaiLItems;
