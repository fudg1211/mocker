//popup.html操作
(function(){
    var bg = chrome.extension.getBackgroundPage();
    var $config = $('#config');
    var $saveBtn = $('#saveBtn');
    var $startBtn = $('#startBtn');
    var config = bg.getConfig() || '{ "urls": [ "test.api.hipac.cn" ], "token": "NaSPH2pTQPkF8yzh1530770117179", "origin": "wemock.cn", "page": "hipac.cn", "record":false }';

    if(config){
        $config.val(js_beautify(config));
    }


    if(bg.getStatus()){
        $startBtn.text('停止');
        chrome.browserAction.setIcon({path: "imgs/icons/icon-48-1.png"});
    }else{
        chrome.browserAction.setIcon({path: "imgs/icons/icon-48.png"});
    }

    $saveBtn.on('click',function(){
        var config = $config.val();
        config = config.replace(/\n/g,'').replace(/\s/g,'');
        try{
            JSON.parse(config);
        }catch (e) {
            new Kub.Dialog("配置解析错误，请使用标准json");
        }
        bg.saveConfig(config);
    });

    $startBtn.on('click',function(){
        var val = $startBtn.text();

        if(val==='开始'){
            bg.saveStatus(1);
            $startBtn.text('停止');
            chrome.browserAction.setIcon({path: "imgs/icons/icon-48-1.png"});
        }else{
            bg.saveStatus();
            $startBtn.text('开始');
            chrome.browserAction.setIcon({path: "imgs/icons/icon-48.png"});
        }
    })
}());