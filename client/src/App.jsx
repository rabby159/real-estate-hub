import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import MyInquiries from "./pages/MyInquiries";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProperties from "./pages/AdminProperties";
import AdminInquiries from "./pages/AdminInquiries";
import AdminAddProperty from "./pages/AdminAddProperty";
import AdminEditProperty from "./pages/AdminEditProperty";
import About from "./pages/AboutUs";

function App() {
  return (
    <BrowserRouter>
      <Routes>

  <Route element={<MainLayout />}>

    {/* Public */}
    <Route path="/" element={<Home />} />
    <Route path="/properties" element={<Properties />} />
    <Route
      path="/properties/:id"
      element={<PropertyDetails />}
    />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/about" element={<About />} />
    <Route
        path="/admin"
        element={<AdminDashboard />}
      />
      <Route
        path="/admin/properties"
        element={<AdminProperties />}
      />
      <Route
  path="/admin/inquiries"
  element={<AdminInquiries />}
/>
<Route
  path="/admin/properties/add"
  element={<AdminAddProperty />}
/>
<Route
  path="/admin/properties/edit/:id"
  element={<AdminEditProperty />}
/>

    {/* Customer */}
    <Route
      element={
        <ProtectedRoute
          allowedRoles={["customer"]}
        />
      }
    >
      <Route
        path="/favorites"
        element={<Favorites />}
      />

      <Route
        path="/compare"
        element={<Compare />}
      />

      <Route
        path="/my-inquiries"
        element={<MyInquiries />}
      />
    </Route>

  </Route>

</Routes>
    </BrowserRouter>
  );
}

export default App;