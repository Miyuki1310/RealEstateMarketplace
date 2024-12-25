import { createCustomError } from "../error/customError.js";

const notFound = (req, res, next) => {
  const error = createCustomError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};
export default notFound;
