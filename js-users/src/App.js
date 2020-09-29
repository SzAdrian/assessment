import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserList from "./components/UserList/UserList";

function App() {
  return (
    <Router>
      <Route exact path={["/", "/user-list"]} component={UserList} />
    </Router>
  );
}

export default App;
