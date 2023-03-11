import { StatusBar } from 'expo-status-bar';
import { useEffect,useState } from 'react';
import { StyleSheet, Text, View,TextInput,Image,Button } from 'react-native';
import GpsImage from '../TransportManager/assets/gps.jpg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Geolocalitation from './Geolocalitation';
import Navegacion from './Navegation';


const Access = () => {

  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");

  const [user,setUser] =useState();



useEffect(()=>{
  obtenerAlmacenamiento();
},[])

  const almacenamientoDato = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
      console.log(e)
    }
  }

  const borrarAsyncStorage = async () => {
    await AsyncStorage.clear();
    console.log(AsyncStorage.getItem('@storage_Key'));
  }
  
const obtenerAlmacenamiento = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
/*     return jsonValue != null ? JSON.parse(jsonValue) : null; */
    const datosAsyncStorage =  JSON.parse(jsonValue)
    // console.log("Este es token: ", datosAsyncStorage)
    setUser(datosAsyncStorage)
    console.log("Los datos actuales de asinc storage",user);
  } catch(e) {
    // error reading value
  }
}




const AccesoLogin = async () => {

  if(username.length===0  && password.length===0){
    alert("!Existen campos vacios")
  }else{
    data={
      "username":username.username,
      "password":password.password
    }
    const respuesta = await axios.post('https://bf79-181-162-219-245.sa.ngrok.io/api/token',data)
    console.log("Este es el acceso: ",respuesta.data["access"])
  if(respuesta.data["access"] && username){
    alert("!Conecction successful");
    const data={
      user:username,
      token:respuesta.data.access
    }
    almacenamientoDato(data);
    obtenerAlmacenamiento();
  }else{
    alert("!Usuario not found")
  } 
}
}



  return (
      user? <Navegacion/>: <View style={styles.container}>
      <Image
      style={{height:200,width:200,borderRadius:100,marginBottom:20}}
      source={GpsImage}
    />
      <Text style={{color:"white"}} >User</Text>
      <TextInput
        onChangeText={(username) => setUsername({ username })}
        placeholder={'User'}
        style={styles.input}
        placeholderTextColor="#C7C7C7" 
      />
      <Text style={{color:"white"}} >Password</Text>
      <TextInput
        onChangeText={(password) => setPassword({ password })}
        placeholder={'****'}
        secureTextEntry={true}
        style={styles.input}
        placeholderTextColor="#C7C7C7" 
      />
      <Button
        title={'TransportManager Gps'}
        style={styles.Button}
        onPress={()=> AccesoLogin()}
      />
   
      <View style={{paddingTop:260}}>
          <Text style={{color:"white",opacity:0.5}}>TransportManager © 2022</Text>
      </View>
    </View>
);
}


const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: '#002046',
},
input: {
width: 250,
height: 44,
padding: 10, 
marginTop:25,
borderWidth: 1,
borderColor: '#00FF17',
marginBottom: 15,
borderRadius:20,
color:"white",
textAlign:"center"
},
Button:{
width: 300,
height: 44,
padding: 10,
marginTop:40,
borderWidth: 1,
borderColor: '#00FF17',
borderRadius:100,
color:"white",
}
});
export default Access