import React from 'react';
import { FlatList, Pressable, StyleSheet, View, Text, Modal, TextInput } from 'react-native';
import HeaderApp from '../../component/HeaderApp';
import checkValid from '../../component/CheckValid';

const general = require('../../../style')

const data = [
    {rid: 1, rname: '001'},
    {rid: 2, rname: '002'},
    {rid: 3, rname: '003'},
    {rid: 4, rname: '004'},
    {rid: 5, rname: '005'},
    {rid: 6, rname: '006'}
]

export default function HostelRoom({navigation}){
    const [addModal, setAddModal] = React.useState(false);
    const [rid, setRid] = React.useState('');
    const [addErr, setAddErr] = React.useState('');
    const [changeModal, setChangeModal] = React.useState({visible: false, id: ''});
    const [ridChange, setRidChange] = React.useState('');
    const [changeErr, setChangeErr] = React.useState('');
    const [deleteModal, setDeleteModal] = React.useState({visible: false, id: ''});
    const [popUp, setPopUp] = React.useState({visible: false, content: ''});

    return (
        <View style={styles.container}>
            <Modal
                animationType='none'
                transparent={true}
                visible={changeModal.visible}
                onRequestClose={
                    () => {
                        setChangeModal({visible: false, id:''});
                    }
                }
            >
                <View style={styles.modalView}>
                    <View style={styles.Modal}>
                        <Text style={styles.modalTitle}>Change room name</Text>
                        <Text style={styles.ModalText}>Do you want to change name of room {changeModal.id} to:</Text>
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
                                        setChangeModal({visible: false, id:''});
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
                                            setChangeModal({id:'', visible: false});
                                            setPopUp({visible: true, content: 'Change room name successfully!'})
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
                                            setAddModal({id:'', visible: false});
                                            setPopUp({visible: true, content: 'Add room successfully!'})
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
                        setDeleteModal({visible: false, id: ''})
                    }
                }
            >
                <View style={styles.modalView}>
                    <View style={styles.Modal}>
                        <Text style={styles.modalTitle}>Delete room</Text>
                        <Text style={styles.ModalText}>Do you want to delete room {deleteModal.id} ?</Text>
                        <View style={styles.ModalBtView}>
                            <Pressable 
                                style={styles.ModalBt}
                                onPress={
                                    () => {
                                        setDeleteModal({visible: false, id: ''})
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
                                        setPopUp({visible: true, content: 'Delete successfully!'})
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
                data={data}
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
            <Text>Room: {room.rname}</Text>
            <Pressable
                onPress={
                    ()=>{
                        changeFunc({visible: true, id: room.rname})
                    }
                }
            >
                <Text style={styles.bt}>Change</Text>
            </Pressable>
            <Pressable
                onPress={
                    ()=>{
                        deleteFunc({visible: true, id: room.rname})
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