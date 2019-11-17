/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React from 'react';
import { Formik } from 'formik';
import { Button, message } from 'antd';
import * as Yup from 'yup';
import applicationForm from './appForm.json';
import permissionAndRelease from './permissionAndRelease.json';

import 'antd/dist/antd.css';
import TextElement from '../../forms/TextElement';
import PasswordElement from '../../forms/PasswordElement';
import RadioElement from '../../forms/RadioElement';
import TextAreaElement from '../../forms/TextAreaElement';
import Banner from '../../common/Banner';
import PageFooter from '../../common/PageFooter';
import { UserConsumer } from '../../../user.context';

import { checkUserExists } from '../../../civicrm/QueryUsers';
import { submitVolunteerApplication } from '../../../civicrm/UserCreation';
import { volunteerSubmitted } from '../../../civicrm/UserUpdate';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const ApplicationForm = props => {
  const initialValues = {};
  const validationSchema = {};

  applicationForm.forEach(section => {
    section.fields.forEach(field => {
      initialValues[field.fieldName] = '';
      if (field.required) {
        validationSchema[field.fieldName] = Yup.string().required('This field is required');
      }
    });
  });

  permissionAndRelease.forEach(field => {
    initialValues[field.fieldName] = '';
    if (field.required) {
      validationSchema[field.fieldName] = Yup.string().required('This field is required');
    }
  });

  return (
    <UserConsumer>
      {context => {
        const { user } = context;
        return (
          <div>
            <Banner />
            <div style={{ width: 800, margin: '30px auto' }}>
              <h1>Volunteer Application Form</h1>
              <p>
                Thank you for your interest in becoming a volunteer with Autism Ontario. Please
                complete the volunteer application form. Should you have any questions about the
                application or about volunteer opportunities, contact Laura Heimpel, Regional
                Program and Volunteer Coordinator at 416-246-9592 ext. 308.
              </p>
              <Formik
                initialValues={initialValues}
                onSubmit={async values => {
                  console.log('React');
                  submitVolunteerApplication(user.id, values);
                  volunteerSubmitted(user.id);
                  message.success('Application received. Please wait...');
                  await sleep(1500);
                  checkUserExists(user.email).then(res => {
                    const obj = Object.values(res.values)[0];
                    context.signIn(obj);
                    props.history.push(context.goHome());
                  });
                }}
                validationSchema={Yup.object().shape({
                  ...validationSchema,
                })}
              >
                {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
                  <form onSubmit={handleSubmit}>
                    {applicationForm.map(section => {
                      return (
                        <div>
                          <h1>{section.header}</h1>
                          {section.fields.map(item => {
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
                        </div>
                      );
                    })}
                    <h1>Permission and Release</h1>
                    <ol>
                      <li>
                        The references I listed may be contacted for the purpose of processing my
                        application to become a volunteer with Autism Ontario. I understand that
                        these references will be contacted in confidence;
                      </li>
                      <li>
                        I am in no way obligated to perform any volunteer services for Autism
                        Ontario;
                      </li>
                      <li>
                        I understand that I may be required to undergo a Vulnerable Sector Screening
                        check, if the position involves working with vulnerable individuals;
                      </li>
                      <li>
                        I acknowledge and accept that this application does not guarantee acceptance
                        to a volunteer role, and that Autism Ontario is under no obligation to
                        accept me as a volunteer, and is not obliged to provide a reason;
                      </li>
                      <li>
                        I hereby release and forever discharge Autism Ontario, and their employees,
                        directors, volunteers and contract staff from any cause or claim for
                        damages, whether bodily injury, death, property damage, or emotional trauma,
                        anxiety or distress arising from my association with Autism Ontario.
                      </li>
                      <li>
                        I give permission to Autism Ontario to share any information that I’ve given
                        them, pertinent to my application to volunteer, with appropriate staff and
                        volunteers.
                      </li>
                      <li>
                        If I am under 18 years of age at the time of my application, my
                        parent/guardian will complete a consent form on my behalf.
                      </li>
                    </ol>

                    {permissionAndRelease.map(item => {
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
                    })}

                    <Button type="primary" onClick={handleSubmit}>
                      Apply
                    </Button>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
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

export default ApplicationForm;
