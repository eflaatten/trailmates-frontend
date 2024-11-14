import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import Footer from "./footer";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <Router />
        {/* <Footer /> */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
