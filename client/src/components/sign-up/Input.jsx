import PropTypes from "prop-types";
import { ErrorMessage, useField } from "formik";

const FormInput = ({ name, ...rest }) => {
  const [field] = useField(name);
  return (
    <div>
      <input
        name={name}
        {...rest}
        {...field}
        className="p-3 rounded-lg border w-full outline-none"
      />
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default FormInput;
