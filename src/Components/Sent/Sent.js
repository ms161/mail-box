import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import SentEmail from './SentEmail';
import Header from '../Header/Header';


const Sent = () => {
  let senderEmail = useSelector((state) => state.auth.email);
  if(!senderEmail){
senderEmail=localStorage.getItem('senderEmail')
  }
  const [sentEmail,setSentEmail]=useState([])
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
console.log(senderEmail,'this is email')
    //get request for recieved emails
    //get request for recieved emails
    let arr = [];
    const resp = await fetch(
      `https://expensetracker-ff73b-default-rtdb.firebaseio.com/${senderEmailFil}/sentEmails.json`
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
     
    }
    console.log(data)
    setSentEmail(arr)
  
    // console.log(sentEmails,'this data is fitlered by email  ')
    // setSentEmail(sentEmails)
    console.log(arr);
  }
  useEffect(()=>{
    sentHandler()
  },[])

  console.log(sentEmail)
  return (
    <div>
      <Header></Header>
{sentEmail.map(ele=>(
  <>
<SentEmail
 senderEmail={ele.senderEmail}
 desc={ele.desc}
 message={ele.message}
paramKey={ele.id1}
unRead={ele.unRead}
/>
  </>
))}

    </div>
  )
}

export default Sent