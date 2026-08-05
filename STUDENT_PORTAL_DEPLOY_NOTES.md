# Beecoming Student Portal 上线说明

本次新增页面：

- `/student_portal/index.html`
- `/assets/beecoming-portal/logo.png`

上线后访问地址：

- `https://www.beecoming.com/student_portal`

飞书登录说明：

- 官网页面只负责显示界面，不保存飞书密钥。
- 飞书登录和多维表读取仍由安全后台处理：
  `https://beecoming-student-portal.chaihuanzhen.chatgpt.site`
- 飞书应用后台的回调地址继续使用：
  `https://beecoming-student-portal.chaihuanzhen.chatgpt.site/api/auth/feishu/callback`

上传方式：

1. 把这个 `bee-wp-static` 文件夹里的改动上传到 GitHub 网站仓库。
2. 等网站自动发布完成后，打开 `https://www.beecoming.com/student_portal`。
3. 用飞书账号登录后，会回到 `https://www.beecoming.com/student_portal` 并读取绑定学生的课程和课外活动。

如果登录后提示账号未绑定，需要在飞书多维表的“账号绑定表”里补充这个飞书账号对应的学生。
