import React, { useEffect,useState } from 'react'
import { View,Text,Button } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import App from './App';


const Geolocalitation = () => {
    const [user,setUser] =useState();



useEffect(()=> {
borrarAsyncStorage();
obtenerAlmacenamiento();
},[])

    const borrarAsyncStorage = async () => {
        await AsyncStorage.clear();
        console.log(AsyncStorage.getItem('@storage_Key'));
      }


      const obtenerAlmacenamiento = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@storage_Key')
      /*     return jsonValue != null ? JSON.parse(jsonValue) : null; */
          const datosAsyncStorage =  JSON.parse(jsonValue)
          setUser(datosAsyncStorage)
          console.log("Los datos actuales de asinc storage",user.token);
        } catch(e) {
          // error reading value
        }
      }

  return (
    user? <App/>:
    <View>
      <Text>Entraste a geolocalizacion</Text>
      <Button onPress={()=> borrarAsyncStorage()} title="Cerrar session"/>
    </View>
  )
}

export default Geolocalitation
