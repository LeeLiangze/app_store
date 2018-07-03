	<div id="indexImg">
        <a href="login.html"> <img src="img/logo.png" alt="首页"> </a>
    </div>
 	<div id="title"><span>登录</span></div>
	<div id="warning"><ul><li id="warText"></li></ul></div>
 	<input type="text" id="userName" placeholder="邮箱"></input>
 	<input type="password" id="userId" placeholder="密码"></input>
 	<div id="ff">
 	<img id="imgPass" src="{{BASE_URL}}appdist/imgVerification" data-event="click:imgClick">
 	<input type="text" id="imgPassword" placeholder="验证码"></input>
 	</div>
 	<a id="loginBtn" data-event="click:logins">登录</a>
 	<a id="registerBtn" data-event="click:regists">注册</a>