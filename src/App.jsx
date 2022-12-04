import React from "react";
import Header from "./components/Header/Header";
import Router from "./router/router";
import Main from "./containers/Main/Main";
import URLHandler from "./containers/URLHandler/URLHandler";
import { UserProvider } from "./UserContext";

class App extends React.PureComponent {

  render() {
    return (
      <>
        <UserProvider>
          <URLHandler>
            <Header />
            <Main>
              <Router />
            </Main>
          </URLHandler>
        </UserProvider>
      </>
    );
  }
}

export default App;
