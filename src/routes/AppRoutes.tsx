// src/routes/AppRoutes.tsx
import HomePage from "@/pages/home/Home";
import LoginPage from "@/pages/login/LoginPage";
import { Routes, Route } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
