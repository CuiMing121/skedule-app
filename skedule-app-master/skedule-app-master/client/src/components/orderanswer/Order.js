import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import OrderItem from '../orders/OrderItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import {getOrder} from '../../actions/orderActions';

class OrderAnswer extends Component {
  componentDidMount() {
    this.props.getOrder(this.props.match.params.id);
  }

  render() {
    const {order, loading} = this.props.order;
    let orderContent;

    if (order === null || loading || Object.keys(order).length === 0) {
      orderContent = <Spinner />;
    } else {
      orderContent = (
        <div>
          <OrderItem order={order} showActions={false} />
          <CommentForm orderId={order._id} />
          <CommentFeed orderId={order._id} comments={order.comments} />
        </div>
      );
    }

    return (
      <div className="order">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/order" className="btn btn-light mb-3">
                Back To Orders
              </Link>
              {orderContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OrderAnswer.propTypes = {
  getOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  order: state.order
});

export default connect(mapStateToProps, {getOrder})(OrderAnswer);
