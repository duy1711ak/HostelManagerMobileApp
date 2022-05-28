const getNotificationList = async (hostId, pageId, callback) => {
    const url = ('http://hostel0tdtd.herokuapp.com/host/')
                    .concat(String(hostId))
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
}

const postNotification = async (hostId, subject, content, callback) => {
    const url = ('http://hostel0tdtd.herokuapp.com/host/')
                    .concat(String(hostId))
                    .concat('/notification');
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            subject: subject,
            content: content
        })
    });
    if (response.status == 200){
        const json = await response.json();
        callback(json)
    }
}

const getNotificationDetail = async (hostId, notiId, callback) => {
    const url = ('http://hostel0tdtd.herokuapp.com/host/')
                    .concat(String(hostId))
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
    postNotification: postNotification,
    getNotificationDetail: getNotificationDetail
}