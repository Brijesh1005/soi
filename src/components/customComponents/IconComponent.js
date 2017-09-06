import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';
import { generateRandomColor } from '../../utils/utils'

export default class IconComponent extends React.Component {
  constructor(props) {
    super(props);
    this.containerStyle = StyleSheet.flatten([props.iconContainerStyles, { backgroundColor: generateRandomColor() }]);
    this.state = {
      showImage: this.props.showImage && this.props.uri
    };
  }

  renderImageOrIcon() {
    if (this.state.showImage) {
      return (
        <Image
          style={{width: 40, height: 40, borderRadius: 50 }}
          source={{uri: this.props.uri }}
          loadingIndicatorSrc={{uri: "http://loadinggif.com/images/image-selection/13.gif"}}
          onError={() => {
            this.setState({showImage: false});
          }}/>
      )
    } else {
      return (
        <Text style={styles.circleSpan}>{this.props.letter}</Text>
      )
    }
  }
  render() {
    return (
      <View style={this.containerStyle}>
          { this.renderImageOrIcon() }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  circleSpan: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textShadowColor: 'gray',
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 2
  }
});
