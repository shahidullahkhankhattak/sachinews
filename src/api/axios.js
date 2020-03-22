
import axios from 'axios';
import { bindRequestInterceptors } from '../interceptors/requestInterceptors';

const interceptorAxios = bindRequestInterceptors(axios);

export default interceptorAxios;
