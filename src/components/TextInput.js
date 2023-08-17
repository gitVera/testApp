import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput as RNTextInput,
} from 'react-native';

const TextInput = ({value, onChangeText, ...rest}) => {
  return (
    <View style={styles.wrap}>
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#eee',
  },
});

export default TextInput;
