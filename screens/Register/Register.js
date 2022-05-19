import React from 'react';
import RegisterContext from '../context/RegisterContext';
import RegisterTab from './tab';

function RegisterScreen () {
    const [name, setName] = React.useState('');
    const [isHost, setIsHost] = React.useState(true);
    const [hostelName, setHostelName] = React.useState('');
    const [hostelAddress, setHostelAddress] = React.useState('')
    const [phoneNum, setPhoneNum] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const Info = {
        Name: name,
        IsHost: isHost,
        HostelName: hostelName,
        HostelAddress: hostelAddress,
        PhoneNum: phoneNum,
        Username: username,
        Password: password,
        SetName: setName,
        SetIsHost: setIsHost,
        SetHostelName: setHostelName,
        SetHostelAddress: setHostelAddress,
        SetPhoneNum: setPhoneNum,
        SetUsername: setUsername,
        SetPassword: setPassword
    }
    return (
        <RegisterContext.Provider value={Info}>
            <RegisterTab style={{flex: 1}}></RegisterTab>
        </RegisterContext.Provider>
    )
}

export default RegisterScreen;