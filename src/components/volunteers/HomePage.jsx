import React from 'react';
import { Result, Button } from 'antd';

import { UserConsumer, userStates } from '../../user.context';
import ProfilePage from './ProfilePage';
import ApplicationProgress from './ApplicationProgress';

import 'antd/dist/antd.css';

const HomePage = ({ history, match }) => {
  return (
    <UserConsumer>
      {context => {
        const { id } = match.params;
        const { authStatus, user } = context;

        if (user === null) {
          return (
            <Result
              status="403"
              title="403"
              subTitle="Sorry, you are not authorized to access this page."
              extra={
                <Button
                  type="primary"
                  onClick={() => {
                    history.push(context.goHome());
                  }}
                >
                  Back Home
                </Button>
              }
            />
          );
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
            extra={
              <Button
                type="primary"
                onClick={() => {
                  history.push(context.goHome());
                }}
              >
                Back Home
              </Button>
            }
          />
        );
      }}
    </UserConsumer>
  );
};

export default HomePage;
