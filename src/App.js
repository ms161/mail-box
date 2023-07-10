import SignUpPage from "./Components/SignUpPage/SignUpPage";
import { Routes,Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import HomePage from "./Components/HomePage/HomePage";
import Editor2 from "./Components/Editor/Editor2";
import Inbox from "./Components/Inbox/Inbox";
function App() {
 
  return (
    <div className="App">
      <Routes>
<Route index element={<SignUpPage></SignUpPage>}/>
<Route path="/login" element={<LoginPage></LoginPage>}/>
<Route path="/home" element={<HomePage></HomePage>}/>
<Route path="/editor" element={<Editor2></Editor2>}/>
<Route path="/inbox" element={<Inbox></Inbox>}/>
   
      </Routes>
    </div>
  );
}

export default App;
