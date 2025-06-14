import DashboardPage from "@/pages/dashboard/Dashboard";
import HomePage from "@/pages/home/Home";
import LoginPage from "@/pages/login/Login";
import ExcelAnalyticsPage from "@/pages/upload/ExcelAnalyticsPage ";
import { Routes, Route, Navigate } from "react-router";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/home" element={<HomePage />}>
        <Route index element={<DashboardPage />} />
        <Route path="upload" element={<ExcelAnalyticsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
