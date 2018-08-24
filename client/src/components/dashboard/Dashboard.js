import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner'; 
import ProfileActions from './ProfileActions';

class Dashboard extends Component {
    
    // intellisense sucks, extends React.Component works
    // nothing show up if 
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    onDelete(e) {
        // also logout user
        this.props.deleteAccount();
    }

    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />;
        } else {
            dashboardContent = <h1>Hello</h1>;
            // check if logged in user has profile data
            if (Object.keys(profile).length > 0) {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome <Link to={`/profile/${profile.handle}`}>{ user.name }</Link>
                        </p>
                        <ProfileActions />
                        <div style={{ marginBottom: '60px' }}>
                            <button className="btn btn-danger" onClick={ this.onDelete.bind(this) }>
                                Delete My Account
                            </button>
                        </div>
                    </div>
                );
            } else {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome { user.name }</p>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to='/create-profile' className="btn btn-lg btn-info">Create Profile</Link>
                    </div>
                );
            }
        }   

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            { dashboardContent }
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
});




export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);