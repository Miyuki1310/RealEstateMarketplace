import { ErrorMessage, useField } from "formik";
import PropTypes from "prop-types";

const TextArea = ({ name, ...rest }) => {
  const [field] = useField(name);
  return (
    <div>
      <textarea
        name={name}
        {...rest}
        {...field}
        className="px-3 py-5 rounded-lg w-full border outline-none"
      />
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TextArea;
