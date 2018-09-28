const koa = require("koa");
const staticFile = require('koa-static');

// import css的文件乐意被忽略
// import csshook from 'css-modules-require-hook/preset';

// 忽略css svg img ...
const ignoreStyles = require('ignore-styles');

// strange app的内容写进来以后就汇报错 React is not defined 此处错误是在svg加载的时候
require('./app');