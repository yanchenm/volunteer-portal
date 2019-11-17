/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

const { TextArea } = Input;

export const TextAreaElement = props => {
  const { errors, fieldName, handleBlur, handleChange, label, touched, values } = props;
  return (
    <div className="form-group">
      <label htmlFor={fieldName}>{label}</label>
      <TextArea
        style={{ marginBottom: '20px' }}
        onChange={handleChange}
        name={fieldName}
        value={values[fieldName]}
        onBlur={handleBlur}
        rows={4}
      />
      {errors[fieldName] && touched[fieldName] && (
        <div style={{ color: 'red' }}>{errors[fieldName]}</div>
      )}
    </div>
  );
};

TextAreaElement.propTypes = {
  errors: PropTypes.object.isRequired,
  fieldName: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default TextAreaElement;
