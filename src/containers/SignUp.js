import { connect } from "react-redux";

import Login from "../components/SignUp";
import { showPassword, hidePassword } from "../redux/actions";

const mapStateToProps = (state) => {
  return {
    showPassword: state.showPassword,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showPassword: (state) => dispatch(showPassword(state)),
    hidePassword: (state) => dispatch(hidePassword(state)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
