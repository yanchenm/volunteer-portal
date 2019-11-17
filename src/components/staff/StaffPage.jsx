/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React from 'react';
import { Descriptions, List, Card, Modal, Button } from 'antd';
import styled from 'styled-components';
import { listVolunteers } from '../../civicrm/QueryUsers';
import { volunteerInterviewed, volunteerApproved } from '../../civicrm/UserUpdate';

import customFields from '../common/CustomFields.json';

const Wrapper = styled.div`
  margin: 10px 20%;
`;

class StaffPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      currentUser: null,
      interviewList: [],
      approveList: [],
    };
  }

  componentDidMount() {
    let interviewList;
    let approveList;
    listVolunteers(false, false).then(res => {
      interviewList = Object.values(res.values);
      this.setState({
        interviewList,
      });
    });
    listVolunteers(true, false).then(res => {
      approveList = Object.values(res.values);
      this.setState({
        approveList,
      });
    });
  }

  showModal = (index, inInterviewList) => {
    this.setState({
      visible: true,
      currentUser: inInterviewList
        ? this.state.interviewList[index]
        : this.state.approveList[index],
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

  interviewVolunteer = () => {
    volunteerInterviewed(12);
  };

  approveVolunteer = () => {
    // Post to flip accepted flag, remove from list
    volunteerApproved(12);
  };

  render = () => {
    const ModalDashboard = currentUser => {
      console.log(currentUser);
      if (currentUser) {
        return (
          <div>
            <p>asodijsdoijsdoifj</p>
            <Descriptions size="small" column={2} bordered>
              {Object.keys(currentUser.currentUser).map(key => {
                if (
                  currentUser.currentUser[key] !== '' &&
                  key !== 'firstName' &&
                  key !== 'lastName'
                ) {
                  return (
                    <Descriptions.Item label={customFields[key] || key}>
                      {currentUser.currentUser[key]}
                    </Descriptions.Item>
                  );
                }
                return null;
              })}
            </Descriptions>
          </div>
        );
      }
      return <div />;
    };
    const { visible, currentUser, interviewList, approveList } = this.state;
    return (
      <Wrapper>
        <h1>Staff Dashboard</h1>
        Volunteers to interview:
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
          dataSource={interviewList}
          renderItem={(volunteer, index) => (
            <List.Item>
              <Card title={volunteer.firstName}>
                {volunteer.email}
                <br />
                {volunteer.location}
                <br />
                <Button
                  id={index}
                  type="primary"
                  onClick={event => {
                    this.showModal(parseInt(event.target.id, 10), true);
                  }}
                >
                  Open Modal
                </Button>
              </Card>
            </List.Item>
          )}
        />
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
          dataSource={approveList}
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
                    this.showModal(parseInt(event.target.id, 10), false);
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
          width={1000}
        >
          <p>{currentUser ? `${currentUser.first_name} ${currentUser.last_name}` : ''}</p>
          {/* <p>This will be content about the user.</p> */}
          <ModalDashboard currentUser={currentUser} />
          <Button type="primary" onClick={this.approveVolunteer()}>
            Accept
          </Button>
        </Modal>
      </Wrapper>
    );
  };
}

export default StaffPage;
