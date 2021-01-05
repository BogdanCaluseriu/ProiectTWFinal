import React,{useState} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from "./Form.styles"
import axios from 'axios'


function Register()
{
    const [floor,setFloor] = useState(0)
    const [roomName,setRoomName] = useState(null);


    let uvtDeleteRoom=()=>{
        return axios.delete("http://89.136.41.202:5000/etaj"+floor+"/"+roomName)
            .then(res=> {
                console.log(res.data)

                let addRoomStatus
                if(res.data === 1) addRoomStatus = 'Room Deleted'
                else if(res.data === 0) addRoomStatus = "Failed to delete room"

                Alert.alert(
                    addRoomStatus,
                    "",
                    [

                        { text: "OK", onPress: () => console.log("") }
                    ],
                    { cancelable: false }
                );


            })
            .catch(err=>console.log(err))
    }

    return(
        <View style = {styles.container}>


            <Text style={styles.logoText}>Sterge Sala</Text>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Etaj"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setFloor(text)}
                />
            </View>

            <View style = {styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Nume Camera"
                    placeholderTextColor="#BEBEBE"
                    onChangeText={text => setRoomName(text)}
                />
            </View>



            <TouchableOpacity
                style={styles.loginButton}
                onPress={uvtDeleteRoom}>
                <Text style={{color:'white',fontSize: 22}}>Sterge Sala</Text>
            </TouchableOpacity>

        </View>
    )
}



export default Register
