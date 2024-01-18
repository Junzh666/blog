import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Cheny的博客",
  description: " Cheny的工作记录及个人博客",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
