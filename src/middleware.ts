import axios, { AxiosResponse, Method } from "axios";
import koa from "koa";

export  function AxiosProxy(url: string) {
   return async (ctx:koa.ExtendableContext) =>  {
    const axiosRes = await ExpressToAxios(url, ctx.request)
    // console.log("axiosRes", axiosRes);
    ctx.response.status = axiosRes.status as number;
    ctx.response.body =  axiosRes.data
      Object.entries(axiosRes.headers).forEach(([key,value]) => {
        ctx.response.set(key,value +'')
      })
  };
}

async function ExpressToAxios(
  url: string,
  request: koa.Request
) {
  const reqUrl = `${url}${request.url}`;
  // console.log("__________________-", reqUrl);
  const kk = new URL(reqUrl);
  // console.log(kk.protocol)
  // console.log(kk)
  const reqHeaders = {
    ...request.headers,
    host: kk.hostname,
    authorization: 'Basic ZWxhc3RpYzo4VVpjT3p3dlBEZmtQanlkVlhqYXc1aG8='
  };

  // console.log("url ", url);
  // console.log("request.url ", request.url);
  // console.log("request.query ", request.query);
  // console.log("request.path ", request.path);
  // console.log("request.body ", request.body);
  // console.log(`${url}${request.url}`);
  // console.log("headers ", reqHeaders);
  // {
  //   host: '127.0.0.1:3001',
  //   'content-type': 'application/json',
  //   'user-agent': 'insomnia/9.3.2',
  //   authorization: 'Basic ZWxhc3RpYzo4VVpjT3p3dlBEZmtQanlkVlhqYXc1aG8=',
  //   accept: '*/*',
  //   'content-length': '112',
  //   Host: '0bb0fb20384a4d2fb32801722deb2dd3.asia-southeast1.gcp.elastic-cloud.com'
  // }
// ES 
  // > Host: 0bb0fb20384a4d2fb32801722deb2dd3.asia-southeast1.gcp.elastic-cloud.com
  // > content-type: application/json
  // > user-agent: insomnia/9.3.2
  // > authorization: Basic ZWxhc3RpYzo4VVpjT3p3dlBEZmtQanlkVlhqYXc1aG8=
  // > accept: */*
  // > content-length: 112

  // HTTP PROXY
  // {
  //   port: '443',
  //   host: '0bb0fb20384a4d2fb32801722deb2dd3.asia-southeast1.gcp.elastic-cloud.com:443',
  //   hostname: '0bb0fb20384a4d2fb32801722deb2dd3.asia-southeast1.gcp.elastic-cloud.com',
  //   socketPath: undefined,
  //   pfx: undefined,
  //   key: undefined,
  //   passphrase: undefined,
  //   cert: undefined,
  //   ca: undefined,
  //   ciphers: undefined,
  //   secureProtocol: undefined,
  //   method: 'GET',
  //   headers: {
  //     'content-length': '112',
  //     accept: '*/*',
  //     authorization: 'Basic ZWxhc3RpYzo4VVpjT3p3dlBEZmtQanlkVlhqYXc1aG8=',
  //     'user-agent': 'insomnia/9.3.2',
  //     'content-type': 'application/json',
  //     host: '0bb0fb20384a4d2fb32801722deb2dd3.asia-southeast1.gcp.elastic-cloud.com:443',
  //     connection: 'close'
  //   },
  //   rejectUnauthorized: true,
  //   agent: false,
  //   localAddress: undefined,
  //   path: '/caas-cn-zaobao-online/_search'
  // }
  const option = {
    url: reqUrl,
    method: request.method as Method,
    headers: reqHeaders,
    // params: request.query,
    data: "content-length" in reqHeaders ? request.body : undefined,
  }
  console.log(">>>>>>", reqUrl, option);

  return axios.request(option)
    .then((it) => {
      console.log("<<<<<<", it.data);
      return {
        status: it.status,
        headers: it.headers,
        data: it.data,
      };
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return {
          status: error.response.status,
          headers: error.response.headers,
          data: error.response.data,
        };
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
      console.log(error.message);
      return error;
    });
}
