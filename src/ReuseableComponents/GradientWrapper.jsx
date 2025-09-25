import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
const GradientWrapper = ({
  children,
  colors = ['#FFF6D6', '#F4F2EB', '#FFFBEB'],
}) => {
  return (
    <LinearGradient colors={colors} style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
export default GradientWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
});
