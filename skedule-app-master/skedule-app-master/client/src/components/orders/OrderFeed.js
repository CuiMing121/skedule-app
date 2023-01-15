import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';

class OrderFeed extends Component {
  render() {
    const {orders} = this.props;

    return orders.map(order => <OrderItem key={order._id} order={order} />);
  }
}

OrderFeed.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrderFeed;