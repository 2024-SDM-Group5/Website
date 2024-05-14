import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://pc214.ee.ntu.edu.tw/backend',
});

export default instance;
