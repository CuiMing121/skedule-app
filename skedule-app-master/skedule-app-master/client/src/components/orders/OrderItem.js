import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {deleteOrder} from '../../actions/orderActions';

class OrderItem extends Component {
  onDeleteClick(id) {
    this.props.deleteOrder(id);
  }

  render() {
    const {order, auth, showActions} = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-10">
            <label>{order.orderdate}</label>
            <label>{auth.user.name}</label>
            <p className="lead">{order.text}</p>
            {showActions ? (<span>
              <Link to={`/orderanswer/${order._id}`} className="btn btn-info mr-1">
                Comments
              </Link>
               {'manager' === auth.user.job ? (
                <button onClick={this.onDeleteClick.bind(this, order._id)} type="button" className="btn btn-danger mr-1">
                  <i className="fa fa-times" />
                </button>
                ) : null
              }</span>) : null 
            }
          </div>
        </div>
      </div>
    )
  }
}

OrderItem.defaultProps = {
  showActions: true
}

OrderItem.propTypes = {
  deleteOrder: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {deleteOrder})(OrderItem);