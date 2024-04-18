import { Character } from "./components/Character";
import { Guild } from "./components/Guild";
import { Header } from "./components/Header";
import { LandingPage } from "./components/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/character" element={<Character />} />
          <Route path="/guild" element={<Guild />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
