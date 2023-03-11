import React, { Component, useEffect,useState,useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView,SafeAreaView,Image, BackHandler,RefreshControl} from 'react-native';

//importamos el boton
import { BotonCeleste } from '../components/Boton';

//importamos el appLoading
import AppLoading from 'expo-app-loading'
import { Card,Icon } from '@rneui/themed';
//importamos la fuente
import {Aladin_400Regular,useFonts} from '@expo-google-fonts/aladin'

//importamos el packete o modulo de los iconos
import { Entypo } from '@expo/vector-icons';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
//importamos los iconos
import { MaterialIcons } from '@expo/vector-icons'; 
const conductor = require('../assets/img/conductor.png')

//importams asyncstorage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from '@rneui/base';
import { Menu, Divider, Provider,List } from 'react-native-paper';
import App from '../App';


const Inicio = () => {

  const [visible, setVisible] = React.useState(false);
  const [refrescar,setRefrescar] = useState(false)

    const [appIsReady, setAppIsReady] = useState(false);
    const [user,setUser] = useState();

let [cargarFuente] = useFonts({
    Aladin_400Regular
})


useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
    obtenerPerfil();
  }, []);


const borrarAsyncStorage = async () => {
  console.log(AsyncStorage.getItem('@storage_Key'));
  await AsyncStorage.clear();
  if(user){
    await AsyncStorage.clear();
  }else{
    await AsyncStorage.clear();
  }
}

const obtenerPerfil = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
/*     return jsonValue != null ? JSON.parse(jsonValue) : null; */
    const datosAsyncStorage =  JSON.parse(jsonValue)
    setUser(datosAsyncStorage)
    console.log("Los datos actuales de asinc storage",user);
  } catch(e) {
    // error reading value
  }
}

const cargar = React.useCallback(()=> {
  setRefrescar(true)
  obtenerPerfil();
  setRefrescar(false)
  })

  useEffect(()=>{
    obtenerPerfil()
    console.log("Este es el token ", user)
    
  },[])

  

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  if(!cargarFuente){
  return  <AppLoading/>
  }else{
    return(
      user?
      <ScrollView style={{backgroundColor:"#002046"}}  refreshControl={<RefreshControl refreshing={refrescar} colors={["#002046"]} onRefresh={cargar}/>} >
        <Card>
          <Card.Title>Nombre Conductor</Card.Title>
          <Card.Divider />
              <View style={styles.user}>
              <Text style={styles.name}></Text>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={conductor}
                />
                <Text style={styles.name}>{user?(<Text>{`${user.user.username}`}</Text>):(<Text></Text>)}</Text>
              </View>
        </Card>
        <Card containerStyle={{ marginTop: 15 }}>
          <Card.Title>Otros</Card.Title>
          <Card.Divider />
        </Card>
        <Button color="error" onPress={() => borrarAsyncStorage()}>Cerrar sesion</Button>
      </ScrollView>
      :<App/>
    )
}


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  });


export default Inicio;