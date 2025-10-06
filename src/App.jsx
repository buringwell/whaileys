import "./App.css";
import "./assets/stylebaru.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Beranda from "./pages/beranda/Beranda";
import Profil from "./pages/Profil";
import Navbar from "./components/Navbar";
import Detail from "./pages/Detail";
import Error from "./pages/Error";
import Negara from "./pages/Negara/Negara";
import NegaraDetail from "./pages/Negara/NegaraDetail";
import ThemeContext from "./context/ThemeContext";
import { useState } from "react";

function App() {

  const theme = useState("light")

  return ( 
    <div className="w-full">
    <BrowserRouter>
  <ThemeContext.Provider value={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Error />} />
        <Route path="/negara" element={<Negara/>}/>
        <Route path="/negaradetail/:id" element={<NegaraDetail/>}/>
      </Routes>
      </ThemeContext.Provider>
    </BrowserRouter>
   </div>
  );
}

export default App;
