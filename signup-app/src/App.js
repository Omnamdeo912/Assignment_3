// src/App.js
import React, { useState } from 'react';
import Signup from './components/Signup';
import Login from './components/Login';
import AddFaq from './components/AddFaq';
import UserDashboard from './components/UserDashboard';

function App() {
  const [route, setRoute] = useState("/signup");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Signup Page</h1>
      </header>
      <main>
        {route === "/signup" && <Signup setRoute={setRoute} />}
        {route === "/login" && <Login setRoute={setRoute} />}
        {route === "/addfaq" && <AddFaq setRoute={setRoute} />}
        {route === "/userdashboard" && <UserDashboard setRoute={setRoute} />}
      </main>
    </div>
  );
}

export default App;
