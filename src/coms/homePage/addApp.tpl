 <div id="appList-{{id}}" class="appcard col-xs-4 col-sm-4 col-md-4 app-animator ng-scope">
    <div class="card app card-{{platform}}">
        <i class="type-icon icon-{{platform}}"></i>
        <div class="type-mark"></div>
        <a class="appicon" href="./detail.html?id={{id}}">
            <img class="icon ng-isolate-scope" app-icon="app.icon_url" width="100" height="100" src="{{iconurl}}">
        </a><br>
        <p class="appname">
            <a class="appTitle" href="./detail.html?id={{id}}">
                <i class="icon-owner" ></i> 
                <span class="app-name">{{appname}}</span>
            </a> 
        </p>
        <table>
            <tbody>
                <tr>
                    <td class="ng-binding">Size:</td>
                    <td><span class="ng-binding">{{size}} MB</span></td>
                </tr>
                <tr>
                    <td class="ng-binding">PackageName:</td>
                    <td><span class="ng-binding">{{packagename}}</span></td>
                </tr>
                <tr>
                    <td class="ng-binding">最新版本:</td>
                    <td><span class="ng-binding">{{version}} ( Build {{build}} )</span></td>
                </tr>
            </tbody>
        </table>
        <div class="action">
            <a class="ng-binding edit-{{id}}" href="./detail.html?id={{id}}"><i class="icon-pen"></i> 编辑</a>
            <a href="./downloadPage.html?id={{id}}" target="_blank" rel="noopener" class="ng-binding preveiw-{{id}}"><i class="icon-eye"></i> 预览</a>
            <button class="btn btn-remove ng-scope delete-{{id}}" data-event="click:delete"><i class="icon icon-trash"></i></button>
        </div>
    </div>
</div>