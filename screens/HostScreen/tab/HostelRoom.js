import React from 'react';
import { FlatList, Pressable, StyleSheet, View, Text, Modal, TextInput } from 'react-native';
import HeaderApp from '../../component/HeaderApp';
import checkValid from '../../component/CheckValid';
import UserContext from '../../context/UserContext';

const hostelRoomApi = require('./HostelRoomAPI')
const general = require('../../../style')

export default function HostelRoom({navigation}){
    const [addModal, setAddModal] = React.useState(false);
    const [rid, setRid] = React.useState('');
    const [addErr, setAddErr] = React.useState('');
    const [changeModal, setChangeModal] = React.useState({visible: false, id: '', name:''});
    const [ridChange, setRidChange] = React.useState('');
    const [changeErr, setChangeErr] = React.useState('');
    const [deleteModal, setDeleteModal] = React.useState({visible: false, id: '', name:''});
    const [popUp, setPopUp] = React.useState({visible: false, content: ''});
    const [catchListChangedEv, setCatchListChangedEv]= React.useState(false);

    const user = React.useContext(UserContext);

    React.useEffect(
        ()=>{
            user.setIsLoading(true);
            hostelRoomApi.getRoomList(user.id, 
                (data) => {
                    user.SetRoomList(data);
                    user.setIsLoading(false);
                });
        }, [catchListChangedEv] )


    return (
        <View style={styles.container}>
            <Modal
                animationType='none'
                transparent={true}
                visible={changeModal.visible}
                onRequestClose={
                    () => {
                        setChangeModal({visible: false, id:'', name: ''});
                    }
                }
            >
                <View style={styles.modalView}>
                    <View style={styles.Modal}>
                        <Text style={styles.modalTitle}>Change room name</Text>
                        <Text style={styles.ModalText}>Do you want to change name of room {changeModal.name} to:</Text>
                        <TextInput 
                            style={styles.ModalTextInput}
                            value={ridChange}
                            onChangeText={setRidChange}
                        ></TextInput>
                        <Text
                            style={{
                                color: 'red',
                                fontSize: 12,
                                fontWeight: '500'
                            }}
                        >{changeErr}</Text>
                        <View style={styles.ModalBtView}>
                            <Pressable 
                                style={styles.ModalBt}
                                onPress={
                                    () => {
                                        setChangeModal({visible: false, id:'', name: ''});
                                    }
                                }
                            >
                                <Text style={styles.ModalBtText}>Cancel</Text>
                            </Pressable>
                            <Pressable 
                                style={styles.ModalBt}
                                onPress={
                                    () => {
                                        let isValid = checkValid(ridChange, setChangeErr)
                                        if (isValid) {
                                            hostelRoomApi.changeRoomName(user.id, changeModal.id, ridChange, 
                                                ()=>{
                                                    setPopUp({visible: true, content: 'Change successfully'});
                                                    setCatchListChangedEv(!catchListChangedEv);
                                                    setChangeModal({visible: false, id: '', name: ''})
                                                },
                                                (message)=>{
                                                    setPopUp({visible: true, content: message})
                                                })
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
                visible={addModal}
                onRequestClose={
                    () => {
                        setAddModal(false);
                    }
                }
            >
                <View style={styles.modalView}>
                    <View style={styles.Modal}>
                        <Text style={styles.modalTitle}>Add room</Text>
                        <Text style={styles.ModalText}>Enter room name:</Text>
                        <TextInput 
                            style={styles.ModalTextInput}
                            value={rid}
                            onChangeText={setRid}
                        ></TextInput>
                        <Text
                            style={{
                                color: 'red',
                                fontSize: 12,
                                fontWeight: '500'
                            }}
                        >{addErr}</Text>
                        <View style={styles.ModalBtView}>
                            <Pressable 
                                style={styles.ModalBt}
                                onPress={
                                    () => {
                                        setAddModal(false);
                                    }
                                }
                            >
                                <Text style={styles.ModalBtText}>Cancel</Text>
                            </Pressable>
                            <Pressable 
                                style={styles.ModalBt}
                                onPress={
                                    () => {
                                        let isValid = checkValid(rid, setAddErr)
                                        if (isValid) {
                                            hostelRoomApi.addRoom(user.id, rid, ()=>{
                                                setCatchListChangedEv(!catchListChangedEv);
                                                setPopUp({visible: true, content: 'Add room successfully'});
                                                setAddModal(false);
                                            }, 
                                            (message) => {
                                                setPopUp({visible: true, content: message})
                                            })
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
                        setDeleteModal({visible: false, id: '', name: ''})
                    }
                }
            >
                <View style={styles.modalView}>
                    <View style={styles.Modal}>
                        <Text style={styles.modalTitle}>Delete room</Text>
                        <Text style={styles.ModalText}>Do you want to delete room {deleteModal.name} ?</Text>
                        <View style={styles.ModalBtView}>
                            <Pressable 
                                style={styles.ModalBt}
                                onPress={
                                    () => {
                                        setDeleteModal({visible: false, id: '', name: ''})
                                    }
                                }
                            >
                                <Text style={styles.ModalBtText}>Cancel</Text>
                            </Pressable>
                            <Pressable 
                                style={styles.ModalBt}
                                onPress={
                                    () => {
                                        hostelRoomApi.deleteRoom(user.id, deleteModal.id, 
                                            ()=>{
                                                setDeleteModal({id:'', visible: false, name: ''});
                                                setPopUp({visible: true, content: 'Delete successfully!'});
                                                setCatchListChangedEv(!catchListChangedEv);
                                            },
                                            (message)=>{
                                                setPopUp({visible: true, content: message})
                                                setDeleteModal({id:'', visible: false, name: ''});
                                            })
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
                <View style={styles.modalView}>
                    <View style={styles.Modal}>
                        <Text style={styles.modalTitle}>Pop up</Text>
                        <Text style={styles.ModalText}>{popUp.content}</Text>
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
            <View style={{
                marginTop: 10,
                marginBottom: 30,
                alignItems: 'baseline',
                justifyContent: 'flex-start',
                flexDirection: 'row',
                width: '80%'
            }}>
                <Pressable
                    onPress={
                        ()=>{
                            setAddModal(true);
                        }
                    }
                >
                    <Text style={styles.bt}>Add</Text>
                </Pressable>
            </View>
            <FlatList
                data={user.RoomList}
                renderItem={
                    ({item})=>{
                        return <Room room={item} changeFunc={setChangeModal} deleteFunc={setDeleteModal}></Room>
                    }
                }
                showsVerticalScrollIndicator={false}
            ></FlatList>
        </View>
    )
}

function Room({room, changeFunc, deleteFunc}){
    return (
        <View style={styles.roomView}>
            <Text>Room: {room.roomName}</Text>
            <Pressable
                onPress={
                    ()=>{
                        changeFunc({visible: true, id: room.roomId, name: room.roomName})
                    }
                }
            >
                <Text style={styles.bt}>Change</Text>
            </Pressable>
            <Pressable
                onPress={
                    ()=>{
                        deleteFunc({visible: true, id: room.roomId, name: room.roomName})
                    }
                }
            >
                <Text style={styles.bt}>Delete</Text>
            </Pressable>
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
    bt : {
        fontSize: general.smalltext,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 20,
        padding: 10
    },
    roomView: {
        width: '90%',
        padding:10,
        marginTop: 10,
        marginLeft: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: general.backgroundColor,
        borderColor: general.primary1,
        borderWidth: 2,
        borderRadius: 20,
    },
    modalView:{
        backgroundColor: '#0808086F',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%'
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
    modalTitle:{
        fontSize: general.text,
        fontWeight: '500'
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