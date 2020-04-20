
import axios from 'axios';
import requestInterceptors from '../interceptors/requestInterceptors';
import responseInterceptors from '../interceptors/responseInterceptors';

const reqInterceptAxios = requestInterceptors(axios, false);
const resInterceptAxios = responseInterceptors(reqInterceptAxios, false);
export default resInterceptAxios;
