import React, { FC,PropsWithChildren } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import colors from '../colors';
import { Contact } from '../containers/contactList'

interface Props {
    clickFunction: (contact:number) => void,
    data:Contact,
    index:number
  }


const ContactItem: React.FC<Props> = React.memo((props:Props) => {
    console.log("props"); 
    

    return (
        <View style={styles.contactView}>
            <View style={styles.imageContainer}>
                {props.data.imageAvailable ? <Image
                    style={styles.imageStyle}
                    source={{ uri: props.data.image?.uri }}
                /> :
                    <TouchableHighlight style={styles.noImageStyle}>
                        <Text style={styles.imageText}>{props.data.name.charAt(0)}</Text>
                    </TouchableHighlight>
                }
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.mainFont}>{props.data.name}</Text>
                <Text style={styles.lightFont}>{props.data.phoneNumbers ? props.data.phoneNumbers[0].number : 'no number found'}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity 
                style={{height:40,width:40,backgroundColor:'red'}}
                
                onPress={()=>{    props.clickFunction(props.index)    }}
                >

                </TouchableOpacity>
            </View>

        </View>

    );

})

const styles = StyleSheet.create({
    contactView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 1.7 / 15,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        marginVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:10

    },
    imageStyle: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    noImageStyle: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageText: {

        fontSize: 27,
        fontWeight: 'bold'

    },
    imageContainer: {
        flex: 1.5
    },
    detailsContainer: {
        flex: 5
    },
    iconContainer: {
        flex: .7
    },
    mainFont: {
        color:colors.textPrimary,
        fontSize:18,
        alignSelf:'flex-start'
    },
    lightFont:{
        color:colors.textSecondary,
        fontSize:12

    }

});
const areEqual = (prevProps :Readonly<PropsWithChildren<Props>>, nextProps :Readonly<PropsWithChildren<Props>>) => {
    // const { isSelected } = nextProps;
    // const { isSelected: prevIsSelected } = prevProps;
    
    // /*if the props are equal, it won't update*/
    // const isSelectedEqual = isSelected === prevIsSelected;
  console.log("h");
  
    return false
  };
export default ContactItem


