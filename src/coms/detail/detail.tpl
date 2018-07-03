{{{[../header/header] this}}}

<div id="uploadwarp" class="app-hide">
    <div class="upload-modal-mask"></div>
    <div class="upload-modal-container">
        <div class="flip-container">
            <div class="upload-modal state-form">
                <div class="btn-close" data-event="click:closeUpnload"><i class="icon-cross"></i></div>
                <div class="error-row"><div></div></div>
                <div class="state-parsing">
                    <img class="app-spinner" src="./img/cmcc_loading_lg.gif" />
                    <p>正在解析....</p>
                    <div class="parse-error-content app-hide">
                        <h3>解析失败</h3>
                        <p></p>
                        <div class="action"><button data-event="click:closeUpnload">关闭</button></div>
                    </div>
                </div>
                <div id="stateForm" class="state-form"></div>
            </div>
        </div>
    </div>
</div>
<!-- upload end -->
<section>
    <div id="page-app" class="page-app app-activities">
        <div class="banner">
            <div class="middle-wrapper clearfix">
                <div class="pull-left icon-container" data-event="click:hashClear">
                    <div class="appicon"><img src="{{iconurl}}"></div>
                    <div class="appicon-title">{{appname}}</div>
                </div>
                <div class="badges">
                    {{#if downurl}}
                    <span class="short">{{downurl}}</span>
                    {{/if}}
                    {{#if platform}}
                    <span class="apptype">{{platform}}</span>
                    {{/if}}
                    {{#if packagename}}
                    <span class="bundleid">PackageName<b>{{packagename}}</b></span>
                    {{/if}}
                    {{#if bundleid}}
                    <span class="bundleid">bundleId<b>{{bundleid}}</b></span>
                    {{/if}}
                </div>
                <div class="actions">
                    <div class="upload fade in">
                        <i class="icon-upload-cloud2" ></i> 上传新版本
                        <input id="uploadApp" type="file" class="app-fileupload" data-event="click:uploadFile" />
                    </div> 
                    <a class="download" href="./downloadPage.html?id={{id}}" target="_blank"><i class="icon-eye"></i> 预览</a>
                </div>
                <div class="tabs-container">
                    <ul id="toggle-active" class="list-inline">
                        <li><a data-event="click:hashChange" data-hash="#info"><i class="icon-file"></i> 基本信息</a></li>
                        <li><a data-event="click:hashChange" data-hash="#security"><i class="icon-user-access"></i> 权限控制</a></li>
                        <li><a data-event="click:hashChange" data-hash="#combo"><i class="icon-combo"></i> 应用合并</a></li>
                        <li><a data-event="click:hashChange" data-hash="#statistics"><i class="icon-statistics"></i> 高级统计</a></li>
                        <li><a data-event="click:hashChange" data-hash="#integration"><i class="icon-box"></i> 集成</a></li>
                    </ul>
                </div>
            </div>
        </div><!-- banner end -->
        <div id="app-scope"></div>
    </div>
</section><!-- body end -->

<div class="footer-wrapper"></div><!-- footer end -->