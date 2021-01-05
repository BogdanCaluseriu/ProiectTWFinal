import React,{useState} from 'react';
import {Text, View,TextInput ,TouchableOpacity,Alert} from 'react-native';
import styles from "./Form.styles"
import axios from 'axios'



function Login()
{
    const [email,setEmail] = useState(0)
    const [password,setPassword] = useState(0);

   let uvtLogin = ()=>{
     return axios.post('http://89.136.41.202:5000/',

         'data={"username":"'+email+'","password":"'+password+'"}'
           ,
               {
               "headers": {
                   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
               }
           }).then((response) => {
           console.log("response get details:"+response.data)
         let loginStatus
         if(response.data === 1) loginStatus = 'Login Successful'
         else if(response.data === 0) loginStatus = "Login Failed"

         Alert.alert(
             loginStatus,
             "",
             [

                 { text: "OK", onPress: () => console.log("") }
             ],
             { cancelable: false }
         );

     })
         .catch((error) => console.log( error) );
    }

    return(
     <View style = {styles.container}>

        <Text style={styles.logoText}>Member Login</Text>

         <View style = {styles.inputView}>
             <TextInput
                 style={styles.inputText}
                 placeholder="Email"
                 placeholderTextColor="#BEBEBE"
                 onChangeText={text => setEmail(text)}
             />
         </View>

         <View style = {styles.inputView}>
             <TextInput
                 style={styles.inputText}
                 placeholder="Password"
                 placeholderTextColor="#BEBEBE"
                 secureTextEntry={true}
                 onChangeText={text => setPassword(text)}
             />
         </View>

         <TouchableOpacity
             style={styles.loginButton}
             onPress={uvtLogin}>
             <Text style={{color:'white',fontSize: 22}}>LOGIN</Text>

         </TouchableOpacity>

     </View>
        )
}



export default Login
