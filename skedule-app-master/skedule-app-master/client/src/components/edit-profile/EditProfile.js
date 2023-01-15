import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
 import TextFieldGroup from '../common/TextFieldGroup';
 import classnames from 'classnames';

import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : '',
      job : '',
      isChecked : false,
      password : '',
      password2 : '',
      sex: '',
      birthday: '',
      homeplace:'',
      phone_number:'',
      home_number :'',
      jobdate:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
    if(this.state.isChecked == false)
    {
      this.setState({
        password : '',
        password2 : ''
      });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount(){
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      profile.password = '';
      profile.password2 = '';
      profile.phone_number = !isEmpty(profile.phone_number) 
        ? profile.phone_number 
        : '';
      profile.home_number = !isEmpty(profile.home_number) 
        ? profile.home_number 
        : '';
      profile.jobdate = !isEmpty(profile.jobdate) 
        ? profile.jobdate
        : '';

        //Set component fields state
        this.setState({
            name: profile.name,
            job: profile.job,
            password: profile.password,
            password2: profile.password,
            sex: profile.sex,
            birthday: profile.birthday,
            homeplace: profile.homeplace,
            phone_number: profile.phone_number,
            home_number: profile.home_number,
            jobdate: profile.jobdate
        });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      name: this.state.name,
      job: this.state.job,
      isChecked: this.state.isChecked,
      password: this.state.password,
      password2: this.state.password2,
      sex: this.state.sex,
      birthday: this.state.birthday,
      homeplace: this.state.homeplace,
      phone_number: this.state.phone_number,
      home_number: this.state.home_number,
      jobdate: this.state.jobdate
    };

    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const {errors} = this.state;
    return(
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">{this.state.name}_profile update</h1>
              <form noValidate onSubmit = {this.onSubmit}>    
                
                {/* <div className= {classnames('form-group',{'is-invalid': errors.job})}>
                  <label>Job :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                  <input type="radio" name="job" checked={this.state.job === "manager"}
                    value= "manager" 
                    onChange={this.onChange} style={{marginRight: 0.3 + 'em'}}/> Manager &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;              
                  <input type="radio" name="job" checked={this.state.job === "researcher"}
                    value= "researcher" 
                    onChange={this.onChange} style={{marginRight: 0.3 + 'em'}} /> Researcher &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type="radio" name="job" checked={this.state.job === "extra"} 
                    value= "extra"  
                    onChange={this.onChange} style={{marginRight: 0.3 + 'em'}} /> Extra &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                {errors.job && 
                  (<div className = "invalid-feedback">{errors.job}</div>
                )} */}

                <br/>
                <div>
                    <input type="checkbox" defaultChecked={this.state.isChecked} style={{marginRight: 0.3 + 'em'}} onChange={this.toggleChange}/> To change Password, Click Here...
                </div>
                {this.state.isChecked &&(
                  <TextFieldGroup 
                    placeholder="New Password"
                    name="password"
                    type = "password"
                    value={ this.state.password}
                    onChange={ this.onChange }
                    error={ errors.password }
                  />
                )}
                {this.state.isChecked &&(
                  <TextFieldGroup 
                    placeholder="Confirm Password"
                    name="password2"
                    type = "password"
                    value={ this.state.password2}
                    onChange={ this.onChange }
                    error={ errors.password2 }
                  />
                )}
                <br/><br/>

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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));