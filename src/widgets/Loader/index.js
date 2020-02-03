import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../utils/Colors/Colors';

export const Loader = props => (
  <View
    style={[
      StyleSheet.absoluteFill,
      {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(256, 256, 256, 0.5)',
        justifyContent: 'center',
      },
    ]}>
    <ActivityIndicator size="large" color={COLORS.red} />
  </View>
);
