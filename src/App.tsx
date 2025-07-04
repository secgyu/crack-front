import { Route, Routes } from "react-router";
import "./App.css";
import { LoginForm } from "./pages/login-form";
import { SignupForm } from "./pages/signup-form";
import { MainDashboard } from "./pages/main-dashboard";
import { DetailView } from "./pages/detail-view";
import { RegisterForm } from "./pages/register-form";
import Main from "./pages/main";
import PrivateRoute from "./components/PrivateRoute";
import { MapView } from "./pages/map-detail-view";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <MainDashboard />
          </PrivateRoute>
        }
      />
      <Route path="/detail/:deviceId" element={<DetailView />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/map/:deviceId" element={<MapView />} />
    </Routes>
  );
}

export default App;
