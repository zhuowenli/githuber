<p align="center">
    <img src="./assets/logo.png" width="150" />
</p>

## GITHUBER

:octocat: 这是一个帮助 GitHub 开发者每日发现优质内容的 Chrome 主页拓展。

✔ 支持四大搜索引擎：谷歌、百度、必应、雅虎<br>
✔ 添加便捷书签<br>
✔ 爬 Github Trending 展示所有编程语言的每日、每周、每月热门 Repo<br>
✔ 项目开源，方便大家进行代码审计、添加新功能<br>
✔ 支持中英文、备份数据、以及基本视图设置

![](./assets/0.png)

One-click install from Google Chrome Web Store ⬇️ ⬇️ ⬇️

<a target="_blank" href="https://chrome.google.com/webstore/detail/githuber/janmcneaglgklfljjcpihkkomeghljnf"><img alt="Try it now"  width="300" src="https://raw.github.com/GoogleChrome/chrome-app-samples/master/tryitnowbutton.png" title="Click here to install this sample from the Chrome Web Store"></img></a>

## 本地开发

用于调试 `chrome` 特性，代码编译成功后手动刷新页面方可生效

1. 安装依赖
    ```bash
    npm i
    ```
2. 编译代码
    ```bash
    npm run watch
    ```
3. 打开 Chrome 扩展程序 [chrome://extensions/](chrome://extensions/)，开启开发者模式
4. 点击**加载已解压的扩展程序**，找到编译后输出的 `dist` 目录，加载代码

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

## 相关链接

- [GitHub Octicons](https://octicons.github.com/)

## License
Githuber © [zhuowenli](https://github.com/zhuowenli), Released under the [Mozilla Public License 2.0](./LICENSE) License.
