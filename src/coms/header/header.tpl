
<div class="appdist-header">
    <div class="navbar clearfix">
        <a class="logoLink" href="./homePage.html">
            <img src="./img/logo.png">
        </a>
        <ul class="site-nav list-inline">
            <li>{{user.username}}，您好</li>
            <li><a href="./homePage.html">应用管理</a></li>
            <li><a href="./userCenter.html?id={{user.id}}">个人资料</a></li>
            <li><a data-event="click:logout">退出</a></li>
        </ul>
    </div>
</div>