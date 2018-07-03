<div class="page-tabcontent apps-app-info">
    <div class="middle-wrapper" ng-show="activitiesReady">
        <form class="app-info-form" name="appInfoForm">
            <div class="field app-id">
                <div class="left-label">应用 ID</div>
                <div class="value"><input readonly="readonly" value="{{id}}"></div>
            </div>
            <hr>
            <div class="field app-name">
                <div class="left-label">应用名称</div>
                <div class="value"><input type="text" class="appname" value="{{appname}}" data-event="keyup:edit"></div>
            </div>
            <div class="field app-id">
                <div class="left-label">应用描述</div>
                <div class="value"><textarea class="form-control" data-event="keyup:edit">{{description}}</textarea></div>
            </div>
            <div class="field actions">
                <div class="value info-btns">
                    <button type="button" class="save" disabled="disabled" data-event="click:editSave">保存</button>
                    <button type="button" class="cancel app-hide" data-event="click:cancel">取消</button>
                </div>
                <div class="value app-hide sucMes">
                    <p>应用信息更新失败...</p>
                </div>
            </div>
        </form>
    </div>
</div>