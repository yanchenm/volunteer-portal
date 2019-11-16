/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';

import 'antd/dist/antd.css';

export const RadioElement = props => {
  const { errors, fieldName, handleChange, label, options, touched, values } = props;
  return (
    <div className="form-group">
      <label htmlFor={fieldName}>{label}</label>
      <br />
      <Radio.Group onChange={handleChange} value={values[fieldName]} name={fieldName}>
        {options.map(item => {
          return <Radio.Button value={item}>{item}</Radio.Button>;
        })}
      </Radio.Group>
      {errors[fieldName] && touched[fieldName] && (
        <div style={{ color: 'red' }}>{errors[fieldName]}</div>
      )}
    </div>
  );
};

RadioElement.propTypes = {
  errors: PropTypes.func.isRequired,
  fieldName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  touched: PropTypes.func.isRequired,
  values: PropTypes.func.isRequired,
};

export default RadioElement;
