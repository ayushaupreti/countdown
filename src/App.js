import React, { useState } from "react";
import './App.css';
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";

function App() {

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <div className="app">
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
