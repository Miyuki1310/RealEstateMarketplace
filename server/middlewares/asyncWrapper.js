const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.log(err);
      next(err);
    });
  };
};
export default asyncWrapper;
