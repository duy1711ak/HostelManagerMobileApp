import React from 'react';
import { FlatList, Pressable, StyleSheet, View, Text, Modal, TextInput } from 'react-native';
import HeaderApp from '../../component/HeaderApp';
import checkValid from '../../component/CheckValid';
import { Picker } from "@react-native-picker/picker";

const general = require('../../../style')

const data = [
            {
                rid: '001',
                uid: 'C001',
                name: 'Duy1',
                phoneNum: '0397720433'
            },
            {
                rid: '001',
                uid: 'C002',
                name: 'Duy2',
                phoneNum: '2222222222'
            },
            {
                rid: '002',
                uid: 'C003',
                name: 'Duy3',
                phoneNum: '3333320433'
            }
    ,
    {
        rid: '003',
        uid: 'C004',
        name: 'Duy4',
        phoneNum: '444'
    },
    {
        rid: '003',
        uid: 'C005',
        name: 'Duy5',
        phoneNum: '555'
    },
    {
        rid: '003',
        uid: 'C006',
        name: 'Duy6',
        phoneNum: '666'
    }
]

function haveSpecialChar(str){
    const format = /[^A-Za-z0-9]/
    if (str.length == 0) return false;
    return format.test(str)
}

const array = data.reduce(
    (array, item)=>{
        if (array.indexOf(item.rid)>=0){
            return array;
        }
        else{
            array.push(item.rid);
            return array;
        }
    },
    new Array()
)

const Ctx = React.createContext()

