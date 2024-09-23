import { Pressable,StyleSheet } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

function IconButton({icon,size,color,whenPressed}) {
  return (
    <Pressable onPress={whenPressed} style={ ({pressed})=> [styles.btn,pressed && styles.pressed]} >
       <Ionicons name={icon} size={size} color={color}  />
    </Pressable>
  )
}

const styles= StyleSheet.create({
    btn:{
        padding:8,
        justifyContent:'center',
        alignItems:'center',
    },
    pressed:{
        opacity:0.7,
    }
})

export default IconButton
