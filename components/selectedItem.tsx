import React from "react";
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
  data: Contact;
  index: number;
}

class SelectedItem extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
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
        {this.props.data.name.length < 11 ? (
          <Text style={styles.smallFont}>{this.props.data.name}</Text>
        ) : (
          <Text style={styles.smallFont}>
            {this.props.data.name.substring(0, 8) + "..."}
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  noImageStyle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    fontSize: 27,
    fontWeight: "bold",
  },

  smallFont: {
    color: colors.grey,
  },
});
export default SelectedItem;
