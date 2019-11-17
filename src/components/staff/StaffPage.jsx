import React from 'react';
import { List, Card, Modal, Button } from 'antd';

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

class StaffPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      currentUser: null,
    };
  }

  showModal = index => {
    this.setState({
      visible: true,
      currentUser: fakePeopleToReview[index],
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  acceptVolunteer = () => {
    // Post to flip accepted flag, remove from list
  };

  render = () => {
    const { visible, currentUser } = this.state;
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
          renderItem={(volunteer, index) => (
            <List.Item>
              <Card title={volunteer.name}>
                {volunteer.email}
                <br />
                {volunteer.location}
                <br />
                <Button
                  id={index}
                  type="primary"
                  onClick={event => {
                    this.showModal(parseInt(event.target.id, 10));
                  }}
                >
                  Open Modal
                </Button>
              </Card>
            </List.Item>
          )}
        />
        <Modal
          title="Volunteer Modal"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{currentUser ? currentUser.name : ''}</p>
          <p>This will be content about the user.</p>
          <Button type="primary" onClick={this.acceptVolunteer()}>
            Accept
          </Button>
        </Modal>
      </Wrapper>
    );
  };
}

export default StaffPage;
