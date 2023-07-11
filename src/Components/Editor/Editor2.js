import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

const Editor2 = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [desc, setDesc] = useState("");
  const [isSending,setIsSending]=useState('')

  const [sendEmailTo, setSendEmailTo] = useState("");
  console.log(convertToRaw(editorState.getCurrentContent()).blocks[0].text);
  //this is senderemail or logged in user
  //this is senderemail or logged in user
  let senderEmail = useSelector((state) => state.auth.email);
  senderEmail = localStorage.getItem("senderEmail");
  console.log(senderEmail);
  //storing email message in object
  //storing email message in object
  const emailObj = {
    senderEmail: senderEmail,
    desc: desc,
    message: convertToRaw(editorState.getCurrentContent()).blocks[0].text,
    unRead:true 
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const emailHandler = (e) => {
    setSendEmailTo(e.target.value);
  };

  const descHandler = (e) => {
    setDesc(e.target.value);
  };
  // const messageHandler=e=>{
  //   setMessage(e.target.value)
  // }
  //  console.log(message)

  const submitHandler = (e) => {
    setIsSending('Sending...')
    postData();
    localStorage.setItem("email", sendEmailTo);
  };

  async function postData() {
    try {
      console.log(sendEmailTo);
      let sendEmailToFilt = "";
      for (let i = 0; i < sendEmailTo.length; i++) {
        if (sendEmailTo[i] === ".") {
          continue;
        }
        sendEmailToFilt = sendEmailToFilt + sendEmailTo[i];
      }
      //sender email
      //sender email
      let senderEmailFil = "";
      for (let i = 0; i < senderEmail.length; i++) {
        if (senderEmail[i] === ".") {
          continue;
        }
        senderEmailFil = senderEmailFil + senderEmail[i];
      }
      console.log(sendEmailToFilt);
      const resp = await fetch(
        `https://expensetracker-ff73b-default-rtdb.firebaseio.com/${sendEmailToFilt}/recievedEmail.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailObj),
        }
      );
      const resp2 = await fetch(
        `https://expensetracker-ff73b-default-rtdb.firebaseio.com/${senderEmailFil}/sentEmails.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailObj),
        }
      );


      const id = await resp.json();
      setIsSending('Sent Successfully :)')
      setTimeout(() => {
        setIsSending(null)
      }, 4000);
      console.log(id);
    } catch (err) {}
  }
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const email2 = localStorage.getItem("email");
      const resp = await fetch(
        `https://expensetracker-ff73b-default-rtdb.firebaseio.com/mailBox.json`
      );

      const id = await resp.json();
      console.log(id);
    } catch (err) {}
  }

  return (
    <div className="mt-1 ">
      {/* <div className="flex rounded-xl border gap-3 bg-gray-300 p-4 items-center">

      <div className=" right-[40rem] bg-green-700 p-2 t-0 rounded-xl">
        <Link to={"/home"}>Go TO HomePage</Link>
      </div>
       <Link to='/editor'>
        <div><button className='bg-blue-700 p-2 rounded-2xl'>Compose Email</button></div>
        </Link>
        <Link to={'/inbox'}>
        <div ><button className='bg-green-500 p-2 rounded-xl'>Check Your Inbox</button></div>
        </Link>
      </div> */}
      <Header></Header>
      <div className="border w-[70%] flex flex-col justify-center p-3 items-center rounded-xl m-auto mt-8  border-gray-500">

    <p className="font-bold text-xl font-serif">Compose Email</p>
      <div className=" border-gray-500 flex flex-col mt-5 pb-3 w-[98%]">
        
        <label>Sent To:</label>
        <input
        id="sent"
        placeholder="Enter Email"
          type="email"
          onChange={emailHandler}
          className="bg-white border p-3 border-gray-400 rounded-2xl pl-2 pr-2"
        ></input>
      </div>
      <div className="w-[98%] pb-4 mt-3">
        <label>Subject:</label>
        <input
        placeholder="Enter Subject"
          onChange={descHandler}
          className="w-full bg-white border rounded-xl border-gray-400 p-3 active:border-none "
        ></input>
      </div>
      <div className=" border p-2 w-[98%] rounded-xl border-gray-400">
        <Editor
        
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        ></Editor>
      </div>
      <div className="border mt-5"></div>
      <button
        className="bg-green-500 p-2 pl-10 pr-10 text-white rounded-2xl"
        onClick={submitHandler}
      >
       {isSending?`${isSending}`:'Send Email'}
      </button>
      </div>
    </div>
  );
};

export default Editor2;
