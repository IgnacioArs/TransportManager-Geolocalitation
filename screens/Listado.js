import { StyleSheet, Text, View, ScrollView,Button,Image, ActivityIndicator, RefreshControl} from 'react-native';
import React, { useEffect, useState } from 'react'
import {ListItem,Avatar} from '@rneui/themed'
/* import logoBlack from '../image/LogoFondoNegro.jpeg' */
import { BotonCeleste } from '../components/Boton';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { MaterialCommunityIcons } from '@expo/vector-icons';



import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

const Listado = (props) => {

  const navegacion = useNavigation()

const [rutas,setRutas] = useState([])
const [refrescar,setRefrescar] = useState(false)
const [user,setUser] =useState(undefined);






const cargarRutas = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  console.log("USANDO EN CARGARrUTAS ====>",token)
  const Rutas = await axios.get("https://bf79-181-162-219-245.sa.ngrok.io/api/cargasHoy",config);
  setRutas(Rutas.data)
  if(Rutas){
      alert("Se han cargado las rutas");
      console.log("QUE ME TRAE EL OBJETO RUTA",Rutas.data[0].gps.conductor);
  }else{
      alert("No se han podido cargar las rutas");
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
      console.log("error es =======>",e);
  }
}


useEffect(() => {

 if(user===undefined){
 return
}
cargarRutas(user.token);
console.log("token ========>",user.token)
},[user])


const cargar = React.useCallback(()=> {
setRefrescar(true)
obtenerPerfil();
setRefrescar(false)
})





return (
  <ScrollView  style={{backgroundColor:"#002046"}} refreshControl={<RefreshControl refreshing={refrescar} colors={["#002046"]} onRefresh={cargar}/>}>
        {/*     <RefreshControl  
          onRefresh={()=> console.log("cargando")}
          /> */}
    <View style={stiloss.head}>
 {/*    <MaterialCommunityIcons name="creation" size={24} color="black" /> */}
    <Button
      onPress={() => props.navigation.navigate("Localizar")}
      title="Ir a localizar"
    />
    </View>
{/*     {user?(<Text>{`${user.token}`}</Text>):(<Text></Text>)} */}
       {rutas.map(ru => ( <ListItem
          key={ru._id} 
          bottomDivider
        /*   onPress={() => {
            props.navigation.navigate("ruenteDetalle", {
              id: ru.id, 
            });
          }} */
        >

          <ListItem.Chevron />
          <Avatar
            source={{
              uri:
              "https://cdn4.iconfinder.com/data/icons/delivery-63/100/delivery-01-512.png",
            }}
            rounded
            />
         
          <ListItem.Content>
            <ListItem.Title key={`${ru.id}`}><Text>N°({`${ru.id}`})</Text></ListItem.Title>
            <ListItem.Subtitle><Text><MaterialCommunityIcons name="calendar" size={15} color="black" />: {`${ru.fecha}`}</Text></ListItem.Subtitle>
            <ListItem.Subtitle><Text><MaterialCommunityIcons name="email" size={15} color="black" />:{`${ru.gps.conductor.email}`}</Text></ListItem.Subtitle>
            <ListItem.Subtitle><Text>Inicio Latitude:{`${ru.gps.InicioLatitude}`}</Text></ListItem.Subtitle>
            <ListItem.Subtitle><Text>Inicio Longitude:{`${ru.gps.InicioLongitude}`}</Text></ListItem.Subtitle>
            <ListItem.Subtitle><Text>Destino Latitude {`${ru.gps.
Llegadalatitude}`}</Text></ListItem.Subtitle>
            <ListItem.Subtitle><Text>Destino Longitude{`${ru.gps.
Llegadalongitude}`}</Text></ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>))}
          
        
 
  
  </ScrollView>
);
}
                


const stiloss = StyleSheet.create({
  titulo:{color:"#ffffff",textAlign:"center",fontSize:15,alignSelf:'center'},
  tituloDOS:{backgroundColor:'black',alignSelf:'center',width:200,height:25,marginBottom:10,marginTop:10,borderRadius:3000,textAlign:'center'},
  container:{backgroundColor:'#273746 '},
  datos:{
    backgroundColor:'#191919',width:400,alignSelf:'center',borderRadius:20
  },
  logoBlack:{
    width:500,
    height:110,
    alignSelf:'center',
    position:'relative',
    opacity:0.5
  },
  head:{
    marginTop:50,
    backgroundColor:"#273746"
  }

})
export default Listado;