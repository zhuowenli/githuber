# githuber

<a target="_blank" href="https://chrome.google.com/webstore/detail/githuber/janmcneaglgklfljjcpihkkomeghljnf"><img alt="Try it now" src="https://raw.github.com/GoogleChrome/chrome-app-samples/master/tryitnowbutton.png" title="Click here to install this sample from the Chrome Web Store"></img></a>

:octocat: 这是一个帮助 Githuber 每日发现优质内容的 Chrome 主页拓展。

![](./assets/action.gif)

## 本地网页开发

主要用于开发 UI，可自动刷新页面（无法调试 `chrome` 特性）

```bash
# 安装依赖
yarn

# 开发环境
yarn dev
```

打开 [http://localhost:4000](localhost:4000) 访问页面。

## Chrome 开发模式

用于调试 `chrome` 特性，代码编译成功后手动刷新页面方可生效

1. 编译代码
    ```
    # 执行 watch 命令
    yarn watch
    ```
2. 打开 Chrome [扩展程序](chrome://extensions/)，开启开发者模式
3. 点击**加载已解压的扩展程序**，找到编译后输出的 `dist` 目录，加载代码

> 开发时如果遇到 CORS 跨域问题，可以安装扩展程序 [Allow-Control-Allow-Origin: *](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi) 绕过CORS


## 服务端部署

1. 添加配置文件

```bash
# 添加 .env 填写正确的配置信息
cp .env.example .env
```

2. 创建数据库（默认用MySQL）

```bash
# 初始化数据表
yarn db:migrate
```

3. 启动服务

```bash
# 开发环境
yarn nodemon

# 生产环境
yarn start
```

## TODO LIST

- [x] 搜索引擎
    - Google
    - Baidu
    - Bing
    - Yahoo
    - 附加搜索引擎（用%s代替查询参数）
    - 搜索联想
- [x] 内容推荐
    - [x] 爬虫 GitHub Trending (data range：Today、This week、This month，language range)
    - [ ] GitHub Discover repositories
- [ ] 其他平台（待定）
    - v2ex
    - Dribbble
    - Behance
    - 500px
    - unsplash
    - producthunt
- [x] 设置
- [x] 弹窗
    - 书签收藏（快捷入口）
    - 读取标题、logo、URL（可编辑）
    - 添加按钮
- [x] i18n
    - 中文
    - 英文
- [ ] 高级设置（待定）
    - RSS
- [ ] 数据同步
    - [x] 手动备份
    - 从云端恢复数据
    - 账号（登录，注册）
- [x] 书签收藏（快捷入口）
- [ ] 最常访问（待定）
- [ ] 服务端
    - [x] 框架搭建：koa/egg Sequelize
    - [ ] GitHub 授权，根据用户ID获取 Discover（待定）
- [x] 上架
- [ ] Firefox 支持


## License
Githuber © [zhuowenli](https://github.com/zhuowenli), Released under the [Mozilla Public License 2.0](./LICENSE) License.
