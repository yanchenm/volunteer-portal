import React from 'react';
import { Card, Icon, Row, Col, Result } from 'antd';

import Banner from '../common/Banner';
import PageFooter from '../common/PageFooter';

import { UserConsumer } from '../../user.context';

import 'antd/dist/antd.css';

const ApplicationProgress = () => {
  return (
    <UserConsumer>
      {context => {
        const { user } = context;

        const interviewText = user.interviewed
          ? 'Thanks for chatting with us!'
          : 'Look for an email from us soon...';

        const interviewElement = user.interviewed ? (
          <Result status="success" title={interviewText} />
        ) : (
          <Result title={interviewText} />
        );

        const approveText = user.approved
          ? 'Please submit your documents to continue...'
          : 'Look for an email from us soon...';

        const approveElement = user.approved ? (
          <Result status="success" title={approveText} />
        ) : (
          <Result title={approveText} />
        );

        return (
          <div>
            <Banner />
            <div style={{ width: 1200, margin: '30px auto' }}>
              <h1>Track your Application</h1>
              <div style={{ margin: '20px auto' }}>
                <Row>
                  <Col span={6}>
                    <Card title="Application Received" style={{ width: 300 }}>
                      <Result status="success" title="We've received your application!" />
                    </Card>
                  </Col>
                  <Col span={3}>
                    <Icon
                      type="arrow-right"
                      style={{ fontSize: '60px', marginTop: '170px', marginLeft: '45px' }}
                    />
                  </Col>
                  <Col span={6}>
                    <Card title="Interview" style={{ width: 300 }}>
                      {interviewElement}
                    </Card>
                  </Col>
                  <Col span={3}>
                    <Icon
                      type="arrow-right"
                      style={{ fontSize: '60px', marginTop: '170px', marginLeft: '45px' }}
                    />
                  </Col>
                  <Col span={6}>
                    <Card title="Approved" style={{ width: 300 }}>
                      {approveElement}
                    </Card>
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

export default ApplicationProgress;
