import SignUpPage from "./Components/SignUpPage/SignUpPage";
import { Routes,Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage/LoginPage";
import HomePage from "./Components/HomePage/HomePage";
function App() {
 
  return (
    <div className="App">
      <Routes>
<Route index element={<SignUpPage></SignUpPage>}/>
<Route path="/login" element={<LoginPage></LoginPage>}/>
<Route path="/home" element={<HomePage></HomePage>}/>
   
      </Routes>
    </div>
  );
}

export default App;
