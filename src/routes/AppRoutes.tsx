import HomePage from "@/pages/home/Home";
import LoginPage from "@/pages/login/LoginPage";
import { Routes, Route, Navigate } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;
