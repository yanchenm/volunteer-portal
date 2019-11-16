/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Input, Button } from 'antd';
import * as Yup from 'yup';

import 'antd/dist/antd.css';

const LoginPage = () => {
  return (
    <div style={{ width: 400, margin: '100px auto' }}>
      <h1>Login</h1>
      <Formik
        initialValues={{ name: '', email: '' }}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name is required.'),
          email: Yup.string()
            .email('Email is invalid.')
            .required('Email is required'),
        })}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Input onChange={handleChange} name="name" value={values.name} onBlur={handleBlur} />
              {errors.name && touched.name && <div style={{ color: 'red' }}>{errors.name}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="Email">Email</label>
              <Input
                onChange={handleChange}
                name="email"
                value={values.email}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && <div style={{ color: 'red' }}>{errors.email}</div>}
            </div>
            <Button type="primary" onClick={handleSubmit}>
              Sign Up
            </Button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      </Formik>
      <Link to="/">Back Home</Link>
    </div>
  );
};

export default LoginPage;
