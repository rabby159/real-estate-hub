import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import MyInquiries from "./pages/MyInquiries";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route
            path="/properties"
            element={<Properties />}
          />

          <Route
            path="/properties/:id"
            element={<PropertyDetails />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route
            path="/compare"
            element={<Compare />}
          />

          <Route
            path="/inquiries"
            element={<MyInquiries />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;