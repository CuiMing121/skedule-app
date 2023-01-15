import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner';
import {getOrders} from '../../actions/orderActions';
import TextFieldGroup from '../common/TextFieldGroup';
import OrderForm from './OrderForm';
import OrderFeed from './OrderFeed';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskdate : '',
      errors: {}
    };
    this.onChange= this.onChange.bind(this);    
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    
    this.props.getOrders(e.target.value);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }

  componentDidMount() {
      this.props.getOrders(new Date().toISOString().split( "T" )[0]);    
  }

  render() {
    const {errors} = this.state;
    const {orders, loading} = this.props.order;
    let orderContent;

    if(errors.noorders)
    {
      orderContent = <h4>{errors.noorders}</h4> 
    }
    else{
      if ( orders === null || loading) {
        orderContent = <Spinner />;
      } else {
        orderContent = <OrderFeed orders = {orders} />;
      }
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <div className="card-header bg-info text-white">Please select the Date...</div>
                <TextFieldGroup 
                  placeholder="TaskDate"
                  type="date"
                  name="taskdate"
                  value={ this.state.taskdate }
                  onChange={ this.onChange}
                />
                <br/>
                <OrderForm />
                <br/>
                {orderContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Orders.propTypes = {
  getOrders: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  order: state.order,
  errors: state.errors
});

export default connect(mapStateToProps, { getOrders })(Orders);