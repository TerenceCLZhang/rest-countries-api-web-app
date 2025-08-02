import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CountryCards from "./pages/CountryCards";
import CountryDetails from "./pages/CountryDetails";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <Routes>
        <Route path="/" element={<CountryCards />} />
        <Route path="/country/:country" element={<CountryDetails />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
