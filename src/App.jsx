import React from "react";
import Header from "./components/Header/Header";
import Router from "./router/router";
import { UserProvider } from "./UserContext";

class App extends React.Component {

  render() {
    return (
      <>
        <UserProvider>
          <Header />
          <main className="main">
            <Router />
          </main>
        </UserProvider>
      </>
    )
  }
}

export default App
