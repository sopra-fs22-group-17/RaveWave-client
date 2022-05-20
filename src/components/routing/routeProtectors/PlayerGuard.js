import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated (i.e., a token is stored in the local storage)
 * {props.children} are rendered --> The content inside the <PlayerGuard> in the App.js file, i.e. the user is able to access the main app.
 * If the user isn't authenticated, the components redirects to the /login screen
 * @Guard
 * @param props
 */
export const PlayerGuard = (props) => {
    if (sessionStorage.getItem("token")) {
        return props.children;
    }
    return <Redirect to="/landingplayer" />;
};

PlayerGuard.propTypes = {
    children: PropTypes.node,
};
