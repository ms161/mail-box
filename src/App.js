import SignUpPage from "./Components/SignUpPage/SignUpPage";
import { Routes,Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import HomePage from "./Components/HomePage/HomePage";
import Editor2 from "./Components/Editor/Editor2";
import Inbox from "./Components/Inbox/Inbox";
import ViewMessage from "./Components/Inbox/ViewMessage";
function App() {

 
  return (
    <div className="App">
      <Routes>
<Route index element={<SignUpPage></SignUpPage>}/>
<Route path="/login" element={<LoginPage></LoginPage>}/>
<Route path="/home" element={<HomePage></HomePage>}/>
<Route path="/editor" element={<Editor2></Editor2>}/>
<Route path="/inbox" element={<Inbox></Inbox>}/>
<Route path="/Message/:id" element={<ViewMessage></ViewMessage>}/>
   
      </Routes>
    </div>
  );
}

export default App;
