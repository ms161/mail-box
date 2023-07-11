import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import { useSelector } from 'react-redux/es/hooks/useSelector'
const SentEmail = (ele) => {
    console.log(ele)
    let senderEmail = useSelector((state) => state.auth.email);
  if (!senderEmail) {
    senderEmail = localStorage.getItem("senderEmail");
  }
    async function deleteApiRequest(){
        let senderEmailFil = "";
        for (let i = 0; i < senderEmail.length; i++) {
          if (senderEmail[i] === ".") {
            continue;
          }
          senderEmailFil = senderEmailFil + senderEmail[i];
        }
        console.log(senderEmailFil)
        const resp= await fetch(`https://expensetracker-ff73b-default-rtdb.firebaseio.com/${senderEmailFil}/sentEmails/${ele.paramKey}.json`,{
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
    
  return (
    <div>

         
<div className="mt-4 w-full bg-blue-800">
          <div className="flex justify-between  bg-gray-300 p-4 rounded-xl ">
        <Link to={`/sentMessage/${ele.paramKey}`}>
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
  )
}

export default SentEmail