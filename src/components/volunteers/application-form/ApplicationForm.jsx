/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React from 'react';
import { Formik } from 'formik';
import { Button } from 'antd';
import * as Yup from 'yup';
import fields from './applicationForm.json';

import 'antd/dist/antd.css';
import TextElement from './TextElement';
import RadioElement from './RadioElement';
import TextAreaElement from './TextAreaElement';

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
      <div style={{ width: 800, margin: '100px auto' }}>
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
                if (item.type === 'text') {
                  return (
                    <TextElement
                      errors={errors}
                      fieldName={item.fieldName}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label={item.label}
                      touched={touched}
                      values={values}
                    />
                  );
                }
                if (item.type === 'radio') {
                  return (
                    <RadioElement
                      errors={errors}
                      fieldName={item.fieldName}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label={item.label}
                      options={item.options}
                      touched={touched}
                      values={values}
                    />
                  );
                }
                if (item.type === 'textArea') {
                  return (
                    <TextAreaElement
                      errors={errors}
                      fieldName={item.fieldName}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      label={item.label}
                      options={item.options}
                      touched={touched}
                      values={values}
                    />
                  );
                }
                return <div />;
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
