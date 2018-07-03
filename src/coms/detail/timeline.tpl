<div class="page-app-activities page-tabcontent">
    <div class="middle-wrapper">
        <ul class="list-unstyled time-line">
            {{#each this}}
            <li>
                <div class="directive-view-release">
                    <i class="icon-upload-cloud2" data-appId={{id}}></i>
                    <b>{{version}} {{#if build}}(Build {{build}}){{/if}}</b>
                    <div class="release-metainfo">
                        <small>
                            <i class="icon-calendar"></i> 
                            <span>{{[./formatDate] updated_at}}</span>
                        </small>
                    </div>
                    <pre class="app-edited">{{description}}</pre>
                    <textarea class="app-editing app-hide" placeholder={{description}}></textarea>
                    <div class="release-actions editing app-editing app-hide">
                        <button class="btn-cancel" data-event="click:endEdit">取消</button>
                        <button class="btn-save" data-event="click:subEdit">保存</button>
                    </div>
                    <div class="release-actions app-edited">
                        <button data-event="click:startEdit" tooltip="编辑更新日志" class="tooltip-top"><i class="icon-pen"></i></button>
                        <button class="tooltip-top" tooltip="原文件大小">
                            <i class="icon-box"></i>
                            <span>{{size}} MB</span>
                        </button>
                        <a href="./downloadPage.html?id={{id}}" target="_blank"><i class="icon-eye"></i> <span>预览</span></a>
                    </div>
                </div>
            </li>
            {{/each}}
        </ul>
    </div>
</div>