import { CustomAPIError } from "../error/customError.js";

const handleError = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res
    .status(500)
    .json({ message: "Something went wrong, please try again" });
};

export default handleError;
