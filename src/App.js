import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store";

import Footer from "./footer";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <ToastContainer /> */}
        <Toaster />
        <Router />
        {/* <Footer /> */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
