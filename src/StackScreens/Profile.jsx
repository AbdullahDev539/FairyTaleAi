import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import GradientWrapper from '../ReuseableComponents/GradientWrapper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

export default function ProfileUpload() {
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleCamera = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto({ uri: response.assets[0].uri });
      }
    });
    setModalVisible(false);
  };

  const handleGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.assets && response.assets.length > 0) {
        setPhoto({ uri: response.assets[0].uri });
      }
    });
    setModalVisible(false);
  };

  return (
    <GradientWrapper>
      {/* Title */}
      <Text style={styles.profileText}>Profile Settings</Text>

      {/* Avatar */}
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.avatarContainer}>
            {photo ? (
              <Image source={photo} style={styles.avatarImage} />
            ) : (
              <Ionicons
                name="person-circle-sharp"
                size={wp('40%')}
                color="#C7B6FC"
              />
            )}

            <View style={styles.editIcon}>
              <Ionicons name="pencil" size={RFValue(20)} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.nameText}>Lucas Scott</Text>
        <Text style={styles.usernameText}>@lucasscott3</Text>

        {/* Gradient Text */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TrialPaywall', { type: 'upgrade' })
          }
        >
          <MaskedView
            maskElement={
              <Text
                style={[styles.upgradeText, { backgroundColor: 'transparent' }]}
              >
                Upgrade to Pro
              </Text>
            }
          >
            <LinearGradient
              colors={['#A78BFA', '#C084FC', '#F472B6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.upgradeText, { opacity: 0 }]}>
                Upgrade to Pro
              </Text>
            </LinearGradient>
          </MaskedView>
        </TouchableOpacity>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {[
          'Voice Privacy & Control',
          'Change Password',
          'Language',
          'Notifications',
          'Appearance',
          'Help & Support',
          'Privacy & Consent Policy',
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => {
              if (item === 'Privacy & Consent Policy') {
                navigation.navigate('PrivacyPolicy');
              }
              if (item === 'Voice Privacy & Control') {
                navigation.navigate('VoiceProfile');
              }
            }}
          >
            <Text style={styles.optionText}>{item}</Text>
            <Ionicons name="chevron-forward" size={20} color="#555" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload Photo</Text>
            <Pressable style={styles.modalBtn} onPress={handleCamera}>
              <Text style={styles.modalBtnText}>📷 Camera</Text>
            </Pressable>
            <Pressable style={styles.modalBtn} onPress={handleGallery}>
              <Text style={styles.modalBtnText}>🖼️ Gallery</Text>
            </Pressable>
            <Pressable
              style={[styles.modalBtn, { backgroundColor: '#F87171' }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalBtnText}>❌ Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({
  profileText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: RFValue(14),
  },
  avatarContainer: {
    position: 'relative',
    marginTop: hp('1.5%'),
  },
  avatarImage: {
    width: wp('40%'),
    height: wp('40%'),
    borderRadius: wp('20%'),
  },
  editIcon: {
    position: 'absolute',
    bottom: hp('1.2%'),
    right: wp('2.5%'),
    backgroundColor: '#A78BFA',
    borderRadius: 999,
    padding: wp('2%'),
  },
  nameText: {
    fontSize: RFValue(15),
    fontWeight: '700',
    color: '#000',
    marginTop: hp('1%'),
  },
  usernameText: {
    fontSize: RFValue(12),
    fontWeight: '400',
    color: '#777',
  },
  upgradeText: {
    fontSize: RFValue(14),
    fontWeight: '800',
    textAlign: 'center',
    marginTop: hp('1.5'),
  },
  optionsContainer: {
    marginTop: hp('1%'),
    paddingHorizontal: wp('5%'),
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    fontSize: RFValue(13),
    color: '#1F2024',
  },
  logoutButton: {
    borderWidth: 1.5,
    borderColor: '#F87171',
    borderRadius: 999,
    marginTop: hp('2%'),
    marginBottom: hp('8%'),
    width: wp('87%'),
    height: hp('6%'),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    textAlign: 'center',
    color: '#F87171',
    fontWeight: '600',
    fontSize: RFValue(13),
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: wp('75%'),
    borderRadius: wp('5%'),
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: RFValue(16),
    fontWeight: '700',
    marginBottom: hp('2%'),
    color: '#333',
  },
  modalBtn: {
    backgroundColor: '#A78BFA',
    width: '100%',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('3%'),
    marginTop: hp('1.2%'),
  },
  modalBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: RFValue(13),
  },
});
