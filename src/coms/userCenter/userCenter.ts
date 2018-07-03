import Component from '@cmos/web/Component';
import { get, post, put } from '@cmos/web/request';
import { queryToObj } from '@cmos/web/url';

const template = require('./coms/userCenter/userCenter.tpl');

export default class userCenter extends Component {
    constructor(el: string) {
        super({ el, template });
    }
    beforeRender() {
        // 用户中心
        const id = queryToObj().id;
        if (!id) {
            alert('请登录');
            window.location.href = 'login.html';
        }
        return get(`./appdist/userCenter/${id}`, {}).then(
            ({ data }) => {
                const datas:any = data.beans;
                datas.user = datas;
                return datas;
            }, (data) => {
                if (data == '请登录') {
                    alert('登录超时，请重新登录');
                    window.location.href = 'login.html';
                } else {
                    window.location.href = '404.html';
                }
            }
        )
    }
    afterRender() {
        this.clickChange('tel');
        this.clickChange('dep');
    }
    //获取id
    $id(id: any) { return (<HTMLInputElement>document.getElementById(id)); }
    //添加类
    addClass(obj: any, Class: string) { obj.setAttribute("class", obj.getAttribute("class") + " " + Class); }
    //删除/替换类
    repClass(obj: any, Class1: string, Class2?: string) { obj.setAttribute("class", obj.getAttribute("class").replace(Class1, Class2 || '')); }
    //改变点击/保存按钮的状态
    clickChange(select: string) {
        let that = this;
        this.$id(select + '_icon').onclick = function () {
            that.addClass(this.parentNode, 'now_edit');
            const thatDom:any = that.$id(select + '_value');
            thatDom.focus();
            if(thatDom.setSelectionRange) thatDom.setSelectionRange(0,thatDom.value.length);
        }
    }
    //点击保存按钮时执行的公共方法
    clickSave(select: 'tel' | 'dep', value: string) {
        //和数据库中的字段相对应。
        let mySqlConfig = {
            'tel': 'pno',
            'dep': 'department'
        }
        let mysqlSel: any = mySqlConfig[select];
        this.data[mysqlSel] = value;
        put(`./appdist/userUpdate`, { data: this.data }).then(
            ({ data }) => {
                let dataValue: any = data.beans[mysqlSel];
                if (dataValue) {
                    // 将后台返回的数据添加到页面中
                    this.$id(select + '_showValue').value = dataValue;
                }
            }, (data) => {
                if (data == '请登录') {
                    alert('登录超时，请重新登录');
                    window.location.href = 'login.html';
                } else {
                    window.location.href = '404.html';
                }
            }
        )
        this.repClass(this.$id(select + '_icon').parentNode, 'now_edit')
    }
    //点击保存手机号按钮
    onTelSave() {
        let value = this.$id('tel_value').value;
        if (!value.match(/^1[34578]\d{9}$/)) {
            alert('手机号输入错误');
            return;
        }
        this.clickSave('tel', value);
    }
    // 点击保存部门按钮
    onDepSave() {
        let value = this.$id('dep_value').value;
        this.clickSave('dep', value);
    }
    // 点击修改密码按钮
    onChange() {
        const checkPwd:any = this.checkPwd();
        if(!checkPwd){return};
        this.data.pass =  checkPwd.pwdAgain;
        this.data.oldPass =  checkPwd.pwdNow;
        put(`./appdist/passUpdate`, { data: this.data }).then(
            ({ data }) => {
                const datas: any = data.beans;
                if (datas == '修改成功') alert('修改成功');
            }, (data) => {
                if (data == '原密码错误') {
                    alert('原密码错误');
                } else if (data == '请登录') {
                    alert('登录超时，请重新登录');
                    window.location.href = 'login.html';
                } else {
                    window.location.href = '404.html';
                }
            }
        )
    }
    //退出登录
    onLogout() {
        post(`./appdist/logout`, {}).then(({
                data
            }) => {
            var datas: any = data.beans;
            if (datas == "退出成功") {
                alert('退出成功');
                window.location.href = 'login.html';
            } else {
                alert('请重试');
            }
        })
    }
    // 点击切换到修改个人信息tab
    onTabsInfo() {
        const tabsInfo: any = this.$id('tabs_info');
        const tabsPwd: any = this.$id('tabs_pwd');
        const Info: any = this.$id('user_input');
        const Pwd: any = this.$id('user_input_pwd');
        //当点击自己时，啥都不干。
        if (tabsInfo.getAttribute("class").indexOf('tab_selected') != '-1') { return }
        this.addClass(tabsInfo, 'tab_selected');
        Info.setAttribute('style', 'left:0px;');
        Pwd.setAttribute('style', 'right:-500px;');
        this.repClass(tabsPwd, 'tab_selected');
    }
    // 点击切换到修改密码tab
    onTabsPwd() {
        const tabsInfo: any = this.$id('tabs_info');
        const tabsPwd: any = this.$id('tabs_pwd');
        const Info: any = this.$id('user_input');
        const Pwd: any = this.$id('user_input_pwd');
        //当点击自己时，啥都不干。
        if (tabsPwd.getAttribute("class").indexOf('tab_selected') != '-1') { return }
        this.addClass(tabsPwd, 'tab_selected');
        Info.setAttribute('style', 'left:-500px;');
        Pwd.setAttribute('style', 'right:0px;');
        this.repClass(tabsInfo, 'tab_selected');

    }
    // 密码验证公用方法
    checkPwd(){
        var pwdNow = this.$id('pwd_now').value;
        var pwdNew = this.$id('pwd_new').value;
        var pwdAgain = this.$id('pwd_again').value;
        if (pwdNow.match("[0-9a-z]{6,15}") == null) { alert("原密码为空或不规范"); return false; }
        if (pwdNew.match("[0-9a-z]{6,15}") == null) { alert("新密码为空或不规范"); return false; }
        if (pwdAgain.match("[0-9a-z]{6,15}") == null) { alert("确认密码为空或不规范"); return false; }
        if (pwdNew != pwdAgain) { alert('两次输入的密码不一致'); return false; }
        return {
            pwdNow:pwdNow,
            pwdAgain:pwdAgain
        };
    }

}



