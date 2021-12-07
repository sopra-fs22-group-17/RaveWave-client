import styled from "styled-components";
import {Redirect, Route} from "react-router-dom";
import Game from "../../game/Game";
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameRouter = props => {
  /**
   * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
   */
  return (
    <Container>
      <Route exact path={`${props.base}/dashboard`}>
        <Game/>
      </Route>
      <Route exact path={`${props.base}`}>
        <Redirect to={`${props.base}/dashboard`}/>
      </Route>
    </Container>
  );
};
/*
* Don't forget to export your component!
 */

GameRouter.propTypes = {
  base: PropTypes.string
}

export default GameRouter;
