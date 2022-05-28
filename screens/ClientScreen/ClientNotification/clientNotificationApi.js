const getNotificationList = async (clientId, pageId, callback, errorCallback) => {
    const url = ('http://hostel0tdtd.herokuapp.com/client/')
                    .concat(String(clientId))
                    .concat('/notification/page/')
                    .concat(String(pageId));
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 200){
        const json = await response.json();
        callback(json)
    }
    else {
        errorCallback()
    }
}

const getNotificationDetail = async (clientId, notiId, callback) => {
    const url = ('http://hostel0tdtd.herokuapp.com/client/')
                    .concat(String(clientId))
                    .concat('/notification/')
                    .concat(String(notiId));
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    if (response.status == 200){
        const json = await response.json();
        callback(json);
    }
}

module.exports = {
    getNotificationList: getNotificationList,
    getNotificationDetail: getNotificationDetail
}