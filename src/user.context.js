/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext();

export const userStates = {
  LOGGED_OUT: 'logged_out',
  VOLUNTEER_NOT_APPROVED: 'volunteer_not_approved',
  VOLUNTEER_APPROVED: 'volunteer_approved',
  VOLUNTEER_IN_PROGRESS: 'volunteer_in_progress',
  STAFF: 'staff',
};

export class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authStatus: userStates.LOGGED_OUT,
      user: null,
      navPage: '',
    };
  }

  signIn = user => {
    const tempState = {};

    const fieldMap = {
      contact_id: 'id',
      email: 'email',
      first_name: 'firstName',
      last_name: 'lastName',
      gender: 'gender',
      custom_14: 'age',
      custom_18: 'areasOfInterest',
      custom_19: 'qualifications',
      custom_23: 'vulnerableCheck',
      custom_36: 'approved',
      custom_37: 'submitted',
      custom_38: 'policeCheck',
      custom_45: 'interviewed',
      contact_sub_type: 'type',
    };

    const boolFields = ['custom_23', 'custom_36', 'custom_37', 'custom_38', 'custom_45'];

    Object.keys(user).forEach(field => {
      if (field === 'contact_sub_type') {
        tempState.type = user[field][0];
      } else if (field in fieldMap) {
        if (boolFields.includes(field)) {
          if (user[field] === 'true') {
            tempState[fieldMap[field]] = true;
          } else {
            tempState[fieldMap[field]] = false;
          }
        } else {
          tempState[fieldMap[field]] = user[field];
        }
      }
    });

    const { type } = tempState;
    let authStatus = '';

    if (type === 'Volunteer') {
      const { submitted, approved } = tempState;
      if (submitted && approved) {
        authStatus = userStates.VOLUNTEER_APPROVED;
      } else if (submitted) {
        authStatus = userStates.VOLUNTEER_NOT_APPROVED;
      } else {
        authStatus = userStates.VOLUNTEER_IN_PROGRESS;
      }
    } else {
      authStatus = userStates.STAFF;
    }

    sessionStorage.setItem('autism-ontario-user', tempState.email);

    this.setState({
      user: tempState,
      authStatus,
    });
  };

  signOut = () => {
    sessionStorage.removeItem('autism-ontario-user');
    this.setState({
      authStatus: userStates.LOGGED_OUT,
      user: null,
    });
  };

  // Janky authentication persistence
  getAuthenticatedUser = () => {
    return sessionStorage.getItem('autism-ontario-user');
  };

  navigate = page => {
    this.setState({
      navPage: page,
    });
  };

  goHome = () => {
    const { authStatus, user, navPage } = this.state;

    if (navPage !== 'home') {
      this.navigate('home');
    }

    switch (authStatus) {
      case userStates.STAFF:
        return '/staff';
      case userStates.VOLUNTEER_IN_PROGRESS:
        return '/apply';
      case userStates.VOLUNTEER_NOT_APPROVED:
      case userStates.VOLUNTEER_APPROVED:
        return `/profile/${user.id}`;
      default:
        return '/login';
    }
  };

  useUserState = () => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUserContext must be used within a userProvider');
    }
    return context;
  };

  render() {
    const { user, authStatus, navPage } = this.state;
    const { children } = this.props;
    return (
      <UserContext.Provider
        value={{
          signIn: this.signIn,
          signOut: this.signOut,
          getAuthenticatedUser: this.getAuthenticatedUser,
          navigate: this.navigate,
          goHome: this.goHome,
          user,
          authStatus,
          navPage,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

UserProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export const UserConsumer = UserContext.Consumer;
