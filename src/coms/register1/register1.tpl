 <div id="indexImg">
        <a href="register.html"> <img src="img/logo.png" alt="首页"> </a>
</div>
 <div id="title"><span>注册</span></div>
 <div id="warning" class="nowar"><ul><li id="warText"></li></ul></div>
 <input type="text" id="email" name="username" placeholder="邮箱"></input>
 <input type="password" id="userId" name="password" placeholder="密码"></input>
 <div id="ff">
 <img id="imgPass" src="{{BASE_URL}}appdist/imgVerification" data-event="click:imgClick">
 <input type="text" id="imgPassword" placeholder="验证码"></input>
 </div>
 <a id="registerBtn" data-event="click:regists">注册</a>
 <a id="loginBtn" data-event="click:loginBtn">我是老用户，要登陆</a>