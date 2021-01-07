
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, ListRenderItem, SectionList } from 'react-native';
import * as Contacts from 'expo-contacts';
import colors from '../colors'
import ContactItem from '../components/contactItem'
import ContactItemComponent from '../components/contactItem2'
import SelectedItem from '../components/selectedItem'


export interface ContactGroup {
    title: string;
    data: Array<Contacts.Contact>;
}
export interface Contact extends Contacts.Contact {

    checked: boolean;
}

interface State {
    _isPermissionGranted: boolean;
    contacts: Array<Contact>;
    group: Array<ContactGroup>;
    selectedContacts: Array<Contact>;
}

export default class Adress extends React.Component<{}, State> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            _isPermissionGranted: true,
            contacts: [],
            selectedContacts: [],
            group: []

        };
    }
    async componentDidMount() {
        this.setContactList()
    }
    async setContactList() {
        await this.getContactsPermission()
        if (this.state._isPermissionGranted) {
            const { data } = await Contacts.getContactsAsync({ sort: Contacts.SortTypes.FirstName });
            // data.forEach(item => {
            //     if (item.imageAvailable) {
            // console.log(data);
            //     }
            // })
            if (data.length > 0) {
                await this.setState({ contacts: data })

            }
            let startIndex: number = 0
            // to get initial alphabitic index
            for (let index: number = 0; index < data.length; index++) {
                if (data[index].name.charAt(0) === 'a' || data[index].name.charAt(0) === 'A') {
                    startIndex = index
                    break
                }

            }
            let contactGroupArray = [] as Array<ContactGroup>
            let contactGroup = {} as ContactGroup;
            let contactArr = [] as Array<Contacts.Contact>
            // save in groups alphabetically
            for (let i = 97; i < 123; i++) {

                // contactGroup.char = String.fromCharCode(i)
                contactArr = []
                for (let index = startIndex; index < data.length; index++) {

                    if (data[index].name.charAt(0) == String.fromCharCode(i) || data[index].name.charAt(0) == String.fromCharCode(i - 32)) {

                        // contactDataItem =data[index]
                        contactArr.push(data[index])
                        // console.log(typeof(data[index]) );


                    }
                    else {
                        // console.log("break");
                        // console.log(contactArr);

                        startIndex = index
                        break
                    }
                }
                contactGroup = { title: String.fromCharCode(i - 32), data: contactArr }
                contactGroupArray.push(contactGroup)

                //     console.log(String.fromCharCode(i));
                // console.log(String.fromCharCode(i - 32));

            }
            this.setState({ group: contactGroupArray })

        }
        // this.setState({ contacts: [{id:5,name:"ff"},{id:6,name:"ss"}] })
    }
    async getContactsPermission() {

        let status = await Contacts.requestPermissionsAsync();
        if (status.granted) {
            this.setState({ _isPermissionGranted: true })
        }

    }
    Add(item: Contact) {
        item.checked = true
        console.log(item);
        if (item.checked) {
            this.state.selectedContacts.push(item)
        }
        this.setState({ selectedContacts: this.state.selectedContacts })

    }
    remove(item: Contact) {
        item.checked = false
        this.state.selectedContacts.splice(this.state.selectedContacts.findIndex(obj => obj.id == item.id), 1);
        this.setState({ selectedContacts: this.state.selectedContacts })


    }
    _renderItem = (item: Contact, index: number) => (
        <ContactItemComponent data={item} index={index} clickFunction={(contact: Contact) => this.Add(contact)} />
    );
    _flatListrenderItem = (item: Contact, index: number) => (
        <SelectedItem data={item} index={index} removeFunction={(contact: Contact) => this.remove(contact)} />
    );

    render() {
        return (
            <View style={styles.container}>

                {this.state._isPermissionGranted ?
                    <View style={styles.container}>
                        <FlatList
                            data={this.state.selectedContacts}
                            horizontal
                            renderItem={({ item, index }: { item: Contact, index: number }) =>
                                this._flatListrenderItem(item, index)}
                        />
                        <SectionList
                            sections={this.state.group}
                            renderItem={({ item, index }: { item: Contact, index: number }) =>
                                this._renderItem(item, index)}
                            renderSectionHeader={({ section }) => (
                                <View style={styles.headerStyle}>
                                    <Text style={styles.headerItem}>{section.title}</Text>
                                </View>
                            )}
                            ItemSeparatorComponent={({ }) => (
                                <View style={styles.itemSeparator}>
                                    <View style={styles.innerItemSeparator}>

                                    </View>
                                </View>
                            )}
                            keyExtractor={(item, index) => item.id}
                        />
                    </View>
                    : <View style={styles.container}>
                        <Text style={styles.instructionFont}>To use app please enable permission</Text>
                        <TouchableOpacity style={styles.btnStyle} onPress={() => { this.setContactList() }}>
                            <Text style={styles.btnFont}>Enable</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnStyle: {
        height: 50,
        width: Dimensions.get('window').width * 250 / 375,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.buttonPrimary,
        borderRadius: 20,
        marginVertical: Dimensions.get('window').width * 15 / 375,
    },
    btnFont: {
        fontSize: 16,
        fontWeight: 'normal'
    },
    instructionFont: {
        fontSize: 16,
        fontWeight: 'normal'
    },
    headerItem: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.white
    },
    headerStyle: {
        height: Dimensions.get('window').height * .9 / 15,
        width: Dimensions.get('window').width,
        backgroundColor: colors.headerSectionList,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    itemSeparator: {
        height: 1,
        width: Dimensions.get('window').width * 5 / 6,
        backgroundColor: colors.grey,
        alignSelf: 'flex-end'
    },
    innerItemSeparator: {
        // height:1,
        // width: Dimensions.get('window').width*1/6 ,
        // backgroundColor:colors.primary
    }
});
