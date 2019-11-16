/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React from 'react';
import { Formik } from 'formik';
import { Button } from 'antd';
import * as Yup from 'yup';
import fields from './fields.json';

import 'antd/dist/antd.css';
import FormElement from './FormElement';

const ApplicationForm = () => {
  return (
    <div>
      <div style={{ width: 400, margin: '100px auto' }}>
        <h1>Application Form</h1>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            gender: '',
            address: '',
            city: '',
            province: '',
            postalCode: '',
            daytimePhone: '',
            eveningPhone: '',
            email: '',
          }}
          onSubmit={values => {
            console.log(values);
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required('First name is required.'),
            lastName: Yup.string().required('Last name is required.'),
            gender: Yup.string().required('Gender is required.'),
            address: Yup.string().required('Address is required.'),
            city: Yup.string().required('City is required.'),
            province: Yup.string().required('Province is required.'),
            postalCode: Yup.string().required('Postal Code is required.'),
            daytimePhone: Yup.string().required('Daytime Phone Number is required.'),
            eveningPhone: Yup.string().required('Evening Phone Number is required.'),
            email: Yup.string()
              .email('Email is invalid.')
              .required('Email is required'),
          })}
        >
          {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              {fields.map(item => {
                return (
                  <FormElement
                    errors={errors}
                    fieldName={item.fieldName}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    label={item.label}
                    touched={touched}
                    values={values}
                  />
                );
              })}
              <Button type="primary" onClick={handleSubmit}>
                Apply
              </Button>
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ApplicationForm;
