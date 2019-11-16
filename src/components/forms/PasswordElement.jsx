/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

export const TextElement = props => {
  const { errors, fieldName, handleBlur, handleChange, label, touched, values } = props;
  return (
    <div className="form-group">
      <label htmlFor={fieldName}>{label}</label>
      <Input.Password
        onChange={handleChange}
        name={fieldName}
        value={values[fieldName]}
        onBlur={handleBlur}
      />
      {errors[fieldName] && touched[fieldName] && (
        <div style={{ color: 'red' }}>{errors[fieldName]}</div>
      )}
    </div>
  );
};

TextElement.propTypes = {
  errors: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  touched: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
};

export default TextElement;
