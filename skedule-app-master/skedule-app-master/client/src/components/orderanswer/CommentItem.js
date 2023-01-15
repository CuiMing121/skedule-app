import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteComment} from '../../actions/orderActions';

class CommentItem extends Component {
  onDeleteClick(orderId, commentId) {
    this.props.deleteComment(orderId, commentId);
  }

  render() {
    const {comment, orderId, auth} = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <p className="text-center">{comment.name}</p>
            <p className="text-center">{comment.date}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user_id === auth.user.id ? (
                <button onClick={this.onDeleteClick.bind(this, orderId, comment._id)} type="button" className="btn btn-danger mr-1">
                  <i className="fa fa-times" />
                </button>
                ) : null
            }
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  orderId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);