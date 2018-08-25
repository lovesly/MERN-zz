import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {

    onDelete(id) {
        console.log();
        this.props.deleteExperience(id);
    }

    render() {
        const experience = this.props.experience.map(el => (
            <tr key={ el._id }>
                <td>{ el.company }</td>
                <td>{ el.title }</td>
                <td>
                    <Moment format="YYYY/MM/DD">{ el.from }</Moment>
                    { " - " }
                    { el.to ?  <Moment format="YYYY/MM/DD">{ el.to }</Moment> : 'Now' }
                    
                </td>
                <td><button onClick={ this.onDelete.bind(this, el._id) } className="btn btn-danger">Delete</button></td>
            </tr>
        ));
        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                        { experience }
                    </thead>
                </table>
            </div>
        );
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, { deleteExperience })(Experience);