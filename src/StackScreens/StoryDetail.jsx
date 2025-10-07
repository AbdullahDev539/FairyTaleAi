import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFavorites } from "../Context/FavoritesContext"; 
import GradientWrapper from "../ReuseableComponents/GradientWrapper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import CustomButton from "../ReuseableComponents/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
const backbutton = require('../assets/Onboardingimg/LeftButton2.png');
const StoryDetail = ({ route, navigation }) => {
    const { story } = route.params;
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

    const isFav = favorites.some((s) => s.id === story.id);

    return (
        <SafeAreaView edges={['bottom', 'right', 'left']}>
            <StatusBar barStyle={"light-content"} />
          
            <View style={styles.imageWrapper}>
                {story.image_url ? (
                    <Image source={{ uri: story.image_url }} style={styles.storyImage} />
                ) : (
                    <View style={[styles.storyImage, styles.imagePlaceholder]}>
                        <Text>No Image</Text>
                    </View>
                )}

                {/* Back Button */}
                
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                     <Image
                       source={backbutton}
                       style={styles.arrowimg}
                       resizeMode="contain"
                     />
                    {/* <Ionicons name="chevron-back" size={26} color="#FFFFFF" /> */}
                </TouchableOpacity>

                {/* Fav Button */}
                <TouchableOpacity
                    style={styles.favBtn}
                    onPress={() => {
                        if (isFav) removeFromFavorites(story.id);
                        else addToFavorites(story);
                    }}
                >
                    <Ionicons
                        name={isFav ? "heart" : "heart-outline"}
                        size={24}
                        color={isFav ? "#fff" : "#fff"}
                    />
                </TouchableOpacity>
                </View>
           

            {/* Categories */}
            <View style={styles.categoryContainer}>
                {story.categories.map((cat, index) => (
                    <View key={index} style={styles.chip}>
                        <Text style={styles.chipText}>{cat}</Text>
                    </View>
                ))}
            </View>

            {/* Title */}
            <Text style={styles.title}>{story.title}</Text>

            {/* Description */}
            <Text style={styles.Desc}>Description</Text>
            <Text style={styles.description}>
                {story.description || "No description available for this story."}
            </Text>

            <TouchableOpacity style={styles.readBtn} onPress={() => navigation.navigate("StoryPage", { story })}>
                <Ionicons name="book-outline" size={24} color="#000" />
                
                <Text styles={styles.readText}>Read</Text>
            </TouchableOpacity>


            <CustomButton title="Listen" onPress={() => navigation.navigate('Listen', { story })}
                icon={<Ionicons name="headset" size={22} color="#fff" />}
                 
                style={styles.CustomBtn}
            />
            {/* </View> */}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    imageWrapper: {
        position: "relative",
    },
    storyImage: {
        width: "100%",
        height: hp('42%'),
        borderRadius: wp('8%'),
    },
    imagePlaceholder: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eee",
    },
    backBtn: {
        position: "absolute",
        top: 26,
        left: 15,
        backgroundColor: "rgba(0,0,0,0.4)",
        
          width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("5.5%"),
    justifyContent: "center",
    alignItems: "center",
        borderRadius: 30,
        marginTop: hp('3%')
    },
     arrowimg: {
    width: wp('5%'),
    height: hp('5%'),
  },
    favBtn: {
        position: "absolute",
        top: 26,
        right: 15,
        padding: 8,
        borderRadius: 30,
        backgroundColor: "#A78BFA",
        marginTop: hp('3%')
    },
    title: {
        color: "#1F2024",
        fontSize: RFValue(18),
        fontWeight: "700",
        marginBottom: hp('2%'),
        textAlign:"flex-start",
        marginLeft:wp('7%'),
    },
    categoryContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: wp("6%"),
        marginVertical: hp("1%")

    },
    chip: {
        backgroundColor: "#90CDF44D",
        paddingHorizontal: wp("7%"),
        paddingVertical: hp('1.2%'),
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        marginTop: hp('2%'),
        flexDirection: "row",
        flexWrap: "wrap"
    },
    chipText: {
        color: "#2F3036",
        fontSize: RFValue(12),
        fontWeight:'semibold',
    },
    description: {
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 22,
        color: "#71727A",
        paddingHorizontal: wp("8%"),
        marginTop: hp('1%')
    },
    Desc: {
        fontWeight: 700,
        fontSize: RFValue(12),
        paddingHorizontal: wp("8%"),
        marginTop: hp('1%')

    },
    readBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FEC89A",
        width: wp("87.2%"),
        height: hp("5.9%"),
        borderRadius: hp("2.95%"),
        paddingVertical: hp("1.5%"),
        paddingHorizontal: wp("4.3%"),
        gap: 10,
        marginBottom: hp("1.6%"),
        alignSelf: "center",
        marginTop: hp("17%")
    },
    readText: {
        color: "#1F2024",
        fontSize: RFValue(14),
        fontWeight: "600",

    },

});

export default StoryDetail;
