<div class="navbar-wrapper ng-scope">
    {{{[../header/header] this}}}
</div>
<div class="user_name" id="user_name">{{username}}</div>
<nav id="tabs">
    <ul>
        <li id="tabs_info" class="tab_selected" data-event="click:tabsInfo">
            <div class="icon icon_user"></div>
            <div class="text">个人资料</div>
        </li>
        <li id="tabs_pwd" class="" data-event="click:tabsPwd">
            <div class="icon icon_pwd"></div>
            <div class="text">修改密码</div>
        </li>
    </ul>
</nav>
<div class="user_box">

    <div id="user_input" style="left:0px;">
        <ul>
            <li class="user_email">
                <label for="user_email" class="label">邮箱</label>
                <div class="show_value">
                    <input type="text" name="user_email" value="{{email}}" readonly="">
                </div>
                <div class="icon_edit hide"></div>
            </li>
            <li class="input_edit user_tel ">
                <label for="tel_value">电话</label>
                <div class="show_value">
                    <input type="text" name="user_null" id="tel_showValue" value="{{pno}}" readonly="">
                </div>
                <div class="icon_edit" id="tel_icon"></div>
                <div class="edit_value hide">
                    <input class="" type="text" id="tel_value" value="{{pno}}">
                    <div class="btn tel_save" id="tel_save" data-event="click:telSave">保存</div>
                </div>
            </li>
            <li class="input_edit user_dep ">
                <label for="dep_value">部门</label>
                <div class="show_value">
                    <input type="text" id="dep_showValue" value="{{department}}" readonly="">
                </div>
                <div class="icon_edit" id="dep_icon"></div>
                <div class="edit_value hide">
                    <input class="" type="text" id="dep_value" placeholder="可选" value="{{department}}">
                    <div class="btn dep_save" id="dep_save" data-event="click:depSave">保存</div>
                </div>
            </li>
        </ul>

    </div>
    <div id="user_input_pwd" style="right:-500px;">
        <ul>
            <li>
                <input type="password" name="pwd_now" id="pwd_now" placeholder="当前密码">
            </li>
            <li>
                <input type="password" name="pwd_new" id="pwd_new" placeholder="新密码">
            </li>
            <li>
                <input type="password" name="pwd_again" id="pwd_again" placeholder="确认密码">
            </li>
        </ul>
        <div id="pwd_submit" class="pwd_submit" data-event="click:change">修改密码</div>
    </div>
</div>