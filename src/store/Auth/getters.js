
export const user = ({ auth: { jwtAuth } }) => jwtAuth && jwtAuth.user;
export const authErrors = ({ auth: { errors } }) => errors || [];
