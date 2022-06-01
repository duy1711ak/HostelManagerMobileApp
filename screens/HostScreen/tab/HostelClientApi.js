const getClientList = async (hostId, callback) => {
    try {
        const url = 'https://hostel0tdtd.herokuapp.com/host/'.concat(String(hostId)).concat('/clients');
        const response = await fetch(url ,{
            method : 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const status = response.status;
        if (status == 200){
            const json = await response.json();
            const list =await json.list.sort( (a, b) => (a.roomName).localeCompare(b.roomName));
            callback(list);
        }
        else {
            callback([])
        }
    }
    catch (error) {
    }
}

const addClient= async (hostId, rname, uid, phoneNum, callback, errCallback) => {
    try {
        const url = 'https://hostel0tdtd.herokuapp.com/host/'.concat(String(hostId)).concat('/clients');
        const response = await fetch(url ,{
            method : 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                clientId: uid,
                roomName: rname,
                phoneNum: phoneNum
            })
        })
        const status = response.status;
        if (status == 200){
            callback()
        }
        else {
            const json = await response.json();
            errCallback(json.message)
        }
    }
    catch (error) {
    }
}

const deleteClient= async (hostId, uId, callback, errCallback) => {
    try {
        const url = 'https://hostel0tdtd.herokuapp.com/host/'.concat(String(hostId)).concat('/clients/').concat(String(uId));
        const response = await fetch(url ,{
            method : 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const status = response.status;
        if (status == 200){
            callback()
        }
        else {
            errCallback('Delete failed!')
        }
    }
    catch (error) {
    }
}

module.exports= {
    getClientList: getClientList,
    addClient: addClient,
    deleteClient: deleteClient
}