import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import ProductRulesPage from "./components/ProductRulesPage";
import{ Toaster } from 'react-hot-toast';


function App() {

  return (
    <div className="w-[100%] relative">
        <NavBar />
        <ProductRulesPage />
        <Toaster />
    </div>
  );  
}

export default App;