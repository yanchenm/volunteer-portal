/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Formik } from 'formik';
import { Button, PageHeader, message } from 'antd';
import * as Yup from 'yup';

import contactInfo from './contactInfo.json';
import TextElement from '../../forms/TextElement';
import PasswordElement from '../../forms/PasswordElement';
import RadioElement from '../../forms/RadioElement';

import PageFooter from '../../common/PageFooter';

import { checkUserExists } from '../../../civicrm/QueryUsers';
import { createVolunteer } from '../../../civicrm/UserCreation';
import { UserConsumer } from '../../../user.context';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const RegistrationPage = props => {
  const initialValues = {};
  const validationSchema = {};

  contactInfo.forEach(field => {
    initialValues[field.fieldName] = '';
    if (field.required) {
      validationSchema[field.fieldName] = Yup.string().required('This field is required');
    }
  });

  return (
    <UserConsumer>
      {context => {
        return (
          <div>
            <div
              style={{
                padding: 24,
              }}
            >
              <PageHeader ghost={false} onBack={() => window.history.back()} title="Back" />
            </div>
            <div style={{ width: 800, margin: '30px auto' }}>
              <h1>Volunteer Registration</h1>
              <p>
                Thank you for your interest in becoming a volunteer with Autism Ontario. Please
                complete the volunteer registration form here.
              </p>
              <Formik
                initialValues={initialValues}
                onSubmit={async values => {
                  createVolunteer(values);
                  message.success('Account created. Please wait...');
                  await sleep(1500);
                  checkUserExists(values.email).then(res => {
                    const obj = Object.values(res.values)[0];
                    context.signIn(obj);
                    props.history.push(context.goHome());
                  });
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
                    <div>
                      {contactInfo.map(item => {
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
                        if (item.type === 'password') {
                          return (
                            <PasswordElement
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
                        if (item.type === 'checkbox') {
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
                        return <div />;
                      })}
                    </div>
                    <Button type="primary" onClick={handleSubmit}>
                      Register
                    </Button>
                    {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
                  </form>
                )}
              </Formik>
            </div>
            <PageFooter />
          </div>
        );
      }}
    </UserConsumer>
  );
};

export default RegistrationPage;
