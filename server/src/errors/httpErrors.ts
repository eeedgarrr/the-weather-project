// When something goes wrong (HKO unreachable, bad response, etc.), send a proper HTTP response

export type ClientError = {
  statusCode: number;
  message: string;
};

type HkoApiError = Error & {
  isHkoApiError: true;
  statusCode: number;
};

// uses in services when an external API call fails
export const createHkoApiError = (
  message: string,
  statusCode = 502,
): HkoApiError => {
  const error = new Error(message) as HkoApiError;
  error.isHkoApiError = true;
  error.statusCode = statusCode;
  return error;
};

// err is unknown because it can be anything
const isHkoApiError = (err: unknown): err is HkoApiError =>
  typeof err === "object" &&
  err !== null &&
  "isHkoApiError" in err &&
  (err as HkoApiError).isHkoApiError === true;

// turn any thrown value into status + message for the client
export const toClientError = (err: unknown): ClientError | null => {
  if (!isHkoApiError(err)) {
    return null;
  }

  return {
    statusCode: err.statusCode,
    message: err.message,
  };
};
