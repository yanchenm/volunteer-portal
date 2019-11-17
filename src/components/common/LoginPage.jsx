/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Input, Button, Row, Col, Divider } from 'antd';
import * as Yup from 'yup';
import logo from '../../logo.png';

import 'antd/dist/antd.css';

const LoginPage = () => {
  return (
    <Row>
      <Col span={3}>&nbsp;</Col>
      <Col span={9}>
        <div>
          <img src={logo} alt="Logo" style={{ height: '300px', margin: '270px auto' }} />
        </div>
      </Col>
      <Col span={12}>
        <Divider type="vertical" />
        <div style={{ width: 500, margin: '300px auto' }}>
          <h1>Volunteer Portal</h1>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
              alert(JSON.stringify(values, null, 2));
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Email is invalid.')
                .required('Email is required'),
              password: Yup.string().required('Password is required'),
            })}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Email</label>
                  <Input
                    onChange={handleChange}
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && (
                    <div style={{ color: 'red' }}>{errors.email}</div>
                  )}
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="Email">Password</label>
                  <Input.Password
                    onChange={handleChange}
                    name="password"
                    value={values.password}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div style={{ color: 'red' }}>{errors.password}</div>
                  )}
                </div>
                <br />
                <Button type="primary" onClick={handleSubmit}>
                  Log in
                </Button>
              </form>
            )}
          </Formik>
          <br />
          <Link to="/register">Create an account.</Link>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
