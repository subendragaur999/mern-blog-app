import { ToastContainer } from "react-toastify";
import Layout from "./Layout/Layout";

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Layout />
    </>
  );
}

export default App;
