export const https = (opts: any) => {
    var xhr = new XMLHttpRequest(),
        type = opts.type || 'GET',
        url = opts.url,
        params = opts.data,
        dataType = opts.dataType || 'json';

    type = type.toUpperCase();

    if (type === 'GET') {
        const getparams = (function (obj) {
            var str = '';

            for (var prop in obj) {
                str += prop + '=' + obj[prop] + '&'
            }
            str = str.slice(0, str.length - 1);
            return str;
        })(opts.data);
        url += url.indexOf('?') === -1 ? '?' + getparams : '&' + getparams;
    }

    xhr.open(type, url);
    if (opts.contentType) {
        xhr.setRequestHeader('Content-type', opts.contentType);
    }
    try {
        xhr.send(params ? params : null);
    } catch (e) {

    }
    //return promise
    return new Promise(function (resolve, reject) {
        xhr.onload = function () {
            if (xhr.status === 200) {
                var result;
                try {
                    result = JSON.parse(xhr.response);
                } catch (e) {
                    result = xhr.response;
                }
                resolve(result);
            } else {
                reject(xhr.response);
            }
        };
    });
}