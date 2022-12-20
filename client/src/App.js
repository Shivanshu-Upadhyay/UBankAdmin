import { BrowserRouter } from "react-router-dom";
import { lazy } from 'react';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const Routers =  lazy(() => import("./components/Routers/Routers"));
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
