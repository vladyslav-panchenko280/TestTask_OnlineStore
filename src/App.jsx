import React from "react";
import Header from "./components/Header/Header";
import Router from "./router/router";
import Main from "./containers/Main";
import { UserProvider } from "./UserContext";

class App extends React.Component {

  render() {
    return (
      <>
        <UserProvider>
          <Header />
          <Main>
            <Router />
          </Main>
        </UserProvider>
      </>
    )
  }
}

export default App
