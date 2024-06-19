### RS CLI 脚手架

#### 命令

```js
npm create rs-cli@latest
```

或者全局安装后直接使用`rs-cli`
```js
// 问答形式
rs-cli

// 一步到位
rs-cli my-project --vue3
```

#### 实现思路

##### 下载模板

- 将模板放入脚手架中下载（`rs-cli`）

- 在 `rs-cli/template` 文件夹下存放模板代码，各模板名称在 `rs-cli/config` 中进行配置

- 执行 `rs-cli` 命令下载模板代码到当前文件夹

- 动态渲染文件内容，例如获取用户输入包名动态修改模板中的 `package.name`

```js
minimist() // 获取终端命令
prompts() // 获取终端用户输入
ejs.render(file, params) // 处理 ejs 文件
```

##### 依赖

-   minimist/commander

> 命令行参数解析

```js
// --typescript / --ts
rs-cli my-project --ts
```


使用预设参数后，将跳过问题询问，直接拉对应模板到本地

-   prompts/inquirer

> 命令行交互

```js
请输入项目名称？ my-project
请输入版本号？ v1.0.0
请为你的项目选择特性？
- Typescript
- Router
- Vuex
- Pinia
```

-   gradient-string

> 定制控制台输出样式

-   kolorist

> 文字颜色格式化

