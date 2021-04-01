import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadAdmin } from '../actions/adminAuth';


const PrivateRoute = ({component: Component, ...rest}) => {


  const {isAuthenticated} = rest;

  return (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/auth/admin/login',
          state: {from: props.location}
        }}/>
      )
    )}
    />
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.adminAuth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(PrivateRoute);