import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import EmaiLItems from "./EmaiLItems";
import { useParams } from "react-router-dom";
import ViewMessage from "./ViewMessage";

const Inbox = () => {
  const [sentEmail, setSentEmail] = useState([]);
  const [recievedEmail, setRecievedEmail] = useState([]);
  const [unReadMessagesCount,setUnReadMessagesCount]=useState()

  //this is senderemail or logged in user
  //this is senderemail or logged in user
  let senderEmail = useSelector((state) => state.auth.email);
  if (!senderEmail) {
    senderEmail = localStorage.getItem("senderEmail");
  }
  async function sentHandler() {
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
    let arr = [];
    const resp = await fetch(
      `https://expensetracker-ff73b-default-rtdb.firebaseio.com/${senderEmailFil}/recievedEmail.json`
    );
    const data = await resp.json();
    console.log(data);
    let count=0
    for (let key in data) {

      console.log(data[key].unRead);
      arr.push({
        desc: data[key].desc,
        message: data[key].message,
        senderEmail: data[key].senderEmail,
        recieverEmail: data[key].recieverEmail,
        unRead:data[key].unRead,
        id1:key,
      });
     
      if(data[key].unRead)count++ 

      
    }
    setUnReadMessagesCount(count)
    console.log(arr, "this is all data");
    //sentEmails Data
    //sentEmails Data
    //sentEmails Data
    setRecievedEmail(arr);
    console.log(recievedEmail)
    // console.log(sentEmails,'this data is fitlered by email  ')
    // setSentEmail(sentEmails)
    console.log(data);
  }
  console.log(recievedEmail);
  useEffect(() => {
let a=setInterval(() => {
  
  sentHandler()
}, 2000);
return (()=>{
  clearInterval(a)
})
  }, []);


  console.log(sentEmail);
  let params=useParams()
  
  return (
    <div className="bg-gradient-to-t from-orange-400 to-sky-400 h-screen">
<Header></Header>
    <div className="border border-black mt-2 w-[60%] m-auto p-4">
      
      <div className="text-2xl text-white">My Inbox: {unReadMessagesCount}</div>
      {recievedEmail.map((ele) => (
        <>
       
        <EmaiLItems  
        senderEmail={ele.senderEmail}
        desc={ele.desc}
        message={ele.message}
      paramKey={ele.id1}
      unRead={ele.unRead}
      />
   
      </>
      ))}
    </div>
    </div>
  );
};

export default Inbox;
