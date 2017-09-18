## 验证码登录组件（包含一个倒计时按钮组件）

一个倒计时短信验证码登录的React组件。

### 在线演示地址

[Countdown Button](http://dengshushan.com/countdown/build/)

预览:

![preview-img](http://7xle3b.com1.z0.glb.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-09-16%20%E4%B8%8B%E5%8D%887.20.20.png)

Demo 演示:（多出的两个小方条和花掉的鼠标是录制的原因）

![preview](http://7xle3b.com1.z0.glb.clouddn.com/video.gif)

### 功能

#### 分离的倒计时按钮

你可以只使用倒计时按钮而不使用登录组件。

#### 自定义文案

你可以设置倒计时时间并自定义提示内容。

#### 输入内容验证

用户输入的手机号与验证码都会进行格式验证。

#### 多状态按钮

发送验证码以及登录按钮均有多种状态，在可使用状态下才允许点击

#### 按钮倒计时

点击发送验证码按钮，会进行倒计时，倒计时期间按钮以及手机号输入框均不可用。

#### 重置机制

当倒计时结束或发送验证码失败或者登录成功，按钮状态将会重置。

#### 提示动画

提示框将以动画的形式出现。

#### 响应式布局

实现响应式布局，手机上看会有一点不同哦~

### 依赖

- react
- react-dom
- react-scripts
- react-test-renderer
- bootstrap
- enzyme

### 安装
    	
下载或者克隆项目：

	git clone https://github.com/shannuo/countdown.git

进入项目目录：

	cd countdown
	
运行 Demo：

	npm start

### 使用

#### 使用整个登录组件

 方法 1：
 
在需要使用组件的地方加入：

```javascript
    	
< App init = {	nums:20,												// 倒计时时间
		testError:'手机号填写错误！',										// 手机号检测不通过
		codeError:'验证码发送失败！',									// 验证码发送失败
		codeSuccess:'验证码发送成功啦，看到就在这填写哦~',				// 验证码发送成功
		disableClick:'先把手机号填正确好吗0.0',							// 手机号未通过点击发送验证码
		sendingClick:'再等等哦，很快就能收到了~',						// 倒计时未结束点击发送验证码		
		codeNullError:'验证码不能为空！',								// 未填写验证码登录
		phoneNullError:'手机号不能为空！',								// 未填写手机号登录
		codeTestError:'验证码格式应为6位数字哦~'	,					// 验证码检测不通过
		loginError:'还不可以点哦~',										// 登录按钮不可用时点击
		loginSuccess:'登录成功！'										// 登陆成功提示}
/>
	 
```

方法 2：

1. 修改项目中`./src/Config.js` 文件中对应值
2. 引入
		
		import init from './Config';
	     <App init={init} />

#### 使用Countdown组件

使用样本：

```javascript

<Countdown 
	ref="countdown" 
	status='sending' 
	nums='60' 
	sendCode={function(){}} 
	callback={function(){}} 
	disableClick='请正确填写手机号' 
	sendingClick='正在发送，请耐心等待' 
/> 

```
属性说明：

ref：设置一个ref属性name，name类型为字符串，你可以使用this.refs.name.resetButton()使按钮状态重置。你可以在发送验证码失败的情况下使用这个功能。

status：按钮的状态，有三个值：‘disable’,'able','sending‘，类型为字符串。当按钮不满足可以点击的要求（如：手机号验证不通过）时，可设置按钮状态为’disable‘；当按钮可以点击时应设置按钮状态为’able‘；点击可点击状态下的按钮，按钮内部state的状态会变为’sending‘并开始倒计时，倒计时结束后按钮状态会重置，如果你直接设置按钮状态为’sending‘，那么它只是一个不可用按钮，不会倒计时。
你可以将status值设置为父组件state中的属性值，让按钮状态随父组件状态改变而改变。

nums：设置一个不变的正整数作为倒计时时长。

sendCode：点击按钮后执行的函数，它可以是一个异步请求（如：请求后端发送验证码，并在发送错误时手动调用按钮的重置功能），也可以是其他操作。如果你不需要，请传入一个空函数。

callback：按钮提示信息或状态改变后将通过这个函数通知父组件改变后的提示信息和状态，你可以通过这个函数让父组件与按钮组件状态同步或显示提示信息。如果你不需要，请传入一个空函数。

disableClick：类型为字符串的提示信息，这条信息将用于用户点击’disable‘状态的按钮。

sendingClick：类型为字符串的提示信息，这条信息将用于用户点击’sending‘状态的按钮。

### 测试

自动化测试：

	npm test

#### 初始化测试

测试结果：发送验证码以及登录按钮不可用

#### 手机输入框测试

1.输入:正确手机号

测试结果：发送验证码按钮变为可用状态

2.输入：错误手机号

测试结果：发送验证码按钮不可用，点击输入验证码框提示手机号输入错误

3.输入：正确输入手机号后点击发送验证码

测试结果：发送验证码按钮倒计时，按钮状态为发送中，手机号输入框不可使用

#### 发送验证码按钮点击测试

1.输入：手机号输入错误并点击发送验证码按钮（按钮不可用时点击）

测试结果：提示请正确填写手机号

2.输入：手机号正确填写并发送验证码（按钮可用时点击）

测试结果：发送验证码按钮状态改为发送中并开始倒计时，10s后提示发送成功或发送失败，发送失败或倒计时结束按钮会重置

3.输入：发送验证码按钮倒计时中点击

测试结果：提示再等等就能收到了哦

#### 登录按钮点击测试

1.输入：手机号为空时点击登录按钮

测试结果：提示手机号不能为空

2.输入：登录按钮不可点击状态点击

测试结果：提示现在还不能点哦

3.输入：验证码发送成功后未填写验证码点击登录按钮

测试结果：提示验证码不能为空

4.输入：验证码发送成功后未正确填写验证码点击登录按钮

测试结果：提示验证码应为6为整数

5.输入：验证码发送成功后正确填写验证码点击登录按钮

测试结果：提示登录成功

### 联系我

Email: dengshushan@qq.com


# English Version（incomplete）

## Countdown Component
### Description
A React countdown component.

### Online Demo

[Countdown Button](http://dengshushan.com/countdown/build/)

Preview:

![preview-img](http://7xle3b.com1.z0.glb.clouddn.com/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202017-09-16%20%E4%B8%8B%E5%8D%887.20.20.png)

Demo usage:

![preview](http://7xle3b.com1.z0.glb.clouddn.com/video.gif)
### Feathers

#### Customize Content

You can set the Countdown time, such as 60s or 90s, and you can customize the alert content.

#### Verification

The user input content will be verified at the front end.

#### Multi status button

The Button has Multi status and only be allowed clicked at the right status.

#### Countdown

After click the button, it will start counting. At the same time all the input area can't be used.


#### Reset mechanism

After the countdown finished, fail or success login, the button's status will be reset.

#### Prompt animation

The prompt box will appear with animation.

#### Dependency

- react
- react-dom
- react-scripts
- react-test-renderer
- bootstrap
- enzyme

### Install
    	
Download or clone the project:

	git clone https://github.com/shannuo/countdown.git

Cd the project

	cd countdown
Run the  Demo:

	npm start

### Usage

#### Method 1
Add in the place you need the button：

```javascript
    	
< App init = {	nums:20,												// 倒计时时间
		testError:'手机号填写错误！',										// 手机号检测不通过
		codeError:'验证码发送失败！',									// 验证码发送失败
		codeSuccess:'验证码发送成功啦，看到就在这填写哦~',				// 验证码发送成功
		disableClick:'先把手机号填正确好吗0.0',							// 手机号未通过点击发送验证码
		sendingClick:'再等等哦，很快就能收到了~',						// 倒计时未结束点击发送验证码		
		codeNullError:'验证码不能为空！',								// 未填写验证码登录
		phoneNullError:'手机号不能为空！',								// 未填写手机号登录
		codeTestError:'验证码格式应为6位数字哦~'	,					// 验证码检测不通过
		loginError:'还不可以点哦~',										// 登录按钮不可用时点击
		loginSuccess:'登录成功！'										// 登陆成功提示}
/>
	 
```

#### Method 2

1. Modify the project file `./src/Config.js` 
2. Import
		
		import init from './Config';
	     <App init={init} />

### Test
	
	npm test

### Contact

Email: dengshushan@qq.com



