import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';

import { checkUserExists } from '../../civicrm/QueryUsers';
import { UserConsumer, userStates } from '../../user.context';
import ProfilePage from './ProfilePage';
import ApplicationProgress from './ApplicationProgress';

import 'antd/dist/antd.css';

const HomePage = ({ match }) => {
  return (
    <UserConsumer>
      {context => {
        const { id } = match.params;
        const { signIn, getAuthenticatedUser, authStatus, user, goHome } = context;

        if (user === null) {
          const authUserEmail = getAuthenticatedUser();

          if (authUserEmail === null) {
            return (
              <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Link to={goHome()}>Go Home.</Link>}
              />
            );
          }

          checkUserExists(authUserEmail).then(res => {
            const obj = Object.values(res.values)[0];
            signIn(obj);
          });
        }

        if (
          (id === user.id && authStatus === userStates.VOLUNTEER_APPROVED) ||
          user.type === 'Staff'
        ) {
          return <ProfilePage />;
        }

        if (id === user.id && authStatus === userStates.VOLUNTEER_NOT_APPROVED) {
          return <ApplicationProgress />;
        }

        return (
          <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Link to={context.goHome()}>Go Home.</Link>}
          />
        );
      }}
    </UserConsumer>
  );
};

export default HomePage;
