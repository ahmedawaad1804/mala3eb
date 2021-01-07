import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
import { Contact } from '../containers/contactList'

import colors from '../colors';

interface Props {
    data: Contact,
    index: number
}

class SelectedItem extends React.Component<Props>{
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                {this.props.data.imageAvailable ? <Image
                    style={styles.imageStyle}
                    source={{ uri: this.props.data.image?.uri }}
                /> :
                    <TouchableHighlight style={styles.noImageStyle}>
                        <Text style={styles.imageText}>{this.props.data.name.charAt(0)}</Text>
                    </TouchableHighlight>
                }{this.props.data.name.length < 11 ?
                    <Text style={styles.smallFont}>{this.props.data.name}</Text> :
                    <Text style={styles.smallFont}>{this.props.data.name.substring(0, 8) + "..."}</Text>}
                
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height * 2.3 / 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 7,
        marginHorizontal: 10
    },
    imageStyle: {
        width: Dimensions.get('window').height * 1.3 / 15,
        height: Dimensions.get('window').height * 1.3 / 15,
        borderRadius: Dimensions.get('window').height * 1.3 / 15,
    },
    noImageStyle: {
        width: Dimensions.get('window').height * 1.3 / 15,
        height: Dimensions.get('window').height * 1.3 / 15,
        borderRadius: Dimensions.get('window').height * 1.3 / 15,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageText: {

        fontSize: 27,
        fontWeight: 'bold'

    },
   
    smallFont: {
        color: colors.grey
    }


});
export default SelectedItem


