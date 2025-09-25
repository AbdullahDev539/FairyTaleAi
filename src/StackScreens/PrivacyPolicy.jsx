import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import GradientWrapper from '../ReuseableComponents/GradientWrapper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
const PrivacyPolicy = ({ navigation }) => {
  return (
    <GradientWrapper>
      <View style={styles.privacyrow}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontWeight: 700 }}>Privacy & Consent Policy</Text>
      </View>

      <ScrollView style={styles.scroll}>
        <View style={styles.bottomBorder}>
          <Text style={styles.heading}>Privacy Policy</Text>
          <Text style={styles.text}>
            Welcome to Fairy Tales AI. Our mission is to help parents and
            children create magical, emotional connections through storytelling.
            We take your privacy and the safety of your child's data seriously.
            This policy explains what information we collect, how it's used, and
            the choices you have.
            {'\n\n'}
            We are not a kids' app. Fairy Tales AI is designed for parents. We
            do not knowingly collect personal information directly from children
            under the age of 13. Any information we process related to your
            child is provided and managed by you, the parent or guardian.
          </Text>
        </View>

        <View style={styles.bottomBorder}>
          <Text style={styles.heading}>What We Collect & Why</Text>
          <Text style={styles.text}>
            We collect information to provide and improve your experience. The
            data we collect includes:
            {'\n\n'}
            {'\u2022'} Your Account Information: When you sign up, we collect
            your email address and authentication details from your Google or
            Apple account. This is used to create and manage your account.
            {'\n\n'}
            {'\u2022'}Story Usage Data: We track which stories you read, listen
            to, and save as favorites. This helps us provide features like
            "Continue Reading," offer personalized story recommendations in the
            future, and understand which stories are most popular.
            {'\n\n'} {'\u2022'}Story Feedback: When you give a 👍 or 👎 on a
            story, we collect this feedback to help us curate and improve our
            story library.
            {'\n\n'} {'\u2022'}Device & Technical Information: We collect
            general data about your device and app usage, such as device type,
            operating system, and a unique identifier. This helps us ensure the
            app runs smoothly and helps us understand how our users interact
            with the app.
          </Text>
        </View>

        <View style={styles.bottomBorder}>
          <Text style={styles.heading}>How We Use Voice Data</Text>
          <Text style={styles.text}>
            The MVP (initial version) of the app uses pre-recorded, high-quality
            voices. No user voice data is collected or stored in this version.
            {'\n\n'}
            In our future Pro features, we plan to offer voice cloning. This
            feature is entirely optional and requires your explicit consent.
            Here's how it will work:
            {'\n\n'}
            {'\u2022'}Voice Sample Collection: You will be guided to record a
            short audio sample of your voice. This recording is used to create a
            unique AI model of your voice.
            {'\n\n'}
            {'\u2022'} AI Model Creation: We use a secure AI service to process
            your voice sample and create a digital voice model. The original
            audio recording is deleted after the model is created
            {'\n\n'}
            {'\u2022'}Voice Playback: The AI voice model is used to narrate
            stories, which can only be played back within your personal app.
            {'\n\n'}
            {'\u2022'}Storage & Security: Your voice model is stored securely on
            our servers and is linked to your account. We will never share or
            sell your voice model or recordings to any third party. Your voice
            data is used exclusively for the purpose of narrating stories for
            you and your family.
            {'\n\n'}
            {'\u2022'}Data Deletion: You can request to have your voice model
            permanently deleted from our servers at any time.
          </Text>
        </View>
      </ScrollView>
    </GradientWrapper>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  privacyrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('20%'),
  },
  back: {
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingVertical: hp('1%'),
    paddingHorizontal: hp('1%'),
  },
  scroll: {
    paddingHorizontal: wp('5'),
    marginBottom: hp('10%'),
  },
  heading: {
    fontWeight: 700,
    fontSize: RFValue(16),
    marginBottom: hp('3%'),
    marginTop: hp('3%'),
  },
  text: {
    fontWeight: 400,
    fontSize: RFValue(14),
    color: '#494A50',
  },
  bottomBorder: {
    borderBottomColor: '#D4D6DD',
    borderBottomWidth: 1,
    paddingBottom: hp('5%'),
  },
});
