import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import GradientWrapper from '../ReuseableComponents/GradientWrapper';
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from '../ReuseableComponents/CustomButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const backbutton = require('../assets/Onboardingimg/LeftButton.png');
const StoryPage = ({ navigation, route }) => {
  const { story } = route.params;

  const PAGE_SIZE = 500; 
  const [page, setPage] = useState(0);


  const storyText = story?.assets?.text
    || story?.description
    || "⚠️ Story content not available.";

  const totalPages = Math.ceil(storyText.length / PAGE_SIZE) || 1;
  const currentText = storyText.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);


  return (
    <GradientWrapper>
      {/* Header */}
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          {/* <Ionicons name="chevron-back" size={24} color="#2F3036" /> */}
            <Image
                         source={backbutton}
                         style={styles.arrowimg}
                         resizeMode="contain"
                       />
        </TouchableOpacity>
        <CustomButton
          title="Listen"
          icon={<Ionicons name="headset" size={24} color="#fff" />}
          style={{ width: wp('30%'), height: hp('6%'), paddingHorizontal: wp('1%') }}
          onPress={() => navigation.navigate('Listen', { story })}
        />
      </View>

      {/* Centered Story Card */}
      <View style={{ alignSelf: "center", marginTop: hp('2%') }}>
        {
          story.image_url ? (
            <Image source={{ uri: story.image_url }} style={{ width: wp('50%'), height: hp('14%'), borderRadius: wp('2.7%') }} />
          ) : (
            <Text>No image</Text>
          )
        }
      </View>
      <View style={{ alignItems: "center", }}>
        <Text style={styles.title}>{story.title}</Text>
        <Text style={styles.duration}>
          ~ {story.duration ? (story.duration / 60).toFixed(0) : "0"} min
        </Text>
      </View>
      {/* Story Content */}
      <ScrollView style={styles.storyContent}>
        <Text style={styles.storyText}>
          {currentText || "⚠️ Story content not available."}
        </Text>
      </ScrollView>


      {/* Next Page Button */}
      {page + 1 < totalPages && (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => setPage(page + 1)}
        >
          <Text style={styles.nextBtnText}>Next Page</Text>
        </TouchableOpacity>
      )}
    </GradientWrapper>
  );
};

export default StoryPage;

const styles = StyleSheet.create({
  iconWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp("4%"),
    marginTop: hp("2%"),
  },
  backIcon: {
    backgroundColor: "#FFFFFF",
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("5.5%"),
    justifyContent: "center",
    alignItems: "center",
  },
   arrowimg: {
    width: wp('6%'),
    height: hp('6%'),
  },
  card: {
    marginTop: hp("2%"),
    alignSelf: "center",
    width: wp("70%"),
    paddingHorizontal: wp("2%"),
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    color: "#1F2024",
    fontSize: RFValue(18),
    fontWeight: "700",
    marginBottom: 2,
    marginTop: hp('2%'),
    
  },
  duration: {
    fontSize: RFValue(14),
    color: "#71727A",
  },
  storyContent: {
    marginTop: hp("2%"),
    marginHorizontal: wp("4%"),
    flexGrow: 1,
  },

  storyText: {
    fontSize: RFValue(14),
    color: "#2F3036",
    lineHeight: 22,
  },
  nextBtn: {
    backgroundColor: "#A78BFA",
    marginHorizontal: wp("4%"),
    paddingVertical: hp("1.5%"),
    borderRadius: 12,
    alignItems: "center",
    marginTop: hp("2%"),
    marginBottom: hp('5%')
  },
  nextBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: RFValue(14),
  },
});
