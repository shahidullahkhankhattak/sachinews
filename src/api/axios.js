
import axios from 'axios';
import requestInterceptors from '../interceptors/requestInterceptors';
import responseInterceptors from '../interceptors/responseInterceptors';

const axiosModule = axios.create();
const reqInterceptAxios = requestInterceptors(axiosModule);
const resInterceptAxios = responseInterceptors(reqInterceptAxios);
export default resInterceptAxios;
