import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
// import isEmpty from '../../validation/isEmpty';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            youtube: '',
            facebook: '',
            linkedin: '',
            instagram: '',
            errors: {},
            
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile;
            const skillsCSV = profile.skills.join(',');

            profile.company = profile.company || '';
            profile.website = profile.website || '';
            profile.location = profile.location || '';
            profile.githubusername = profile.githubusername || '';

            profile.social = profile.company || {};
            profile.youtube = (profile.social && profile.social.youtube) || '';
            profile.facebook = (profile.social && profile.social.facebook) || '';
            profile.linkedin = (profile.social && profile.social.linkedin) || '';
            profile.instagram = (profile.social && profile.social.instagram) || '';

            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                youtube: profile.youtube,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                instagram: profile.instagram,
            });
        }
    }
    

    onSubmit(e) {
        e.preventDefault();
        const newProfile = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            youtube: this.state.youtube,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            instagram: this.state.instagram,
        };
        this.props.createProfile(newProfile, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, displaySocialInputs } = this.state;
        let socialInputs;
        if (displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        placeholder="Youtube URL"
                        name="youtube"
                        icon="fab fa-youtube"
                        value={ this.state.youtube }
                        onChange={ this.onChange }
                        error={ errors.youtube }
                    />
                    <InputGroup
                        placeholder="Facebook URL"
                        name="facebook"
                        icon="fab fa-facebook"
                        value={ this.state.facebook }
                        onChange={ this.onChange }
                        error={ errors.facebook }
                    />
                    <InputGroup
                        placeholder="LinkedIn URL"
                        name="linkedin"
                        icon="fab fa-linkedin"
                        value={ this.state.linkedin }
                        onChange={ this.onChange }
                        error={ errors.linkedin }
                    />
                    <InputGroup
                        placeholder="Instagram URL"
                        name="instagram"
                        icon="fab fa-instagram"
                        value={ this.state.instagram }
                        onChange={ this.onChange }
                        error={ errors.instagram }
                    />
                </div>
            );
        }
        const options = [
            { label: '* Select Professional Status', value: 0 },
            { label: 'Developer', value: 'Developer' },
            { label: 'Junior Developer', value: 'Junior Developer' },
            { label: 'Senior Developer', value: 'Senior Developer' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Student or Learning', value: 'Student or Learning' },
            { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
            { label: 'Intern', value: 'Intern' },
            { label: 'Other', value: 'Other' },
        ];

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="dispaly-4 text-center">Edit Profile</h1>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={ this.onSubmit }>
                                <TextFieldGroup 
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={ this.state.handle }
                                    onChange={ this.onChange }
                                    error={ errors.handle }
                                    info="A unique handle for your profile URL. Your full name, company name,
                                    nickname"
                                />
                                <SelectListGroup 
                                    placeholder="Status"
                                    name="status"
                                    value={ this.state.status }
                                    onChange={ this.onChange }
                                    error={ errors.status }
                                    options={ options }
                                    info="Give us an idea of where you are at in your career"
                                />
                                <TextFieldGroup 
                                    placeholder="Company"
                                    name="company"
                                    value={ this.state.company }
                                    onChange={ this.onChange }
                                    error={ errors.company }
                                    info="Company you work for"
                                />
                                <TextFieldGroup 
                                    placeholder="Website"
                                    name="website"
                                    value={ this.state.website }
                                    onChange={ this.onChange }
                                    error={ errors.website }
                                    info="Person website"
                                />
                                <TextFieldGroup 
                                    placeholder="Location"
                                    name="location"
                                    value={ this.state.location }
                                    onChange={ this.onChange }
                                    error={ errors.location }
                                    info="City and/or State"
                                />
                                <TextFieldGroup 
                                    placeholder="* Skills"
                                    name="skills"
                                    value={ this.state.skills }
                                    onChange={ this.onChange }
                                    error={ errors.skills }
                                    info="Please use comma separated values(eg. HTML, CSS, JavaScript)"
                                />
                                <TextFieldGroup 
                                    placeholder="Github Username"
                                    name="githubusername"
                                    value={ this.state.githubusername }
                                    onChange={ this.onChange }
                                    error={ errors.githubusername }
                                    info="If you want your latest repos and a Github link, include your username"
                                />
                                <TextAreaFieldGroup 
                                    placeholder="Short Bio"
                                    name="bio"
                                    value={ this.state.bio }
                                    onChange={ this.onChange }
                                    error={ errors.bio }
                                    info="Tell us a little about yourself"
                                />
                                <div className="mb-3">
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }));
                                        }} 
                                        className="btn btn-light">
                                        Add Social Network Links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                { socialInputs }
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors,
}); 

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfile);