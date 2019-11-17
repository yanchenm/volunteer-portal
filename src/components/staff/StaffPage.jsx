import React from 'react';
import { List, Card } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 10px 20%;
`;

const fakePeopleToReview = [
  {
    name: 'User1',
    email: 'user1@gmail.com',
    location: 'Scarborough',
  },
  {
    name: 'User2',
    email: 'user2@gmail.com',
    location: 'Toronto',
  },
  {
    name: 'User3',
    email: 'user3@gmail.com',
    location: 'Thunder Bay',
  },
];

const StaffPage = () => {
  return (
    <Wrapper>
      <h1>Staff Dashboard</h1>
      Volunteers to approve:
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={fakePeopleToReview}
        renderItem={volunteer => (
          <List.Item>
            <Card title={volunteer.name}>
              {volunteer.email}
              <br />
              {volunteer.location}
            </Card>
          </List.Item>
        )}
      />
    </Wrapper>
  );
};

export default StaffPage;
