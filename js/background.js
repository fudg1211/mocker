var handel = {
    ajax: function (msg) {
        var data = msg.data;
        if (data.contentType === 'multipart/form-data' && Object.keys(data.data).length) {
            let formdata = new FormData();
            Object.keys(data.data).forEach((key) => {
                formdata.append(key, data.data[key]);
            });
            data.data = formdata;
        }

        try {
            var xmlhttp = $.ajax({
                url: data.url,
                contentType: data.contentType,
                data: data.data,
                type: data.method,
                headers: data.headers,
                async: false,
                success: function (res) {
                    msg.cb && msg.cb({data: res, url: arguments[2].responseURL});
                },
                error: function (msg) {
                    msg.cbError && msg.cbError(msg);
                }
            })
        } catch (e) {
            msg.cbError(e);
        }
    }
};


chrome.runtime.onMessageExternal.addListener(function (msg, sender, sendResponse) {
    if (msg.type === 'apiAgent') {
        msg.cb = function (res) {
            sendResponse(res);
        };
        msg.cbError = function (res) {
            sendResponse(res);
        };
        handel.ajax(msg);
    }
});

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.type==='background.js:getConfig'){
            sendResponse(getConfig());
        }

        if(request.type==='background.js:getStatus'){
            sendResponse(getStatus());
        }
    }
);


var saveConfig = function (config) {
    window.localStorage.setItem('config', config);
};

var getConfig = function () {
    return window.localStorage.getItem('config');
};

var saveStatus = function (status) {
    return window.localStorage.setItem('status', status);
};

var getStatus = function () {
    var status = window.localStorage.getItem('status');
    if (status && status !== '0') {
        return Number(status);
    } else {
        return '';
    }
};







