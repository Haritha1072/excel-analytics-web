import "./App.css";
import LoginPage from "./pages/login/login";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="size-full h-svh">
      <LoginPage />
      <Toaster toastOptions={{ className: "px-6 text-xs" }} />
    </div>
  );
}

export default App;
