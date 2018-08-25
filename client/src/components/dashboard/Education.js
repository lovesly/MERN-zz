
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

    onDelete(id) {
        console.log();
        this.props.deleteEducation(id);
    }

    render() {
        const education = this.props.education.map(el => (
            <tr key={ el._id }>
                <td>{ el.school }</td>
                <td>{ el.degree }</td>
                <td>
                    <Moment format="YYYY/MM/DD">{ el.from }</Moment>
                    { " - " }
                    { el.to ?  <Moment format="YYYY/MM/DD">{ el.to }</Moment> : 'Now' }
                    
                </td>
                <td><button onClick={ this.onDelete.bind(this, el._id) } className="btn btn-danger">Delete</button></td>
            </tr>
        ));
        return (
            <div className="mb-4">
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                        { education }
                    </thead>
                </table>
            </div>
        );
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);