
<div class="header">
    <div class="pull-left appicon"><img src="{{iconurl}}"></div>
    <div class="release-info">
        <span class="version">{{version}} (Build {{build}})</span>
    </div>
    <div class="appname"><input type="text" id="nameInput" value="{{appname}}"></div>
</div>
<hr>
<div class="release-body">
    <div class="field">
        <label for="newReleaseChangelog">更新日志</label>
        <textarea id="newReleaseChangelog"></textarea>
    </div>
</div>
<div class="action">
    <button data-event="click:uploadEdit"><i class="icon-upload-cloud2"></i> 上传新版本</button>
    <p class="upload-failed-tips app-hide">上传失败，请重试</p>
</div>