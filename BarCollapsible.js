'use strict';

import React, { PropTypes, Component } from 'react';
import { Animated, View, Text, TouchableHighlight } from 'react-native';

import styles from './style'

class BarCollapsible extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      onPressed: null,
      title: '',
      children: null,
      show: props.showOnStart || false
    };
  }
  
  componentDidMount() {
    if (this.props.clickable) {
      this.setState({
        onPressed: this.props.onPressed,
        title: this.props.title
      });
    } else if (this.props.collapsible) {
      Animated.timing(
        this.state.fadeAnim,
        { toValue: 1 }
      ).start();
      this.setState({
        title: this.props.title
      });
    } else {
      this.setState({
        title: this.props.title
      });
    }
    
    this._tintColor = this.props.tintColor || '#FFF';
  }
  
  render() {
    
    if (this.props.clickable) {
      return this._renderClickable();
    } else if (this.props.collapsible) {
      return this._renderCollapsible();
    } else {
      return this._renderDefault();
    }
  }
  
  _renderDefault() {
    return (
      <View style={styles.bar}>
        <Text style={[styles.title, this.props.titleStyle]}>{this.state.title}</Text>
      </View>
    );
  }
  
  _renderClickable() {
    return (
      <TouchableHighlight style={styles.barWrapper} underlayColor='transparent' onPress={this.state.onPressed}>
        <View style={[styles.bar, this.props.style]}>
          <Text style={[styles.title, this.props.titleStyle]}>{this.state.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  
  _renderCollapsible() {
    return (
      <View>
        <TouchableHighlight style={styles.barWrapper} underlayColor='transparent' onPress={() => { this._toggleView()}}>
          <View style={[styles.bar, this.props.style]}>
            <Text style={[styles.title, this.props.titleStyle]}>{this.state.title}</Text>
          </View>
        </TouchableHighlight>
        { this.state.show &&  <Animated.View
          style={{opacity: this.state.fadeAnim}}>
          {this.props.children}
        </Animated.View> }
      </View>
    );
  }
  
  _toggleView() {
    this.setState({
      show: !this.state.show,
    });
  }
}

BarCollapsible.propTypes = {
  style: View.propTypes.style,
  titleStyle: Text.propTypes.style,
  tintColor: PropTypes.string,
};

module.exports = BarCollapsible;
