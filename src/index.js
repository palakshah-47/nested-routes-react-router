import React from "react";
import ReactDOM from "react-dom";
import { Tabs, Tab } from "@material-ui/core";

import {
  BrowserRouter as Router,
  Link,
  Route,
  useLocation,
} from "react-router-dom";

import "./styles.css";

const users = [
  {
    name: "Param",
    description:
      "Guy who writes lorem ipsum all the time when he needs content placeholder",
    path: "../user/param",
    tabs: [
      {
        name: "personal",
        path: "../user/param/personal",
        content: {
          firstname: "Param",
          lastname: "Harrison",
        },
      },
      {
        name: "employer",
        path: "../user/param/employer",
        content: {
          name: "Jobbatical",
          city: "Tallinn, Estonia",
        },
      },
    ],
  },
  {
    name: "Miguel",
    path: "../user/miguel",
    description:
      "the best guy doing deployment in his own clusters of kubernetes world",
    tabs: [
      {
        name: "personal",
        path: "../user/miguel/personal",
        content: {
          firstname: "Miguel",
          lastname: "Medina",
        },
      },
      {
        name: "employer",
        path: "../user/miguel/personal",
        content: {
          name: "Skype",
          city: "Arizona, US",
        },
      },
      {
        name: "other",
        path: "../user/miguel/personal",
        content: {
          country: "Mexico",
          age: 30,
        },
      },
    ],
  },
];

const TabPage = ({ match }) => {
  const {
    params: { userName, tabName },
  } = match;

  const tab = users
    .find(({ name }) => name === userName)
    .tabs.find(({ name }) => name === tabName);

  return (
    <div>
      Tab Name: <strong>{tab.name}</strong>
      <h6>Tab content: </h6>
      <ul>
        {Object.keys(tab.content).map((key, index) => {
          return (
            <li key={index}>
              <span>{key} : </span>
              <strong>{tab.content[key]}</strong>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const UserPage = ({ match }) => {
  const {
    params: { userName },
  } = match;
  const user = users.find(({ name }) => name === userName);

  return (
    <div>
      User Name: <strong>{user.name}</strong>
      <p>{user.description}</p>
      <p>Dyanmic nested route</p>
      <Tabs value={user.tabs[0].name}>
        {user.tabs.map((tab, index) => (
          <Tab
            key={index}
            value={tab.name}
            label={tab.name}
            component={Link}
            to={`${match.url}/tab/${tab.name}`}
          />
        ))}
      </Tabs>
      {/* <ul className="unlist">
        {user.tabs.map((tab, index) => {
          return (
            <li key={index}>
              <Link to={`${match.url}/tab/${tab.name}`}>{tab.name}</Link>
            </li>
          );
        })}
      </ul> */}
      <Route path={`${match.path}/tab/:tabName`} component={TabPage} />
    </div>
  );
};

function App() {
  const getIndexFromLocation = (location) => {
    const index = users.findIndex((item) => {
      if (item.path === location) return true;
    });
    // handle an unhandled path with a sane default.
    if (index < 0) return 0;
    return index;
  };

  return (
    <div className="App">
      <Router>
        <h3>Top level routes</h3>
        <Tabs
          value={getIndexFromLocation(location.pathname).toString()}
          // onChange={(e, val) => setUserVal(val)}
        >
          {users.map((user, index) => (
            <Tab
              key={index}
              value={user.name}
              label={user.name}
              component={Link}
              to={`/user/${user.name}`}
            />
          ))}
        </Tabs>
        {/* <ul className="unlist">
          {users.map((user, index) => {
            return (
              <li key={index}>
                <Link to={`/user/${user.name}`}>{user.name}</Link>
              </li>
            );
          })}
        </ul> */}
        <Route path="/user/:userName" component={UserPage} />
      </Router>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
