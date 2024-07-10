import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import ProductRulesPage from "./components/ProductRulesPage";




function App() {
  return (
    <div className="w-[100%] relative">
        <NavBar />
        <ProductRulesPage />
    </div>
  );  
}

export default App;