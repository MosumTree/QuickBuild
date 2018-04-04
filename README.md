# QuickBuild

快速构建一个测试项目

单纯的运行一段js逻辑的话就不需要构建测试项目，直接写个js，node命令行运行一下就可以了，但是往往阅读一段他人的源码想要自己测试一下就没办法这样子，因为别人会依赖模块，会操作浏览器dom等等，所以自己写一个测试小demo有时候就很有用处。

nodejs里面又没有什么dom元素，什么window全局对象，所以我们的代码最好运行在浏览器端，那么构造一个index.html是必不可少的，然后引入对应的js，这样就可以了？哪有这么简单。

### npm init 初始化项目
别人的代码里面依赖了一些模块，还用了ES6的语法，所以我们需要让我们的node环境支持ES6语法，那就需要引入babel。用npm init初始化一下，node就会为你创建一个package.json，用来管理你的依赖包，命令配置。

### babel的配置
```
npm install babel-register --save
npm install babel-preset-env --save
```
然后通过
```
require("babel-register");
require("./test.js");
```
的方式来解决ES6的语法问题，但是你会发现浏览器连require都不支持，那是当然的，JavaScript里面从来没听说过require语法。所以我们需要用到构建工具把代码编译成浏览器可以识别的js。这里就要用到webpack来进行打包模块化。

### webpack打包构建
记好先全局安装`webpack`：
```
npm i webpack -g
```
然后我们就可以通过配置来对你的js进行打包了，下面是最简单的配置：
```js
const path = require('path');

module.exports = {
  // JavaScript 执行入口文件
  entry: './index.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  }
};
```
`webpack`的配置自行研究，推荐《深入浅出Webpack》。

运行
```
webpack --config webpack.config.js
```
就可以打包你的js了，目录就是当前目录的dist文件夹下。当然想要起作用index.html必须引入这个js。

### 使用webpack-dev-server起服务
你是不是发现每次更改代码就需要打包一下，这样肯定很烦啊，所以利用webpack-dev-server在本地起一个服务，方便在你做出修改时刷新就可以看到变化。
我们构建server.js,像这样
```js
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	stats: {
		colors: true,
		hash: false,
		timings: true,
		chunks: false,
		chunkModules: false,
		modules: false
	}
});

server.listen(3040, 'localhost', function(err, result) {
	if (err) {
		return console.log(err);
	}
	console.log('Listening at http://localhost:3040/');
});
```
之后运行node server.js就可以在本地3040端口起个服务，之后你想在index.html写什么东西自己看着办吧，逻辑自然也可以运行。
