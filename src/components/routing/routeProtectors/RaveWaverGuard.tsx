import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

export const RaveWaverGuard = (props) => {
    if (sessionStorage.getItem("raveWaverToken")) {
        return props.children;
    }
    return <Redirect to="/landinghost" />;
};

RaveWaverGuard.propTypes = {
    children: PropTypes.node,
};
