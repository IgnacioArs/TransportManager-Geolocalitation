import React, { useState } from "react";
import { TouchableOpacity,StyleSheet,Text} from "react-native";



export function BotonCeleste (props){

const {onPress,text} = props



return(
    <TouchableOpacity style={{...stilo.boton,backgroundColor:'#1A99F9'}} onPress={onPress}>
        <Text
        style={{...stilo.botonTexto,color:'#ffffff',}}
        >
        {text}</Text>
    </TouchableOpacity>
)


}


export function BotonVerde (props){

    const {onPress,text} = props
    
    
    
    return(
        <TouchableOpacity style={{...stilo.boton,backgroundColor:'#008f39'}} onPress={onPress}>
            <Text
            style={{...stilo.botonTexto,color:'#ffffff',}}
            >
            {text}</Text>
        </TouchableOpacity>
    )
    
    
    }


const stilo = StyleSheet.create({
    boton:{
            alignSelf:'center',
            padding:15,
            width:'90%',
            borderRadius:10,
         /*    opacity:1, */
            textShadowColor:'#f1f1f1'
    },
    botonTexto:{
        textAlign:'center',
        fontSize:18
    }

})

