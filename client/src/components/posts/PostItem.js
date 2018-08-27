import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {

    // if we have more similar functions, 
    // maybe we should refactor this.
    onDelete(id) {
        // delete post by id
        this.props.deletePost(id);
    }

    onLike(id) {
        this.props.addLike(id);
    }

    onUnlike(id) {
        this.props.removeLike(id);
    }

    findUserLike(likes) {
        const { auth } = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { post, auth } = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img 
                                className="rounded-circle d-none d-md-block" 
                                src={ post.avatar }
                                alt="" 
                            />
                        </a>
                        <br />
                        <p className="text-center">{ post.name }</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{ post.text }</p>
                        {/* how can I keep these at bottom? 1. absolute position 2. flex-grow on <p> */}
                        <div>
                            <button onClick={ this.onLike.bind(this, post._id) } ype="button" className="btn btn-light mr-1">
                                <i className={ classnames('fas fa-thumbs-up', { 'text-info': this.findUserLike(post.likes) }) }></i>
                                <span className="badge badge-light">{ post.likes.length }</span>
                            </button>
                            <button onClick={ this.onUnlike.bind(this, post._id) } type="button" className="btn btn-light mr-1">
                                <i className="text-secondary fas fa-thumbs-down"></i>
                            </button>
                            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                                Comments
                            </Link>
                            { post.user === auth.user.id && ( 
                                <button onClick={ this.onDelete.bind(this, post._id) } className="btn btn-danger mar-1">
                                    <i className="fas fa-times"></i>
                                </button> 
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

// why need to use connect? auth
export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem); 