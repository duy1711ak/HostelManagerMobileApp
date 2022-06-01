const getClientInfo = async (id, callback, errCallback) => {
    try {
        const url = 'https://hostel0tdtd.herokuapp.com/client/'.concat(String(id)).concat('/info');
        const response = await fetch(url,{
            method : 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const status = response.status;
        if (status == 200){
            const json = await response.json();
            callback(json);
        }
        else{
            errCallback()
        }
    }
    catch (error) {
    }
}

const leaveCurrentHostel= async (id, callback) => {
    try {
        const url = 'https://hostel0tdtd.herokuapp.com/client/'.concat(String(id)).concat('/info');
        const response = await fetch(url,{
            method : 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const status = response.status;
        if (status == 200){
            callback();
        }
    }
    catch (error) {
    }
}

module.exports = {
    getClientInfo: getClientInfo,
    leaveCurrentHostel: leaveCurrentHostel
}