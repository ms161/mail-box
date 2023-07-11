import SignUpPage from "./Components/SignUpPage/SignUpPage";
import { Routes,Route, useNavigate } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import HomePage from "./Components/HomePage/HomePage";
import Editor2 from "./Components/Editor/Editor2";
import Inbox from "./Components/Inbox/Inbox";
import ViewMessage from "./Components/Inbox/ViewMessage";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Sent from "./Components/Sent/Sent";
import SentViewMEssage from "./Components/Sent/SentViewMEssage";
function App() {

  const isAuth=useSelector(state=>state.auth.isLoggedIn)
  const navigate=useNavigate()
  useEffect(()=>{

    if(!isAuth){
      navigate('/login')
    }
  },[])
 
  return (
    <div className="App">
      <Routes>
<Route index element={<SignUpPage></SignUpPage>}/>
<Route path="/login" element={<LoginPage></LoginPage>}/>
<Route path="/home" element={<HomePage></HomePage>}/>
<Route path="/editor" element={<Editor2></Editor2>}/>
<Route path="/inbox" element={<Inbox></Inbox>}/>
<Route path="/sent" element={<Sent></Sent>}/>
<Route path="/Message/:id" element={<ViewMessage props={'this is test props'}></ViewMessage>}/>
<Route path="/sentMessage/:sendId" element={<SentViewMEssage/>}/>
   
      </Routes>
    </div>
  );
}

export default App;
