import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppContextProvider from "./components/Contexts/AppContext";
import NewUser from "./components/NewUser/NewUser";
import UserList from "./components/UserList/UserList";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Route exact path="/new" component={NewUser} />
        <Route exact path="/edit/:uid" component={NewUser} />
        <Route path={["/", "/user-list"]} component={UserList} />
      </Router>
    </AppContextProvider>
  );
}

export default App;
