import { BrowserRouter } from "react-router-dom";
import Routers from "./components/Routers/Routers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  
  return (
    <>
     <BrowserRouter>
        <Routers />
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}

export default App;
