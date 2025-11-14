import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import News from "./pages/News.jsx";
import LiveCameras from "./pages/LiveCameras.jsx";
import Photos from "./pages/Photos.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/News" element={<News />} />
        <Route path="/LiveCameras" element={<LiveCameras />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}
