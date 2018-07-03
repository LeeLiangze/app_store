<div class="container">
	<div class="left">
		<img src="img/download_pattern_left.png" />
	</div>
	<div id="main" class="main">
		<div class="top">
			<div class="logo">
				<img src={{iconurl}} />
			</div>
			<div class="qrcode">
				<img src={{qrcode}} />
			</div>
		</div>
		<h1 class="appname">
					<img src={{iconurl}} />
					<span>{{appname}}</span>
				</h1>
		<p class="scan-tip">扫描二维码下载<br>或用手机浏览器输入这个网址:&nbsp;&nbsp;<span class="text-black">{{downurl}}</span></p>
		<div class="release-info">
			<p><span itemprop="softwareVersion">{{version}} (Build {{bundleid}})
                - {{size}} MB</span></p>
			<p>更新于: <span itemprop="datePublished">{{updated_at}}</span></p>
		</div>
		<!--<div id="actions" class="actions type-android">
	<button data-event="click:addRecord">下载安装</button>
</div>-->
		<div class="store-section section">
			{{{loadButton}}}
		</div>
		<div class="desc-section section">
			<h2>应用描述</h2>
			<pre>【软件介绍】 {{description}}
</pre>
		</div>
	</div>
	<div class="right">
		<img src="img/download_pattern_right.png" />
	</div>
</div>
<div class="footer-wrapper"></div>