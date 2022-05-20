import {Redirect} from "react-router-dom";
import PropTypes from "prop-types";

/**
 *
 * Another way to export directly your functional component.
 */
export const LoginGuard = props => {
  const wait = new Promise(10);
  if (sessionStorage.getItem("token")) {
    return props.children;
  }
  // if user is already logged in, redirects to the main /app
  return <Redirect to="/selectgamemode"/>;
};

LoginGuard.propTypes = {
  children: PropTypes.node
}