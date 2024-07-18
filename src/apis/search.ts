 

import axios from "axios";
import { router } from "./constants";
router.all(
  "/search",
  async (ctx, next) => {
    console.log(`router.post("/search"`);
    ctx.response.body =  {
      body: ctx.request.body,
      query: ctx.request.query,
      params: ctx.params,
      headers: ctx.headers,
      method: ctx.method,
      url: ctx.url,
    };
    
    const opts= {
      "url": "https://0bb0fb20384a4d2fb32801722deb2dd3.asia-southeast1.gcp.elastic-cloud.com:443/demo/_bulk?pretty",
      "method": "POST",
      "headers": {
        "content-type": "application/x-ndjson",
        "user-agent": "insomnia/9.3.2",
        "authorization": "Basic ZWxhc3RpYzo4VVpjT3p3dlBEZmtQanlkVlhqYXc1aG8=",
        "accept": "*/*",
        "host": "0bb0fb20384a4d2fb32801722deb2dd3.asia-southeast1.gcp.elastic-cloud.com"
      },
      "params": {
        "pretty": ""
      },
      "data": "{\"index\":{\"_index\":\"caas-cn-zaobao-online\",\"_id\":\"2\"}}\n{\"data\":{\"resolution\":{\"context\":\"art\",\"remainingPath\":\"\",\"publication\":{\"name\":\"zaobao\",\"href\":\"https://zaobao.cue-staging.sphnet.com.sg/\",\"features\":[{\"key\":\"com.escenic.cue.spellcheck.language\",\"value\":\"zh-CN\"},{\"key\":\"publication.previewURL\",\"value\":\"https://zaobao.preview.cue-staging.sphnet.com.sg/\"}]},\"section\":{\"name\":\"World\",\"uniqueName\":\"news_world\",\"directoryName\":\"world\",\"parent\":{\"name\":\"News\",\"uniqueName\":\"news\",\"directoryName\":\"news\",\"parent\":{\"name\":\"Home\",\"uniqueName\":\"ece_frontpage\",\"directoryName\":\"frontpage\"}},\"href\":\"https://zaobao.cue-staging.sphnet.com.sg/news/world/\",\"parameters\":[]}}}}\n"
      // "data": `{"index":{"_index":"caas-cn-zaobao-online","_id":"2"}}\n{"data":{"resolution":{"context":"art","remainingPath":","publication":{"name":"zaobao","href":"https://zaobao.cue-staging.sphnet.com.sg/","features":[{"key":"com.escenic.cue.spellcheck.language","value":"zh-CN"},{"key":"publication.previewURL","value":"https://zaobao.preview.cue-staging.sphnet.com.sg/"}]},\"section\":{\"name\":\"World\",\"uniqueName\":\"news_world\",\"directoryName\":\"world\",\"parent\":{\"name\":\"News\",\"uniqueName\":\"news\",\"directoryName\":\"news\",\"parent\":{\"name\":\"Home\",\"uniqueName\":\"ece_frontpage\",\"directoryName\":\"frontpage\"}},\"href\":\"https://zaobao.cue-staging.sphnet.com.sg/news/world/\",\"parameters\":[]}}}}\n`
    }

    await axios(opts).then(it=>console.log(it.data)).catch(it=> console.log(it.response.data))
  // next()
}
);
