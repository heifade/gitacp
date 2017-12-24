gitacp


[![NPM version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]
[![Build Status](https://travis-ci.org/heifade/gitacp.svg?branch=master)](https://travis-ci.org/heifade/gitacp)
[![Coverage Status](https://coveralls.io/repos/github/heifade/gitacp/badge.svg?branch=master)](https://coveralls.io/github/heifade/gitacp?branch=master)

[npm-image]: https://img.shields.io/npm/v/gitacp.svg?style=flat-square
[npm-url]: https://npmjs.org/package/gitacp
[downloads-image]: https://img.shields.io/npm/dm/gitacp.svg

# 源代码及文档
[源代码](https://github.com/heifade/gitacp)
[开发文档](https://heifade.github.io/gitacp/)

# 安装
```bash
npm install gitacp -g
```

# 介绍
为方便使用git，将git status，git add，git commit，git push 整合到一起。并自动更新版本号+1

# 命令:
```bash
gitacp
gitp
acp
pp
```
以上4个命令等价

# gitacp
相当于
```bash
git status -s
git add .
git commit -m 'no message'
git push
```

# gitacp -m 'msg'
相当于
```bash
git status -s
git add .
git commit -m 'msg'
git push
```

# gitacp -m 'msg' -v
相当于如下组合：
```bash
1、将版本号加1：如当前版本号为10.2.3 变成 10.2.4。 如当前版本号为10.2.3-beta1 变成 10.2.3-beta2
2、gitacp -m 'msg'
```