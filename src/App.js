import React, { Component } from "react";
import p2re from "path-to-regexp";
import "./App.css";
import store from "./store";
import Home from "./views/Home";
import Post from "./views/Post";
import NotFound from "./views/NotFound";

const routes = [
  { match: p2re("/"), name: "home" },
  { match: p2re("/home"), name: "home" },
  {
    match: p2re("/posts/:postId"),
    name: "post",
    map([, postId]) {
      return {
        postId
      };
    }
  }
];

function onRouteChange() {
  let match = null;

  routes.forEach(config => {
    const result = config.match.exec(window.location.pathname);
    if (result) {
      match = {
        type: "ROUTE_CHANGE",
        name: config.name,
        params: config.map ? config.map(result) : result
      };
    }
  });

  store.dispatch(match || { type: "ROUTE_CHANGE", name: "404" });
}

onRouteChange()
window.addEventListener("popstate", onRouteChange);
["pushState", "replaceState"].forEach(method =>
  window.history[method] = (goTo => {
    return (...args) => {
      goTo.call(window.history, ...args);
      onRouteChange();
    };
  })(window.history[method])
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      state: store.getState()
    };
  }

  componentDidMount() {
    store.subscribe(() => this.setState({ state: store.getState() }));
  }

  render() {
    const { state, state: { route } } = this.state;

    return (
      <div className="App">
        {{
          home: () => <Home state={state} dispatch={store.dispatch} />,
          post: () => <Post state={state} dispatch={store.dispatch} />,
          "404": () => <NotFound state={state} dispatch={store.dispatch} />
        }[route.name]()}
      </div>
    );
  }
}

export default App;
