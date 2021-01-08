import axios from 'axios'
import router from "@/router";

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:8000';

axios.interceptors.request.use(config=>{
    // Do something before request is sent
    config.headers.Authorization = `${localStorage.token_type} ${localStorage.access_token}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status == 401) {
        alert('登录信息有误！请重新登录')
        router.replace({    //如果失败，跳转到登录页面
            name: 'login'
        })
    }
    return Promise.reject(error);
});

export default axios;