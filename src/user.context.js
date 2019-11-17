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
      user: {},
      navPage: '',
    };
  }

  signIn = user => {
    const { type } = user;
    let authStatus = '';

    if (type === 'Volunteer') {
      const { appComplete, approved } = user;
      if (appComplete && approved) {
        authStatus = userStates.VOLUNTEER_APPROVED;
      } else if (appComplete) {
        authStatus = userStates.VOLUNTEER_NOT_APPROVED;
      } else {
        authStatus = userStates.VOLUNTEER_IN_PROGRESS;
      }
    } else {
      authStatus = userStates.STAFF;
    }

    this.setState({
      user,
      authStatus,
    });
  };

  signOut = () => {
    this.setState({
      authStatus: userStates.LOGGED_OUT,
      user: {},
    });
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
