import "./App.css";
import "./styles/utilities/variables.css";
import { PageRoutes } from "./routes/PageRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      <ToastContainer autoClose={1500} />
      <PageRoutes />
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '320px', zIndex: 1000 }}>
        <ChatBot />
      </div>
    </div>
  );
}

export default App;