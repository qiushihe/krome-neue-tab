import { render } from "react-dom";
import { Provider } from "react-redux";

import createStore from "/src/extension/store/create";
import App from "/src/extension/components/app";

const Root = () => (
  <Provider store={createStore()}>
    <App />
  </Provider>
);

render(<Root />, document.getElementById("root"));
