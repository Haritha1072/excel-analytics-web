// src/App.tsx
import "./App.css";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div className="size-full h-svh">
        <AppRoutes />
        <Toaster toastOptions={{ className: "px-6 text-xs" }} />
      </div>
    </BrowserRouter>
  );
}

export default App;
