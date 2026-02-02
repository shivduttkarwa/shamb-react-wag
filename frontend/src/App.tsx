import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./components/Layout";
import HomePage from "./pages/HomePage";
import HouseDesignsRoute from "./pages/HouseDesignsRoute";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ServicePage from "./pages/ServicePage";
import Contact from "./pages/Contact";
import NewContact from "./pages/NewContact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import BlogListPage from "./pages/BlogListPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import { useSiteSettings } from "./hooks/useSiteSettings";
import ScrollToTop from "./components/UI/ScrollToTop";
import Preloader from "./components/UI/Preloader";

function App() {
  const { settings } = useSiteSettings();

  return (
    <>
      <Preloader />
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <div className="App">
          <Header settings={settings} />
          <main>
            <Routes>
              <Route path="/" element={<HomePage settings={settings} />} />
              <Route path="/house-designs" element={<HouseDesignsRoute />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/services" element={<ServicePage />} />
              <Route
                path="/projects/:projectId"
                element={<ProjectDetailPage />}
              />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogDetailPage />} />
              <Route path="/contact" element={<NewContact />} />
              <Route path="/new-contact" element={<NewContact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            </Routes>
          </main>
          <Footer settings={settings} />
        </div>
      </Router>
    </>
  );
}

export default App;
