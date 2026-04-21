import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Loader from "./components/common/Loader";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { ToastProvider } from "./context/ToastContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Doctors = lazy(() => import("./pages/Doctors"));
const DoctorDetail = lazy(() => import("./pages/DoctorDetail"));
const Appointment = lazy(() => import("./pages/Appointment"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const VerifyOTP = lazy(() => import("./pages/VerifyOTP"));
const VerifyResetOTP = lazy(() => import("./pages/VerifyResetOTP"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminAppointments = lazy(() => import("./pages/admin/AdminAppointments"));
const AdminDoctors = lazy(() => import("./pages/admin/AdminDoctors"));
const AdminPatients = lazy(() => import("./pages/admin/AdminPatients"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (adminOnly && user.role !== "ADMIN")
    return <Navigate to="/dashboard" replace />;
  return children;
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  if (user)
    return (
      <Navigate to={user.role === "ADMIN" ? "/admin" : "/dashboard"} replace />
    );
  return children;
}

// paddingTop uses CSS variable set in index.css
function WithNav({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--nav-h, 104px)", flex: 1 }}>
        {children}
      </main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <WithNav>
              <Home />
            </WithNav>
          }
        />
        <Route
          path="/services"
          element={
            <WithNav>
              <Services />
            </WithNav>
          }
        />
        <Route
          path="/services/:slug"
          element={
            <WithNav>
              <Services />
            </WithNav>
          }
        />
        <Route
          path="/doctors"
          element={
            <WithNav>
              <Doctors />
            </WithNav>
          }
        />
        <Route
          path="/doctors/specialists"
          element={
            <WithNav>
              <Doctors preFilter="specialists" />
            </WithNav>
          }
        />
        <Route
          path="/doctors/:id"
          element={
            <WithNav>
              <DoctorDetail />
            </WithNav>
          }
        />
        <Route
          path="/appointment"
          element={
            <WithNav>
              <Appointment />
            </WithNav>
          }
        />
        <Route
          path="/about"
          element={
            <WithNav>
              <About />
            </WithNav>
          }
        />
        <Route
          path="/blog"
          element={
            <WithNav>
              <Blog />
            </WithNav>
          }
        />
        <Route
          path="/blog/:category"
          element={
            <WithNav>
              <Blog />
            </WithNav>
          }
        />
        <Route
          path="/contact"
          element={
            <WithNav>
              <Contact />
            </WithNav>
          }
        />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <GuestRoute>
              <ResetPassword />
            </GuestRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <WithNav>
                <Dashboard />
              </WithNav>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute adminOnly>
              <AdminAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute adminOnly>
              <AdminDoctors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/patients"
          element={
            <ProtectedRoute adminOnly>
              <AdminPatients />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <WithNav>
              <NotFound />
            </WithNav>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppointmentProvider>
          <ToastProvider>
            <Suspense fallback={<Loader />}>
              <AppRoutes />
            </Suspense>
          </ToastProvider>
        </AppointmentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
