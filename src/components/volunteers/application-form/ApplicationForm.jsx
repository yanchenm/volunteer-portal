/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React from 'react';
import { Formik } from 'formik';
import { Button } from 'antd';
import * as Yup from 'yup';
import fields from './contactInfo.json';

import 'antd/dist/antd.css';
import FormElement from './FormElement';

const ApplicationForm = () => {
  const initialValues = {};
  const validationSchema = {};

  fields.forEach(field => {
    initialValues[field.fieldName] = '';
    if (field.required) {
      validationSchema[field.fieldName] = Yup.string().required('This field is required');
    }
  });

  return (
    <div>
      <div style={{ width: 400, margin: '100px auto' }}>
        <h1>Application Form</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            console.log(values);
          }}
          validationSchema={Yup.object().shape({
            ...validationSchema,
            ...{
              email: Yup.string()
                .email('Email is invalid.')
                .required('This field is required'),
            },
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
