
import axios from 'axios';
import requestInterceptors from '../interceptors/requestInterceptors';
import responseInterceptors from '../interceptors/responseInterceptors';

const reqInterceptAxios = requestInterceptors(axios);
const resInterceptAxios = responseInterceptors(reqInterceptAxios);
export default resInterceptAxios;
