import { Pressable ,Text,StyleSheet} from "react-native"
import {Ionicons} from '@expo/vector-icons'
import { Colors } from "../../contants/colors"

function OutlinedButton({icon,children,whenPressed}) {
  return (
   <Pressable onPress={whenPressed} style={({pressed})=>[styles.button ,pressed && styles.pressed]} >
    <Ionicons style={styles.icon} name={icon} color={Colors.primary500} size={18} />
    <Text style={styles.text} >{children}</Text>
   </Pressable>
  )
}

const styles=StyleSheet.create({
    button:{
     paddingHorizontal:12,
     paddingVertical:6,
     margin:4,
     flexDirection:'row',
     justifyContent:'center',
     alignItems:'center',
     borderWidth:1,
     borderColor:Colors.primary500
    },
    text:{
        color:Colors.primary500
    },
    pressed:{
        opacity:0.7,
    },
    icon:{
        marginRight:6
    }
})

export default OutlinedButton
