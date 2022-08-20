import React from "react";
import Header from "./components/Header/Header";
import Router from "./router/router";


class App extends React.Component {

  render() {
    return (
      <>
        <Header />
        <main className="main">
          <Router />
        </main>
      </>
    )
  }
}

export default App
