import {Animated} from "react-native";
import React from "react";

export const height = new Animated.Value(70);
export const swipeLeft = (progress: any, dragX : any) =>{
    const scale = dragX.interpolate({
        inputRange:[-200,0],
        outputRange:[1,0.5],
        extrapolate:'clamp'
    })
    return(
        <Animated.View style={{backgroundColor:'red',width:"100%",justifyContent:'center'}}>
    <Animated.Text style={{marginLeft:'auto',marginRight:50, fontSize:15, fontWeight:'bold',transform:[{scale}]}}>Delete</Animated.Text>
    </Animated.View>
)
}