export default function HostelClient({navigation}){
    const pickerRef = React.useRef();
    const addPickerRef = React.useRef();
    const [room, setRoom] = React.useState('');
    const roomList = array.map(
            (item) => {
                return <Picker.Item label={item} value={item} key={item}/>
            }
    )
    const [addModalvisible, setAddModalVisible] = React.useState(false);
    const [deleteModal, setDeleteModal] = React.useState({id: '', visible: false});
    const [roomId, setRoomId] = React.useState(array[0]);
    const [phoneNum, setPhoneNum] = React.useState('');
    const [uid, setUid] = React.useState('');
    const [popUp, setPopUp] = React.useState({visible: false, content: ''});
    const [phoneNumErr, setPhoneNumErr] = React.useState('');
    const [uidErr, setUidErr] = React.useState('');


    return (
        <Ctx.Provider value={{SetDeleteModal: setDeleteModal}}>
            <View style={styles.container}>
                <Modal
                    animationType='none'
                    transparent={true}
                    visible={addModalvisible}
                    onRequestClose={
                        () => {
                            setAddModalVisible(false)
                        }
                    }
                >
                    <View style={{
                        backgroundColor: '#0808086F',
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%'}}
                    >
                        <View style={styles.Modal}>
                            <View style={styles.ModalContent}>
                                <Text style={styles.ModalText}>Room name:</Text>
                                <Picker
                                    ref={addPickerRef}
                                    selectedValue={roomId}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setRoomId(itemValue)
                                    }}
                                    style={styles.dropdownlist}
                                >
                                    {roomList}
                                </Picker>
                                <Text style={styles.ModalText}>Phone number</Text>
                                <TextInput 
                                    style={styles.ModalTextInput}
                                    value={phoneNum}
                                    onChangeText={setPhoneNum}
                                    keyboardType='numeric'
                                ></TextInput>
                                <Text
                                    style={{
                                        color: 'red',
                                        fontSize: 12,
                                        fontWeight: '500',
                                    }}
                                >{phoneNumErr}</Text>
                                <Text style={styles.ModalText}>UID:</Text>
                                <TextInput 
                                    style={styles.ModalTextInput}
                                    value={uid}
                                    onChangeText={setUid}
                                ></TextInput>
                                <Text
                                    style={{
                                        color: 'red',
                                        fontSize: 12,
                                        fontWeight: '500',
                                    }}
                                >{uidErr}</Text>
                            </View>
                            <View style={styles.ModalBtView}>
                                <Pressable 
                                    style={styles.ModalBt}
                                    onPress={
                                        ()=>{
                                            setAddModalVisible(false)
                                        }
                                    }
                                >
                                    <Text style={styles.ModalBtText}>Cancel</Text>
                                </Pressable>
                                <Pressable 
                                    style={styles.ModalBt}
                                    onPress={
                                        () => {
                                            let isValid = true;
                                            isValid = checkValid(phoneNum, setPhoneNumErr);
                                            isValid = checkValid(uid, setUidErr);
                                            if (isValid) {
                                                setAddModalVisible(false)
                                                setPopUp({visible: true, content: 'Add client successfully'});
                                            }
                                        }
                                    }
                                >
                                    <Text style={styles.ModalBtText}>Confirm</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType='none'
                    transparent={true}
                    visible={deleteModal.visible}
                    onRequestClose={
                        () => {
                            setDeleteModal({id: '', visible: false})
                        }
                    }
                >
                    <View style={{
                        backgroundColor: '#0808086F',
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%'}}
                    >
                        <View style={styles.Modal}>
                            <Text>Do you want to delete client whose UID is {deleteModal.id} ?</Text>
                            <View style={styles.ModalBtView}>
                                <Pressable 
                                    style={styles.ModalBt}
                                    onPress={
                                        () => {
                                            setDeleteModal({id: '', visible: false})
                                        }
                                    }
                                >
                                    <Text style={styles.ModalBtText}>Cancel</Text>
                                </Pressable>
                                <Pressable 
                                    style={styles.ModalBt}
                                    onPress={
                                        () => {
                                            setDeleteModal({id:'', visible: false});
                                            setPopUp({visible: true, content: 'Delete successfully'})
                                        }
                                    }
                                >
                                    <Text style={styles.ModalBtText}>Confirm</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType='none'
                    transparent={true}
                    visible={popUp.visible}
                    onRequestClose={
                        () => {
                            setPopUp({visible: false, content: ''})
                        }
                    }
                >
                    <View style={{
                        backgroundColor: '#0808086F',
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%'}}
                    >
                        <View style={styles.Modal}>
                            <Text>{popUp.content}</Text>
                            <View style={{
                                width: '60%',
                                marginTop: 50,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Pressable 
                                    style={styles.ModalBt}
                                    onPress={
                                        () => {
                                            setPopUp({visible: false, content: ''})
                                        }
                                    }
                                >
                                    <Text style={styles.ModalBtText}>Ok</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <HeaderApp navigation={navigation}></HeaderApp>
                <View style={styles.headView}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text>Phòng: </Text>
                        <Picker
                            ref={pickerRef}
                            selectedValue={room}
                            onValueChange={(itemValue, itemIndex) => {
                                setRoom(itemValue)
                            }}
                            style={styles.dropdownlist}
                        >
                            <Picker.Item label="All" value=''/>
                            {roomList}
                        </Picker>
                    </View>
                    <Pressable
                        onPress={
                            () => {
                                setAddModalVisible(true)
                            }
                        }
                    >
                        <Text style={styles.bt}>Add</Text>
                    </Pressable>
                </View>
                <FlatList
                    data={data}
                    renderItem={
                        ({item}) => {
                            if (room === '') {
                                return <Client client={item}></Client>;
                            }
                            else {
                                if (item.rid === room) return <Client client={item}></Client>;
                                else return null;
                            }
                        }
                    }
                    style={{width: '90%'}}
                    showsVerticalScrollIndicator={false}
                ></FlatList>
            </View>
        </Ctx.Provider>
    )
}

function Client({client}){
    const modal = React.useContext(Ctx)
    return (
        <View style={styles.clientView}>
            <View style={{width: '90%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{width: '80%'}}>
                    <Text style={styles.clientText}>Room: {client.rid}</Text>
                    <Text style={styles.clientText}>Full name: {client.name}</Text>
                    <Text style={styles.clientText}>UID: {client.uid}</Text>
                    <Text style={styles.clientText}>Phone number: {client.phoneNum}</Text>
                </View>
                <Pressable
                    onPress={
                        () => {
                            modal.SetDeleteModal({id: client.uid, visible: true})
                        }
                    }
                >
                    <Text style={styles.bt}>Delete</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headView: {
        width: '90%',
        marginTop: 10,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#080808'
    },
    dropdownlist: {
        fontSize: general.smalltext,
        height: 20,
        width: 120,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 20,
        backgroundColor: general.backgroundColor,
        paddingLeft: 10
    },
    bt : {
        fontSize: general.smalltext,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 20,
        padding: 10
    },
    clientView: {
        backgroundColor: general.backgroundColor,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        padding: 20,
        borderRadius: 15,
        flexDirection: 'row'
    },
    clientText: {
        fontSize: general.smalltext,
        fontWeight: '600',
        margin: 10
    },
    deleteBt: {
        padding: 12,
        fontSize: general.smalltext,
        fontWeight: '600',
        color: general.primary1,
        borderColor: general.primary1,
        borderRadius:10,
        backgroundColor: '#ffffff'
    },
    Modal: {
        backgroundColor: general.popUp,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        height: '60%',
        width: '90%',
        marginTop: '20%',
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 20
    },
    ModalContent: {
        width: 240,
        alignItems: 'baseline',
        flexDirection: 'column',
        marginBottom: 10
    },
    ModalText: {
        fontSize: general.smalltext,
        fontWeight: '500'
    },
    ModalTextInput: {
        height: 40,
        width: 240,
        paddingLeft: 20,
        paddingTop: 9,
        fontSize: general.smalltext,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: '#ffffff'
    },
    ModalBtView: {
        width: '90%',
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ModalBt: {
        width: '40%',
        height: 40
    },
    ModalBtText: {
        width: '100%',
        height: 40,
        textAlign: 'center',
        paddingTop: 10,
        fontSize: general.smalltext,
        fontWeight:'600',
        color: general.primary1,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: '#ffffff'
    }
})