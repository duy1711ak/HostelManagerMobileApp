const getRoomList = async (hostId, callback) => {
    try {
        const url = 'https://hostel0tdtd.herokuapp.com/host/'.concat(String(hostId)).concat('/rooms');
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
            callback(json.list)
        }
        else {
            callback([])
        }
    }
    catch (error) {
        console.log(error);
    }
}

const addRoom= async (hostId, rName, callback, errCallback) => {
    try {
        const url = 'https://hostel0tdtd.herokuapp.com/host/'.concat(String(hostId)).concat('/rooms');
        const response = await fetch(url ,{
            method : 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roomName: rName
            })
        })
        const status = response.status;
        if (status == 200){
            callback()
        }
        else {
            const json=await response.json()
            errCallback(json.message)
        }
    }
    catch (error) {
        console.log(error);
    }
}

const changeRoomName = async (hostId, roomId, newRoomName, callback, errCallback) => {
    try {
        const url = 'https://hostel0tdtd.herokuapp.com/host/'.concat(String(hostId)).concat('/rooms/').concat(String(roomId));
        const response = await fetch(url ,{
            method : 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roomName: newRoomName
            })
        })
        const status = response.status;
        if (status == 200){
            callback()
        }
        else {
            errCallback('Room name is exist. Change fail')
        }
    }
    catch (error) {
        console.log(error);
    }
}

const deleteRoom= async (hostId, roomId, callback, errCallback) => {
    try {
        const url = 'https://hostel0tdtd.herokuapp.com/host/'.concat(String(hostId)).concat('/rooms/').concat(String(roomId));
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
            const json = await response.json()
            errCallback(json.message)
        }
    }
    catch (error) {
        console.log(error);
    }
}

module.exports= {
    getRoomList: getRoomList,
    addRoom: addRoom,
    changeRoomName: changeRoomName,
    deleteRoom: deleteRoom
}