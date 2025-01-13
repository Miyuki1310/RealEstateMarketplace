import { Field } from "formik";
import PropTypes from "prop-types";
// import React from "react";

const RadioInput = ({ name, values, ...rest }) => {
  return <Field type="radio" name={name} value={values} {...rest} />;
};

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.string.isRequired,
};

export default RadioInput;
