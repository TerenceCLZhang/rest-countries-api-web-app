import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CountryCards from "./pages/CountryCards";
import CountryDetails from "./pages/CountryDetails";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";

export const API_TIMEOUT = 10000; // 10 seconds

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="px-4 py-8 md:px-10 2xl:px-50 lg:m-auto w-full flex-1">
        <Routes>
          <Route path="/" element={<CountryCards />} />
          <Route path="/country/:country" element={<CountryDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
