import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import classnames from 'classnames';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      name : '',
      job : '',
      password : '',
      password2 : '',
      sex: '',
      birthday: '',
      homeplace:'',
      phone_number:'',
      home_number :'',
      jobdate:'',
      errors : {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/order');
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }
  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e){
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      job: this.state.job,
      password: this.state.password,
      password2: this.state.password2,
      sex: this.state.sex,
      birthday: this.state.birthday,
      homeplace: this.state.homeplace,
      phone_number: this.state.phone_number,
      home_number: this.state.home_number,
      jobdate: this.state.jobdate
    }

    this.props.registerUser(newUser,this.props.history);    
  }

  render(){
    const {errors} = this.state;
    return(
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <form noValidate onSubmit = {this.onSubmit}>
                <TextFieldGroup 
                  placeholder="Name"
                  name="name"
                  value={ this.state.name}
                  onChange={ this.onChange }
                  error={ errors.name }
                />      

                <div className= {classnames('form-group',{'is-invalid': errors.job})}>
                  <label>Job :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                  <input type="radio" name="job" checked={this.state.job === "manager"}
                    value= "manager" 
                    onChange={this.onChange} style={{marginRight: 0.3 + 'em'}}/> Manager &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;              
                  <input type="radio" name="job" checked={this.state.job === "researcher"}
                    value= "researcher" 
                    onChange={this.onChange} style={{marginRight: 0.3 + 'em'}} /> Researcher &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="radio" name="job" checked={this.state.job === "extra"} 
                    value= "extra"  
                    onChange={this.onChange} style={{marginRight: 0.3 + 'em'}} /> Extra
                </div>
                {errors.job && 
                  (<div className = "invalid-feedback">{errors.job}</div>
                )}

                <TextFieldGroup 
                  placeholder="Password"
                  name="password"
                  type = "password"
                  value={ this.state.password}
                  onChange={ this.onChange }
                  error={ errors.password }
                />
                <TextFieldGroup 
                  placeholder="Confirm Password"
                  name="password2"
                  type = "password"
                  value={ this.state.password2}
                  onChange={ this.onChange }
                  error={ errors.password2 }
                />

                <div className={classnames('form-group',{'is-invalid': errors.sex})}>
                  <label>Sex :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                  <input type="radio" name="sex" 
                      value="male" checked={this.state.sex === "male"} 
                      onChange={this.onChange} style={{marginRight: 0.3 + 'em'}}/>Male &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="radio" name="address" 
                      value="female" checked={this.state.address === "female"} 
                      onChange={this.onChange} style={{marginRight: 0.3 + 'em'}} />Female &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                {errors.sex && 
                  (<div className = "invalid-feedback">{errors.sex}</div>
                )}

                <label>Birthday :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <TextFieldGroup 
                  placeholder="Birthday"
                  type="date"
                  name="birthday"
                  value={ this.state.birthday }
                  onChange={ this.onChange }
                  error={ errors.birthday }
                />
                
                <TextFieldGroup 
                  placeholder="HomePlace"
                  name="homeplace"
                  value={ this.state.homeplace}
                  onChange={ this.onChange }
                  error={ errors.homeplace }
                />

                <TextFieldGroup 
                  placeholder="Phone Number"
                  name="phone_number"
                  value={ this.state.phone_number}
                  onChange={ this.onChange }
                />

                <TextFieldGroup 
                  placeholder="Home Number"
                  name="home_number"
                  value={ this.state.home_number}
                  onChange={ this.onChange }
                
                />
                
                <label>JobDate :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <TextFieldGroup 
                  placeholder="JobDate"
                  type="date"
                  name="jobdate"
                  value={ this.state.jobdate }
                  onChange={ this.onChange }
                />

                <input 
                  type="submit" 
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
