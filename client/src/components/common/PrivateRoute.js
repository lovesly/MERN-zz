import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    auth, 
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props) => {
        return (
            auth.isAuthenticated ? (
                <div>
                    <Component {...props} />
                </div>
            ) : (
                <Redirect to="/" />
            )
        )
    }}/>
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);