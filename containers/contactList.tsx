
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, SectionList, TextInput } from 'react-native';
import * as Contacts from 'expo-contacts';
import colors from '../colors'
import ContactItem from '../components/contactItem'
import ContactItemComponent from '../components/contactItem2'
import SelectedItem from '../components/selectedItem'


export interface ContactGroup {
    title: string;
    data: Array<Contact>;
}
export interface Contact extends Contacts.Contact {

    checked: boolean;
}

interface State {
    _isPermissionGranted: boolean;
    contacts: Array<Contact>;
    group: Array<ContactGroup>;
    changingNames: Array<Contact>;
    changingGroup: Array<ContactGroup>;
    changingGroupSecondary: Array<ContactGroup>;
    selectedContacts: Array<Contact>;
    refresh: boolean
}

export default class Adress extends React.Component<{}, State> {
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            _isPermissionGranted: true,
            contacts: [],
            selectedContacts: [],
            group: [],
            changingGroup: [],
            changingGroupSecondary: [],
            changingNames: [],
            refresh: true


        };
    }
    async componentDidMount() {
        this.setContactList()
    }
    async setContactList() {
        await this.getContactsPermission()
        if (this.state._isPermissionGranted) {
            const { data } = await Contacts.getContactsAsync({ sort: Contacts.SortTypes.FirstName });

            if (data.length > 0) {
                await this.setState({ contacts: data })

            }
            let startIndex: number = 0
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

                contactArr = []
                for (let index = startIndex; index < data.length; index++) {

                    if (data[index].name.charAt(0) == String.fromCharCode(i) || data[index].name.charAt(0) == String.fromCharCode(i - 32)) {

                        contactArr.push(data[index])
                    }
                    else {
                        startIndex = index
                        break
                    }
                }
                contactGroup = { title: String.fromCharCode(i - 32), data: contactArr }
                contactGroupArray.push(contactGroup)
            }
            this.setState({ group: contactGroupArray, changingGroup: contactGroupArray })
        }
    }
    async getContactsPermission() {

        let status = await Contacts.requestPermissionsAsync();
        if (status.granted) {
            this.setState({ _isPermissionGranted: true })
        }

    }
    Add(item: Contact) {
        // item.checked = !item.checked
        if (item.checked) {
            this.state.selectedContacts.push(item)
            this.setState({ selectedContacts: this.state.selectedContacts })
        }
        else {
            this.saveChange(item)
        }
    }
    saveChange(item: Contact) {
        this.state.selectedContacts.splice(this.state.selectedContacts.findIndex(obj => obj.id == item.id), 1);
        this.setState({ selectedContacts: this.state.selectedContacts, refresh: !this.state.refresh })
    }
    remove(item: Contact) {

        this.saveChange(item)

    }

    _renderItem = (item: Contact, index: number) => (
        <ContactItemComponent data={item} index={index} clickFunction={(contact: Contact) => this.Add(contact)} />
    );
    _flatListrenderItem = (item: Contact, index: number) => (
        <SelectedItem data={item} index={index} />
    );
    _handleSearch(text: string) {
        if (text.length == 0) {
            this.setState({ changingGroup: this.state.group })
        }
        else if (text.length == 1) {
            for (const iterator of this.state.group) {
                if (iterator.title == text.toUpperCase()) {
                    console.log(text);
                    this.setState({ changingGroup: [iterator], changingGroupSecondary: [iterator] })
                    break
                }
            }
        }
        else if (text.length > 1) {
            let contactGroup = [] as Array<Contact>;
            for (const iterator of this.state.changingGroupSecondary[0].data) {
                if (iterator.name.toUpperCase().includes(text.toUpperCase())) {
                    contactGroup.push(iterator)

                }
            }
            this.setState({ changingGroup: [{ title: this.state.changingGroupSecondary[0].title, data: contactGroup }] })
        }

    }
    render() {
        return (
            <View style={styles.container}>

                {this.state._isPermissionGranted ?
                    <View style={styles.container}>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder={"Search"}
                                onChangeText={(text) => this._handleSearch(text)}
                            ></TextInput>
                        </View>

                        <FlatList
                            data={this.state.selectedContacts}
                            horizontal
                            renderItem={({ item, index }: { item: Contact, index: number }) =>
                                this._flatListrenderItem(item, index)}
                        />
                        <SectionList
                        style={{alignSelf:'stretch'}}
                            extraData={this.state.refresh}
                            sections={this.state.changingGroup}
                            renderItem={({ item, index }: { item: Contact, index: number }) =>
                                this._renderItem(item, index)}
                            renderSectionHeader={({ section }) => (
                                <View style={styles.headerStyle}>
                                    <Text style={styles.headerItem}>{section.title}</Text>
                                </View>
                            )}
                            ItemSeparatorComponent={({ }) => (
                                <View style={styles.itemSeparator}>
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
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
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

        width: Dimensions.get('window').width * 5 / 6,
        backgroundColor: colors.grey,
        alignSelf: 'flex-end'
    },
    textInputContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 4 / 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.headerSectionList,
    },
    textInputStyle: {
        width: Dimensions.get('window').width * 5 / 6,
        height: Dimensions.get('window').height * 3 / 50,
        backgroundColor: colors.white,
        borderRadius: 5,
        paddingHorizontal: 20

    },
});
