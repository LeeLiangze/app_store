<div class="navbar-wrapper ng-scope">
      {{{[../header/header] this}}}
</div>
<div class="ng-scope">
    <div id="modal" class="upload-modal-mask ng-scope ng-hide"></div>
    <div id="message" class="upload-modal-container ng-scope hidden">
        <div class="flip-container">
            <div class="upload-modal">
                <div class="btn-close" data-event="click:close">
                    <i class="icon-cross"></i>
                </div>
                <div class="state-parsing ng-hide">
                    <img src="./img/cmcc_loading_lg.gif" class="loading">
                    <p class="uploading">正在解析....</p>
                    <div class="parse-error-content ng-hide">
                        <h3 class="ng-scope">上传失败，请稍后重试！</h3>
                        <p translate="" class="ng-scope"></p>
                        <div class="action">
                            <button data-event="click:btnclose">关闭</button>
                        </div>
                    </div>
                </div>
                <div class="modal-form"></div>
            </div>
        </div>
    </div>
</div>
<section class="ng-scope">
    <div class="page-apps ng-scope">
        <div class="middle-wrapper container-fluid">
            <div class="apps row">
                <upload-card class="components-upload-card col-xs-4 col-sm-4 col-md-4 app-animator" style="display:block">
                    <div class="card text-center">
                        <div class="dashed-space">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <i class="icon-upload-cloud2"></i>
                                            <div class="text drag-state">
                                                <div>立即上传</div>
                                                <input id="uploadfile" name="package" type="file"   data-event="click:upload"/>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {{#if appList.length}}
                    <div id="uploadFirst" class="ng-hide upload-guied">
                    {{else}}
                    <div id="uploadFirst" class="upload-guied ng-show">
                    {{/if}}
                        <span class="ng-scope">在这里上传你的第一个应用</span>
                        <img src="./img/arrow.png">
                    </div>
                </upload-card>
                <div class="applist">
                    {{#if appList.length}}
                    {{#each appList}}
                    {{{[./getList] this}}}
                    {{/each}}
                    {{/if}}
                </div>
            </div>
        </div>
    </div>
</section>
<div class="footer-wrapper"></div>
<div class="modal-delete"></div>
    