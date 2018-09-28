const koa = require("koa");
const staticFile = require('koa-static');
import staticPath from '../build/asset-manifest.json';
const app = new koa();
const path = require('path');

/**
 * 插入react代码 进行服务端改造
 */
import React from 'react';
import ReactDOM from 'react-dom';
// 引入renderToString
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
// 服务端是没有BrowserRouter 所以用StaticRouter
// 引入reducer
// 引入前端路由
import AppServerSide from '../src/App';


// 用户接口模块
// app.use("/user",userRoute);

// 映射到build后的路径
//设置build以后的文件路径 项目上线用
app.use(async (ctx, next) => {
    if (ctx.req.url.startsWith('/user/') || ctx.req.url.startsWith('/static/')) {
        return await next();
    }
    const context = {}
    const frontComponents = renderToString(
        (
            <AppServerSide />
        )
    );

    ctx.response.body = (htmlTemplate(frontComponents));
})
app.use(staticFile(path.resolve('build'), {
    maxage: 5 * 60 * 1000 
}));

app.listen("9000",function(){
    console.log("open Browser http://localhost:9000");
});


function htmlTemplate( reactDom) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <link rel="stylesheet" href="/${staticPath['main.css']}">
            <title>React SSR</title>
        </head>
        
        <body>
            <div id="root">${ reactDom }</div>
            <script>
                window.REDUX_DATA = 'test' 
            </script>
            <script src="/${staticPath['main.js']}"></script>
        </body>
        </html>
    `;
}