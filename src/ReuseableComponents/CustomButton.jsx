import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

const CustomButton = ({
  title,
  style,
  TextStyle,
  onPress,
  disabled = false,
  icon,
  width,
  height,
  paddingHorizontal,
}) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.button,
          { width: width || wp('87.2%') },
          disabled ? styles.disabledbutton : null,
          style,
        ]}
      >
        {icon && <View style={styles.iconWrapper}>{icon}</View>}

        <Text style={[styles.Text, TextStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A78BFA',
    width: wp('87.2%'),
    height: hp('5.9%'),
    borderRadius: hp('2.95%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4.3%'),
    alignSelf: 'center',
  },
  Text: {
    fontSize: RFValue(14),
    color: '#FFFFFF',
    fontWeight: 600,
  },
  iconWrapper: {
    marginRight: wp('2%'),
  },
  disabledbutton: {
    backgroundColor: '#CBBEF5',
  },
});
