class CustomAPIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const createCustomError = (msg, status) => {
  return new CustomAPIError(msg, status);
};

export { createCustomError, CustomAPIError };
