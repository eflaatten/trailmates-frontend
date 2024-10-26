import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places"];

function App() {
  return (
    <Provider store={store}>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <BrowserRouter>
          <ToastContainer />
          <Router />
        </BrowserRouter>
      </LoadScript>
    </Provider>
  );
}

export default App;
