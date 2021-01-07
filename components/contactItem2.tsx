import React, { FC, PropsWithChildren } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from "react-native";
import { Contact } from "../containers/contactList";
import colors from "../colors";

interface Props {
  clickFunction: (contact: Contact) => void;
  data: Contact;
  index: number;
}
interface State {
  checked: boolean;
}

class ContactItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      checked: this.props.data.checked,
    };
    // this.someFunction=this.someFunction.bind(this)
  }

  // someFunction(x){
  //     console.log(x);
  //     console.log("gg");

  // }
  componentDidMount() {
    console.log(this.props.index);
  }
  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<State>
  ) {
    // return false
    const isSelected: boolean = nextState.checked;
    const prevIsSelected: boolean = this.state.checked;

    const isSameSelectedState = isSelected == prevIsSelected;
    if (isSelected == prevIsSelected) {
    } else {
    }
    // console.log(isSelected == prevIsSelected);

    return !isSameSelectedState;
  }
  changeState() {
    this.props.data.checked = !this.props.data.checked;
    this.setState({ checked: this.props.data.checked });
    this.props.clickFunction(this.props.data);
  }
  render() {
    return (
      <View style={styles.contactView}>
        <View style={styles.imageContainer}>
          {this.props.data.imageAvailable ? (
            <Image
              style={styles.imageStyle}
              source={{ uri: this.props.data.image?.uri }}
            />
          ) : (
            <TouchableHighlight style={styles.noImageStyle}>
              <Text style={styles.imageText}>
                {this.props.data.name.charAt(0)}
              </Text>
            </TouchableHighlight>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.mainFont}>{this.props.data.name}</Text>
          <Text style={styles.lightFont}>
            {this.props.data.phoneNumbers
              ? this.props.data.phoneNumbers[0].number
              : "no number found"}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.touchableStyle}
            onPress={() => {
              this.changeState();
            }}
          >
            {this.state.checked && (
              <Image
                style={styles.badgeStyle}
                source={require("../assets/icons/check.png")}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contactView: {
    width: Dimensions.get("window").width,
    height: (Dimensions.get("window").height * 1.4) / 15,
    backgroundColor: colors.primary,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  imageStyle: {
    width: (Dimensions.get("window").height * 1.1) / 15,
    height: (Dimensions.get("window").height * 1.1) / 15,
    borderRadius: (Dimensions.get("window").height * 1.1) / 15,
  },
  noImageStyle: {
    width: (Dimensions.get("window").height * 1.1) / 15,
    height: (Dimensions.get("window").height * 1.1) / 15,
    borderRadius: (Dimensions.get("window").height * 1.1) / 15,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    fontSize: 27,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1.5,
  },
  detailsContainer: {
    flex: 5,
  },
  iconContainer: {
    flex: 0.7,
  },
  mainFont: {
    color: colors.textPrimary,
    fontSize: 18,
    alignSelf: "flex-start",
  },
  lightFont: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  touchableStyle: {
    height: 33.7,
    width: 33.7,
    backgroundColor: colors.primary,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: colors.white,
    alignContent: "center",
    justifyContent: "center",
  },
  badgeStyle: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
});
export default ContactItem;
