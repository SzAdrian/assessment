import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppContextProvider from "./components/Contexts/AppContext";
import FormModal from "./components/Modal/FormModal";
import UserList from "./components/UserList/UserList";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Route exact path="/new" component={FormModal} />
        <Route exact path="/edit/:uid" component={FormModal} />
        <Route path={["/", "/user-list"]} component={UserList} />
      </Router>
    </AppContextProvider>
  );
}

export default App;
