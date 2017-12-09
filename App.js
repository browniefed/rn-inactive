import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, PanResponder } from "react-native";
import { setTimeout } from "core-js/library/web/timers";

class Inactive extends Component {
  state = {
    inactive: false,
  };
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        clearTimeout(this.timeout);

        if (this.state.inactive === true) {
          this.setState({
            inactive: false,
          });
        }

        this.timeout = setTimeout(() => {
          this.setState({ inactive: true });
        }, this.props.delay);
      },
    });
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { children, delay, ...props } = this.props;
    return (
      <View {...props} {...this._panResponder.panHandlers}>
        {children(this.state.inactive)}
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Inactive style={styles.tapMe} delay={1000}>
          {inactive => {
            return <Text style={styles.text}>{inactive ? "We're inactive" : "Waiting..."}</Text>;
          }}
        </Inactive>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tapMe: {
    width: "50%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  text: {
    color: "#FFF",
  },
});
