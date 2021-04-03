import { BrowserRouter } from "react-router-dom";

import Routes from "routes";

import "./App.scss";

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Routes />
    </div>
  </BrowserRouter>
);

export default App;
