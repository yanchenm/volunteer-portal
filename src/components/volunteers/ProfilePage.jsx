import React from 'react';
import { Descriptions, Row, Col, Avatar, Badge, Statistic, Card, Icon, Divider } from 'antd';
import { Bar } from 'ant-design-pro/lib/Charts';
import Banner from '../common/Banner';
import PageFooter from '../common/PageFooter';
import { UserConsumer } from '../../user.context';

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 10) + 2,
  });
}

const keyToString = {
  firstName: 'First Name',
  lastName: 'Last Name',
  gender: 'Gender',
  age: 'Age',
  qualifications: 'Qualifications',
  areasOfInterest: 'Areas of Interest',
  languagesSpoken: 'Languages Spoken',
};

const ProfilePage = () => {
  return (
    <UserConsumer>
      {context => {
        const { user } = context;
        const fullName = `${user.firstName} ${user.lastName}`;

        return (
          <div>
            <Banner />
            <div style={{ width: 1200, margin: '50px auto' }}>
              <Row>
                <Col span={3}>
                  <Avatar shape="square" size={128} icon="user" />
                </Col>
                <Col span={21}>
                  <h1>{fullName}</h1>
                  <p>Toronto Chapter</p>
                </Col>
              </Row>
              <div style={{ margin: '10px auto' }}>
                <Descriptions title="Overview" size="middle" bordered>
                  {Object.keys(user).map(key => {
                    if (key in keyToString && key !== 'firstName' && key !== 'lastName') {
                      return (
                        <Descriptions.Item label={keyToString[key]}>{user[key]}</Descriptions.Item>
                      );
                    }
                    return null;
                  })}
                  <Descriptions.Item label="Status">
                    <Badge status="success" text="Active" />
                  </Descriptions.Item>
                </Descriptions>
              </div>
              <Divider />
              <h3>Volunteer History</h3>
              <div style={{ margin: '10px auto' }}>
                <Row>
                  <Col span={6}>
                    <Card>
                      <Statistic
                        title="Monthly Hours"
                        value={11.28}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<Icon type="arrow-up" />}
                        suffix="%"
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card>
                      <Statistic title="Total Volunteer Time" value={137} suffix="Hours" />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card>
                      <Statistic title="Feedback" value={18} prefix={<Icon type="like" />} />
                    </Card>
                  </Col>
                </Row>
              </div>
              <div style={{ margin: '10px auto' }}>
                <Row>
                  <Col span={24}>
                    <Bar height={400} title="Monthly Hours" data={salesData} />
                  </Col>
                </Row>
              </div>
            </div>
            <PageFooter />
          </div>
        );
      }}
    </UserConsumer>
  );
};

export default ProfilePage;
