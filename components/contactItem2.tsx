import React, { FC, PropsWithChildren } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,  TouchableHighlight } from 'react-native';
import { Contact } from '../containers/contactList'
import colors from '../colors';

interface Props {
    clickFunction: (contact: Contact) => void,
    data: Contact,
    index: number
}

class ContactItem extends React.Component<Props>{


    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        // console.log(this.props.index);

    }
    shouldComponentUpdate(nextProps: Readonly<PropsWithChildren<Props>>, nextState: Readonly<PropsWithChildren<Props>>) {
        // return false
        const isSelected: Contact = nextProps.data;
        const prevIsSelected: Contact = this.props.data;

        const isSameSelectedState = isSelected == prevIsSelected;
        // console.log(isSelected == prevIsSelected);

        return !isSameSelectedState;
    }
    changeState() {
        // this.props.data.checked=!this.props.data.checked
        this.props.clickFunction(this.props.data)
    }
    render() {
        return (
            <View style={styles.contactView}>
                <View style={styles.imageContainer}>
                    {this.props.data.imageAvailable ? <Image
                        style={styles.imageStyle}
                        source={{ uri: this.props.data.image?.uri }}
                    /> :
                        <TouchableHighlight style={styles.noImageStyle}>
                            <Text style={styles.imageText}>{this.props.data.name.charAt(0)}</Text>
                        </TouchableHighlight>
                    }
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.mainFont}>{this.props.data.name}</Text>
                    <Text style={styles.lightFont}>{this.props.data.phoneNumbers ? this.props.data.phoneNumbers[0].number : 'no number found'}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={[styles.touchableStyle, { backgroundColor: this.props.data.checked ? 'green' : 'red' }]}

                        onPress={() => { this.changeState() }}
                    >

                    </TouchableOpacity>
                </View>

            </View>

        )
    }

}

const styles = StyleSheet.create({
    contactView: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 1.4 / 15,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10

    },
    imageStyle: {
        width: Dimensions.get('window').height * 1.1 / 15,
        height: Dimensions.get('window').height * 1.1 / 15,
        borderRadius: Dimensions.get('window').height * 1.1 / 15,
    },
    noImageStyle: {
        width: Dimensions.get('window').height * 1.1 / 15,
        height: Dimensions.get('window').height * 1.1 / 15,
        borderRadius: Dimensions.get('window').height * 1.1 / 15,
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
        color: colors.textPrimary,
        fontSize: 18,
        alignSelf: 'flex-start'
    },
    lightFont: {
        color: colors.textSecondary,
        fontSize: 12

    },
    touchableStyle: {
        height: 30,
        width: 30,

        borderRadius: 30
    }

});
export default ContactItem


