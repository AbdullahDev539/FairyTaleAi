import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const UpgradeBtn = ({
  onPress,
  icon,
  tittle,
  style,
  colors = ['rgba(250, 139, 139, 1)', 'rgba(167, 139, 250, 1)'],
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          styles.upgradeBtn,style,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        {icon && <View style={{ marginRight: 1 }}>{icon}</View>}
        <Text style={{ color: 'rgba(255, 255, 255, 1)' }}>{tittle}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default UpgradeBtn;

const styles = StyleSheet.create({
  upgradeBtn: {
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1%'),
    borderRadius: 999,
    marginTop: 5,
  },
});
