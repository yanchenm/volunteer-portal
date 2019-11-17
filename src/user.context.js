/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext();

const userStates = {
  LOGGED_OUT: 'logged_out',
  VOLUNTEER_NOT_APPROVED: 'volunteer_not_approved',
  VOLUNTEER_APPROVED: 'volunteer_approved',
  STAFF: 'staff',
};

export class UserProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: userStates.LOGGED_OUT,
    };
  }

  signIn = user => {
    this.setState({
      user,
    });
  };

  signOut = () => {
    this.setState({
      user: userStates.LOGGED_OUT,
    });
  };

  useUserState = () => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
      throw new Error('useUserContext must be used within a userProvider');
    }
    return context;
  };

  render() {
    const { user } = this.state;
    const { children } = this.props;
    return (
      <UserContext.Provider
        value={{
          signIn: this.signIn,
          signOut: this.signOut,
          user,
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
