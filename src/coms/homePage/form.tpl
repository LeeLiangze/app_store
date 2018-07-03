<div>
    <div class="state-form">
        <div class="header">
            <div class="pull-left appicon">
                <img width="100" height="100" class="ng-isolate-scope" src="{{iconurl}}">
            </div>
            <div class="release-info">
                <span class="version ng-binding">{{version}} (Build {{build}})</span> &nbsp;&nbsp;&nbsp;&nbsp; 
                <span class="release-type" ng-hide="AppUploader.release.type == 'android'">
                    <span translate="" class="ng-scope"></span>
                    <span ng-show=" AppUploader.release.release_type=='adhoc'" class="ng-binding ng-hide">- 个 UDID</span>
                </span>
            </div>
            <div class="appname">
                <input type="text" value="{{appname}}" class="ng-pristine ng-untouched ng-valid name-input">
            </div>
        </div>
        <hr>
        <div class="release-body">
            <div class="field">
                <label for="" translate="APP_CHANGELOG" class="ng-scope">更新日志</label>
                <textarea id="newReleaseChangelog" class="ng-pristine ng-untouched ng-valid description"></textarea>
            </div>
        </div>
        <div class="action">
            <button class="save" data-event="click:save">
                <i class="icon-upload-cloud2"></i> 提交
            </button>
            <p class="upload-failed-tips ng-scope ng-hide" data-event="click:failClose">上传失败，请稍后重试！</p>
        </div>
    </div>
</div>