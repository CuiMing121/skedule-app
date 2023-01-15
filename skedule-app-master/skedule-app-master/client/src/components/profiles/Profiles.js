import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profileActions';

class Profiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
      this.setState({errors: nextProps.errors});
    }
  }
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const {errors} = this.state;
    const { profiles, loading } = this.props.profile;
    
    let profileItems;
    if(errors.roll)
    {
      profileItems = <h4>{errors.roll}</h4> 
    }
    else{
      if (profiles === null || loading) {
        profileItems= <Spinner />;
      } 
      else {
        if (profiles.length > 0) {
          profileItems = profiles.map(profile => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
          
        } else {
          profileItems = <h4>No profiles found...</h4>
        }
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Member Profiles</h1>
              { profileItems }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { getProfiles })(Profiles);