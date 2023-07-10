import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Editor2 = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [desc, setDesc] = useState("");

  const [sendEmailTo, setSendEmailTo] = useState("");
  console.log(convertToRaw(editorState.getCurrentContent()).blocks[0].text);
  let senderEmail = useSelector((state) => state.auth.email);
  senderEmail = localStorage.getItem("senderEmail");
  console.log(senderEmail);
  const emailObj = {
    senderEmail: senderEmail,
    desc: desc,
    message: convertToRaw(editorState.getCurrentContent()).blocks[0].text,
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
    <div className="mt-1 ml-5">
      <div className="fixed right-[40rem] bg-green-700 p-2 rounded-xl">
        <Link to={"/home"}>Go TO HomePage</Link>
      </div>
      <div className=" border-gray-500 pb-3 w-[98%]">
        <span>To</span>{" "}
        <input
        placeholder="Enter Email"
          type="email"
          onChange={emailHandler}
          className="bg-white border border-black rounded-2xl pl-2 pr-2"
        ></input>
      </div>
      <div className="w-[98%] pb-4 mt-3">
        <input
        placeholder="Enter Subject"
          onChange={descHandler}
          className="w-full bg-white border rounded-xl border-black p-3 active:border-none "
        ></input>
      </div>
      <div className=" border p-2 w-[98%] rounded-xl border-black">
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
        Send Email
      </button>
    </div>
  );
};

export default Editor2;
