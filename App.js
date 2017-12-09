import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, PanResponder } from "react-native";
import { setTimeout } from "core-js/library/web/timers";

class Inactive extends Component {
  componentWillMount() {
    this.inactive = false;

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        clearTimeout(this.timeout);

        if (this.inactive === true) {
          this.props.onInactiveChange(false);
        }

        this.inactive = false;

        this.timeout = setTimeout(() => {
          this.inactive = true;
          this.props.onInactiveChange(true);
        }, this.props.delay);
      },
    });
  }
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { children, delay, onInactiveChange, ...props } = this.props;
    return (
      <View {...props} {...this._panResponder.panHandlers}>
        {children}
      </View>
    );
  }
}

export default class App extends Component {
  state = {
    inactive: false,
  };
  handleInactive = isInactive => {
    this.setState({
      inactive: isInactive,
    });
  };
  render() {
    const { inactive } = this.state;
    return (
      <View style={styles.container}>
        <Inactive style={styles.tapMe} delay={1000} onInactiveChange={this.handleInactive}>
          <Text style={styles.text}>{inactive ? "We're inactive" : "Waiting..."}</Text>
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
