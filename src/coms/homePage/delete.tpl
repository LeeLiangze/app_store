<div class="delete-app-mask dialog-mask">
    <div class="delete-app-notice-modal dialog-modal ng-scope ">
        <div class="delete-suc">
            <h4 class="title ng-binding">删除应用：{{appname}}</h4>
            <div class="contents ng-binding">删除后不可恢复，请谨慎操作</div>
        </div>
        <div class="delete-error">删除失败，请稍后重试！</div>
        <div class="actions">
            <div class="delete-suc">
                <button class="btn btn-link " data-event="click:cancelDelete">取消</button> 
                <button class="btn btn-blue btn-{{id}}" data-event="click:doDelete">确认删除</button>
            </div>
            <button class="btn btn-blue btn-{{id}} delete-close" data-event="click:delclose">关闭</button>
        </div>
    </div>
</div>