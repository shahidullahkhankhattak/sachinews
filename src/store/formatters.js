import { errorMessages } from '../messages';

const {
  SERVER_ERROR,
} = errorMessages;

// server exceptions to errors
export function se2errors(ex) {
  if (ex.response) {
    const { data: { errors } } = ex.response;
    return errors;
  }
  return [{
    msg: SERVER_ERROR,
  }];
}
