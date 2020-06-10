# Transtribution
成绩发布平台 (Transcript distribution platform)

地址1： http://hyc.haotianshen.com/

地址2（with SSL）： https://grade-distribution.herokuapp.com/

一小时后将自动退出当前登陆账号。 除管理员账号外的密码不会进行hash以便确认管理。 

## 查询（家长或教师）： 

使用学生姓名（密码为学生身份证号后四位）或 教师账号（帐户名和密码提前告知）登录后查询。

## 上传（仅教师）：

使用管理员账号登录后， 上传->选择.xlsx结尾文件->上传。

## 成绩/学生账号批量删除：

使用管理员账号登陆 http://hyc.haotianshen.com/admin/ ，选择grades/students，勾选删除项， 在'go'下拉菜单中选择删除。 在删除确认页面点击确认即可。


You will be logged out automatically after 1h, currently no hashing applied to user password (a vulnerability to be taken care of later) except for admin user that is created with 'createsuperuser'.

## Grade lookup (for parents / teachers):

Use student name (password initialized as the last 4 digits of student's ID number), or use teachers' credential for grade lookup.

## Grade/Student management:

Login with admin account at http://hyc.haotianshen.com/admin/, choose grades/students, and manage from there. 

## 计划 TODO List:

- [ ]  网站上线 having a basic running site

- [x]  成绩打包邮件发送 email module (thread testing)

- [x]  更进一步的权限管理, 例如教师只能修改自己学生的成绩 (database redesigned)

- [x]  微信登陆 wechat login (currently blocked by not having a proper account, pls contact if you can help.)

- [x]  网页设计 UI improvement (low priority)



