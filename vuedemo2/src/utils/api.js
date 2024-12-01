import axios from 'axios'
const baseUrl = 'http://localhost:8081/uaa/'

const apiAxios = async (method, url, params) => {
    //项目既定fapp
    let headers = {'Content-Type': 'application/json'}
    //读取存储在sessionStorage中的token
    if (sessionStorage.getItem('token')) {
        headers.token = sessionStorage.getItem('token')
    }
    //alert('api '+headers.token)
    return await new Promise((resolve => {
        axios({
            //如果缓存里有token则所有请求都包含其
            headers: headers,
            method: method,
            url: baseUrl + url,
            //数据内容
            data:
                method === 'POST' ? params : null,
            params:
                method === 'GET' ? params : null
        }).then((res) => {
            console.log(res.data)
            resolve(res.data)
        }).catch(e => {
            console.log(e)
        })
    }))
}


//get请求
const api = {   
    //get请求
    async get(url, params,) {
        return await apiAxios('GET', url, params)
    },
    //post请求
    async post (url, params) {
         return await apiAxios('POST', url, params)
    }   
}
export default api
