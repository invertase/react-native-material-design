import {Platform} from 'react-native'

export default function (elevation){
	if(Platform.OS == 'ios'){
		if(elevation !== 0){
			return {
				shadowColor: "black",
				shadowOpacity: 0.3,
				shadowRadius: elevation,
				shadowOffset: {
					height: 2,
					width: 0
				}
			}
		}else{
			return {}
		}
	}else{
		return {
			elevation: elevation,
		}
	}
}
