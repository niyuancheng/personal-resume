---
title: 倪袁成的个人简历
description: 前端简历
layout: ../layouts/resume.astro
pdfLink: 倪袁成的个人简历.pdf
---

# 倪袁成的个人简历
## 关于我
**23岁   |   男   |   上海 | 19951064606 | nyc20010820@126.com**
- ```我的```GitHub: https://github.com/niyuancheng
- ```我的```开源：https://github.com/NiMediaOrg/NiPlayer
- ```我的```技术栈：```JavaScript + TypeScript + Vue + Solidjs + Tailwindcss + Mobx + 音视频相关 + 前端渲染相关```

## 教育背景
**华东师范大学 - 软件工程（2019.09-2023.07）**

## 实习经历
**2022.02-2022.07 | SAP思爱普 | IOS客户端开发**
- SAP-S4MM团队：使用 ```JavaSript + Swift``` 进行 ```Hybrid``` 开发

## 工作经历 
**2023.07-至今 | 上海哔哩哔哩 | 前端开发**
- Titan播放器：技术栈为 ```TypeScript + Dash.js + Mobx + Mp4box.js + Monorepo```; 
- DanmakuX 弹幕引擎：技术栈为 ```TypeScript + Solidjs + PixiJs + Vitest + Playwright + Monorepo + Docker``` ;

## 项目经历
**DanmakuX弹幕引擎（项目负责人）** <BR />
> 项目介绍: B站官方弹幕渲染引擎，由本人0-1主导进行 设计 + 优化 + 重构；一款适用于Web端的弹幕引擎；使用到的场景：点播，直播，大会员，课堂，漫画，星辰等部门；

**负责工作：**
- 项目架构：```Webpack + Eslint + Prettier + Commitlint + Husky + TypeScript + PixiJs + SolidJs``` 搭建项目；
- 碰撞检测优化：由最早的自适应检测算法改为弹幕轨道检测算法；
- 尺寸计算优化：根据每条弹幕的一个个字的尺寸估算其长度，估算失败则使用 ```getBoundingClientRect```;
- 弹幕渲染优化：采用 分帧（读写```dom```分三帧进行） + 锁帧（锁定为```30fps```的执行频率） 策略；
- 整体架构优化：参考```react```和```react-dom```的设计，将引擎内部分为 ```核心层```（负责整体调度逻辑，只有核心数据，不包含具体的渲染逻辑，类似于react） + ```渲染层```（负责每条弹幕的渲染，类似于```react-dom```）；每种类型的弹幕对应一种```渲染器```，渲染器通过```tapable```机制来进行弹幕的```初始化 -> 更新 -> 销毁```；
- ui层渲染重构：ui 层使用 ```SolidJS``` 进行重构，实现 状态 和 ui 的绑定；
- 特效渲染重构：通过```pixi.js```提供 ```webgl``` 或 ```webgpu``` 的渲染能力。编写 顶点着色器 和 片元着色器 优化弹幕的特效展示；
- 自动化测试：使用```vitest```编写单元测试 + 使用```playwright```编写e2e测试，并且接入ci/cd流程，保障整体项目的稳定性；

**Titan播放器（项目开发者）** <br />
> 项目介绍：B站Web端通用播放器；其使用到的场景有：网页端，PC客户端等;

**负责工作：优化播放体验，降低播放卡顿，提升首屏和首帧的加载速度，提出如下优化策略：**
1.  虚拟Buffer调度算法：
- 通常情况下，每一个请求到的视频分片数据会直接通过 MSE API 的 appendBuffer 方法添加到video标签的缓冲区内，但是对于高码率场景例如4k清晰度容易造成MseQuotaExceed（video缓冲区溢出）的错误;
- 遂本人提出在当前设置的 最大缓冲长度（比如最多保存40s） 的基础上额外再请求 20s 的分片数据保存到内存数组中，后续则维护内存的分片数组；
2.  首屏和首帧优化 ：
- 播放器整体结构优化，分为 ```store层 + plugin层```；store层存储 全局状态 + 核心播放功能 ，plugin层渲染ui；store层打包成播放器的入口包core.js，plugin层通过 webpack 懒加载策略打包成单独的cdn文件；如此即可降低入口包体积，提升加载速度。
- 配合播放页进行```SSR```处理，在node端提前加载视频分片索引文件拼接到html字符串中返回给前端。
- 播放页接口后置，优先保障播放器内的必要接口先进行加载。<br />
> 整体成果：vv卡顿相对降低11.7%，分钟卡顿相对降低15.45%，首帧 2000+ms 降低至 1000+ms;