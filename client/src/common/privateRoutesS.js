import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadStudent } from '../actions/studentAuth';

import store from '../store';

const PrivateRouteS = ({component: Component, ...rest}) => {

  const {isAuthenticated} = rest;

  return (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/auth/student/loginpre',
          state: {from: props.location}
        }}/>
      )
    )}
    />
  );
};

// privateRouteS.propTypes = {
//   isAuthenticated: PropTypes.bool.isRequired,
// };

function mapStateToProps(state) {
  return {
    isAuthenticated: state.studentAuth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(PrivateRouteS);