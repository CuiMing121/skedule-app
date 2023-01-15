import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
  render() {
    const {comments, orderId} = this.props;

    return comments.map(comment => (
      <CommentItem key={comment._id} comment={comment} orderId={orderId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  orderId: PropTypes.string.isRequired
};

export default CommentFeed;