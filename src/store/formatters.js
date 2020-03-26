import { errorMessages } from '../messages';

const {
  SERVER_ERROR,
} = errorMessages;

// server exceptions to errors
export function se2errors(ex) {
  if (ex.data) {
    const { errors } = ex.data;
    return errors;
  }
  return [{
    msg: SERVER_ERROR,
  }];
}
