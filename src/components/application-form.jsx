import React from 'react';
import styled from 'styled-components';
import { Button, Checkbox, Form } from 'semantic-ui-react';

const Wrapper = styled.div`
  margin: 10px 20%;
`;

const ApplicationForm = () => (
  <Wrapper>
    <Form>
      <Form.Field>
        <label htmlFor="application-form">
          First Name
          <input placeholder="First Name" />
        </label>
      </Form.Field>
      <Form.Field>
        <label htmlFor="application-form">
          Last Name
          <input placeholder="Last Name" />
        </label>
      </Form.Field>
      <Form.Field>
        <Checkbox label="I agree to the Terms and Conditions" />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  </Wrapper>
);

export default ApplicationForm;
