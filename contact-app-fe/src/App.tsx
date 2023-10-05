import React from "react";
import { Route, Routes } from "react-router-dom";
import ContactPage from "./pages/ContactPage";

const styles = {
  backgroundColor: "#000000",
  minHeight: "100vh",
};

function App() {
  return (
    <div className="App" style={styles}>
      <Routes>
        <Route path="*" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
