import React from 'react';
import { Descriptions, Row, Col, Avatar, Badge, Statistic, Card, Icon, Divider } from 'antd';
import { Bar } from 'ant-design-pro/lib/Charts';
import Banner from '../common/Banner';
import PageFooter from '../common/PageFooter';

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
  status: 'Status',
};

const mock = {
  firstName: 'Dru',
  lastName: 'Paul',
  gender: 'Male',
  age: '20',
  qualifications: 'None',
  areasOfInterest: 'Kids',
  languagesSpoken: 'English',
  status: 'Active',
};

const ProfilePage = () => {
  const fullName = `${mock.firstName} ${mock.lastName}`;
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
          </Col>
        </Row>
        <div style={{ margin: '10px auto' }}>
          <Descriptions title="Overview" size="middle" bordered>
            {Object.keys(mock).map(key => {
              if (key === 'status') {
                const color = mock[key] === 'Active' ? 'success' : 'warning';
                return (
                  <Descriptions.Item label={keyToString[key]}>
                    <Badge status={color} text={mock[key]} />
                  </Descriptions.Item>
                );
              }
              if (key !== 'firstName' && key !== 'lastName') {
                return <Descriptions.Item label={keyToString[key]}>{mock[key]}</Descriptions.Item>;
              }
              return null;
            })}
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
                <Statistic title="Total Volunteer Time" value={420} suffix="Hours" />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic title="Feedback" value={69} prefix={<Icon type="like" />} />
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
};

export default ProfilePage;
