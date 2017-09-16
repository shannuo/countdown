var init = {
		nums:20,										// 倒计时时间
		testError:'手机号填写错误！',						// 手机号检测不通过
		codeError:'验证码发送失败！',						// 验证码发送失败
		codeSuccess:'验证码发送成功啦，看到就在这填写哦~',		// 验证码发送成功
		disableClick:'先把手机号填正确好吗0.0',				// 手机号未通过点击发送验证码
		sendingClick:'再等等哦，很快就能收到了~',				// 倒计时未结束点击发送验证码		
		codeNullError:'验证码不能为空！',					// 未填写验证码登录
		phoneNullError:'手机号不能为空！',					// 未填写手机号登录
		codeTestError:'验证码格式应为6位数字哦~'	,			//验证码检测不通过
		loginError:'还不可以点哦~',						//登录按钮不可用时点击
		loginSuccess:'登录成功！'							//登陆成功提示
	};
	
export default init;