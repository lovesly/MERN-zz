import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onCheck() {
        // you don't have to use both of them. 
        this.setState(prevState => ({
            disabled: !prevState.disabled,
            current: !prevState.current,
        }));
    }

    // this one is not getting called after the success submit, 
    // so the errors are not cleared. 
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description,
        };
        this.props.addEducation(eduData, this.props.history);
    }
    
    render() {
        const { errors } = this.state;
        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">Go Back</Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">Add any school that you have had in the past or current</p>
                            <small className="d-block pb-3">* = required field</small>
                            <form onSubmit={ this.onSubmit }>
                                <TextFieldGroup 
                                    placeholder="* School"
                                    name="school"
                                    value={ this.state.school }
                                    onChange={ this.onChange }
                                    error={ errors.school }
                                    info="School you attend in"
                                />
                                <TextFieldGroup 
                                    placeholder="* Degree"
                                    name="degree"
                                    value={ this.state.degree }
                                    onChange={ this.onChange }
                                    error={ errors.degree }
                                    info="Degree level"
                                />
                                <TextFieldGroup 
                                    placeholder="* Field of Study"
                                    name="fieldofstudy"
                                    value={ this.state.fieldofstudy }
                                    onChange={ this.onChange }
                                    error={ errors.fieldofstudy }
                                    info="Field of study"
                                />
                                {/* Better have a date picker */}
                                <TextFieldGroup 
                                    placeholder="* From"
                                    name="from"
                                    type="date"
                                    value={ this.state.from }
                                    onChange={ this.onChange }
                                    error={ errors.from }
                                    info="From Date"
                                />
                                <TextFieldGroup 
                                    placeholder="to"
                                    name="to"
                                    type="date"
                                    value={ this.state.to }
                                    onChange={ this.onChange }
                                    error={ errors.to }
                                    info="To Date"
                                    disabled={ this.state.disabled }
                                />
                                <div className="form-check mb-4">
                                    <input 
                                        type="checkbox"
                                        className="form-check-input"
                                        name="current"
                                        value={ this.state.current }
                                        checked={ this.state.current }
                                        onChange={ this.onCheck }
                                        id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">Current School?</label>
                                </div>

                                <TextAreaFieldGroup 
                                    placeholder="Description"
                                    name="description"
                                    value={ this.state.description }
                                    onChange={ this.onChange }
                                    error={ errors.description }
                                    info="Tell us about your program/study"
                                />
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
});

export default connect(mapStateToProps, { addEducation })(AddEducation);