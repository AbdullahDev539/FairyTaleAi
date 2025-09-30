// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   FlatList,
//   Image,
//   Modal,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { RFValue } from 'react-native-responsive-fontsize';
// import GradientWrapper from '../ReuseableComponents/GradientWrapper';
// import UpgradeBtn from '../ReuseableComponents/UpgradeBtn';
// import Icon from 'react-native-vector-icons/Ionicons';
// import storiesJson from '../assets/JsonFiles/stories.json';
// import { useFavorites } from '../Context/FavoritesContext';
// import HalfCircleProgress from '../Components/HalfCircleProgress';
// import { useApp } from '../Context/RainbowProgress';
// import LinearGradient from 'react-native-linear-gradient';
// const CATEGORY_FILTERS = [
//   'Bedtime & Sleep',
//   'Adventure & Exploration',
//   'Friendship & Family',
//   'Magic & Fantasy',
//   'Animals & Nature',
// ];

// const AGE_FILTERS = [
//   { label: 'Age 2–3', range: [2, 3] },
//   { label: 'Age 4–5', range: [4, 5] },
//   { label: 'Age 6–8', range: [6, 8] },
// ];

// const DURATION_FILTERS = [
//   { label: 'Short (2–3 min)', range: [120, 180] },
//   { label: 'Medium (4–6 min)', range: [240, 360] },
//   { label: 'Long (7–10 min)', range: [420, 600] },
// ];

// const Home = ({ navigation }) => {
//   const { playsUsed, incrementPlay } = useApp();
//   const { favorites } = useFavorites();

//   const TOTAL_DAYS = 7;
//   const [startDate, setStartDate] = useState(null);
//   const [daysUsed, setDaysUsed] = useState(0);
//   const [query, setQuery] = useState('');
//   const [filters, setFilters] = useState({
//     category: null,
//     age: null,
//     duration: null,
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [activeTab, setActiveTab] = useState('All');
//   const [recentlyPlayed, setRecentlyPlayed] = useState([]);
//   const [trialEnded, setTrialEnded] = useState(false);


//   // normalize JSON
//   const normalizeStories = data =>
//     data
//       .filter(s => s.type === 'Story')
//       .map((s, index) => ({
//         id: index + 1,
//         title: s.story_id.replace(/_/g, ' '),
//         categories: s.categories,
//         age_min: s.age_min,
//         age_max: s.age_max || s.age_min,
//         duration: s.duration_s,
//         audio_url: s.assets?.final_m4a_url,
//         image_url: s.image_url || null,
//         description: s.description || '',
//         isPro: s.isPro || false,
//         tonightPic: s.tonightPic || false,
//       }));

//   const allStories = normalizeStories(storiesJson);

//   // auto start trial on mount
//   useEffect(() => {
//     if (!startDate) {
//       setStartDate(new Date().toISOString());
//     }
//   }, []);

//   // free trial countdown
//   useEffect(() => {
//     if (startDate) {
//       const updateDays = () => {
//         const now = new Date();
//         const diffDays = Math.floor(
//           (now - new Date(startDate)) / (1000 * 60 * 60 * 24),
//         );
//         setDaysUsed(Math.min(diffDays, TOTAL_DAYS));
//         if (diffDays >= TOTAL_DAYS) {
//           setTrialEnded(true);
//         }
//       };
//       updateDays();
//       const interval = setInterval(updateDays, 1000 * 60 * 60);
//       return () => clearInterval(interval);
//     }
//   }, [startDate]);

//   const MIN_PROGRESS = 20;
//   const progress = startDate
//     ? MIN_PROGRESS + (daysUsed / TOTAL_DAYS) * (100 - MIN_PROGRESS)
//     : MIN_PROGRESS;

//   const handleProCardPress = story => {
//     if (story.isPro) {
//       if (playsUsed >= 3) {
//         alert('⚠️ You’ve already used all 3 Pro plays!');
//         return;
//       }
//       incrementPlay();
//     }
//     setRecentlyPlayed(prev => {
//       const updated = [story, ...prev.filter(s => s.id !== story.id)];
//       return updated.slice(0, 10);
//     });
//     navigation.navigate('StoryDetail', { story });
//   };

//   const applyFilters = (stories, text = query, activeFilters = filters) => {
//     let filtered = [...stories];
//     if (text.trim() !== '') {
//       filtered = filtered.filter(s =>
//         s.title.toLowerCase().includes(text.toLowerCase()),
//       );
//     }
//     if (activeFilters.category) {
//       filtered = filtered.filter(s =>
//         s.categories.includes(activeFilters.category),
//       );
//     }
//     if (activeFilters.age) {
//       filtered = filtered.filter(
//         s =>
//           s.age_min >= activeFilters.age[0] &&
//           s.age_max <= activeFilters.age[1],
//       );
//     }
//     if (activeFilters.duration) {
//       filtered = filtered.filter(
//         s =>
//           s.duration >= activeFilters.duration[0] &&
//           s.duration <= activeFilters.duration[1],
//       );
//     }
//     return filtered;
//   };

//   const getTabStories = () => {
//     switch (activeTab) {
//       case 'Favourites':
//         return applyFilters(favorites);
//       case 'Recently Played':
//         return applyFilters(recentlyPlayed);
//       default:
//         return applyFilters(allStories);
//     }
//   };

//   const StoryCard = ({ story }) => (
     
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => handleProCardPress(story)}
//     >
//       <View style={styles.imageWrapper}>
//         {story.image_url ? (
//           <Image
//             source={{ uri: story.image_url }}
//             style={styles.homeImage}
//             resizeMode="cover"
//           />
//         ) : (
//           <View style={styles.noImageBox}>
//             <Text>No Image</Text>
//           </View>
//         )}

//         {/* Tonight's Pick Badge */}
//         {story.tonightPic && (
//           <View style={styles.tonightBadge}>
//             <Text style={styles.tonightBadgeText}>Tonight's Pick</Text>
//           </View>
//         )}

//         {/* Pro Badge (already there) */}
//         {story.isPro && (
//           <LinearGradient
//             colors={['#A78BFA', '#FA8B8B']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.proBadge}
//           >
//             <Text style={styles.proBadgeText}>PRO</Text>
//           </LinearGradient>
//         )}
//       </View>

//       <View style={styles.cardContent}>
//         <Text style={styles.title}>{story.title}</Text>
//         <Text style={styles.category}>{story.categories.join(', ')}</Text>
//         <Text style={styles.category}>
//           {story.age_min}–{story.age_max} yrs ·{' '}
//           {(story.duration / 60).toFixed(0)} min
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );




//   const renderFilters = () =>
//     showFilters && (
//       <>
//         <View style={styles.filterRow}>
//           {CATEGORY_FILTERS.map(cat => (
//             <TouchableOpacity
//               key={cat}
//               style={[
//                 styles.filterChip,
//                 filters.category === cat && styles.filterChipActive,
//               ]}
//               onPress={() =>
//                 setFilters({
//                   ...filters,
//                   category: filters.category === cat ? null : cat,
//                 })
//               }
//             >
//               <Text
//                 style={[
//                   styles.filterText,
//                   filters.category === cat && styles.filterTextActive,
//                 ]}
//               >
//                 {cat}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <View style={styles.filterRow}>
//           {AGE_FILTERS.map(age => (
//             <TouchableOpacity
//               key={age.label}
//               style={[
//                 styles.filterChip,
//                 filters.age?.[0] === age.range[0] && styles.filterChipActive,
//               ]}
//               onPress={() =>
//                 setFilters({
//                   ...filters,
//                   age: filters.age?.[0] === age.range[0] ? null : age.range,
//                 })
//               }
//             >
//               <Text
//                 style={[
//                   styles.filterText,
//                   filters.age?.[0] === age.range[0] && styles.filterTextActive,
//                 ]}
//               >
//                 {age.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <View style={styles.filterRow}>
//           {DURATION_FILTERS.map(dur => (
//             <TouchableOpacity
//               key={dur.label}
//               style={[
//                 styles.filterChip,
//                 filters.duration?.[0] === dur.range[0] &&
//                   styles.filterChipActive,
//               ]}
//               onPress={() =>
//                 setFilters({
//                   ...filters,
//                   duration:
//                     filters.duration?.[0] === dur.range[0] ? null : dur.range,
//                 })
//               }
//             >
//               <Text
//                 style={[
//                   styles.filterText,
//                   filters.duration?.[0] === dur.range[0] &&
//                     styles.filterTextActive,
//                 ]}
//               >
//                 {dur.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </>
//     );

//   return (
//     <GradientWrapper>
//       {/* Header */}
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginBottom: hp('2%'),
//         }}
//       >
//         <View>
//           <Text style={styles.welcome}>Welcome Back John</Text>
//           <Text style={styles.welcomeSubheading}>
//             Magical stories for every night
//           </Text>
//         </View>
//         <View style={{ flexDirection: 'column', marginTop: wp('-2%') }}>
//           <HalfCircleProgress playsUsed={playsUsed} />
//           <Text
//             style={{ fontWeight: 600, fontSize: RFValue(12), color: '#1F2024' }}
//           >
//             Free PLays
//           </Text>
//         </View>
//       </View>

//       {/* Free Trial */}
//       <View style={styles.freeProgressbar}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//           <View>
//             <Text style={{ fontWeight: '700', fontSize: 16 }}>Free Trial</Text>
//             {startDate ? (
//               <Text style={{ color: '#A78BFA' }}>
//                 {Math.max(TOTAL_DAYS - daysUsed, 0)} Days Left
//               </Text>
//             ) : (
//               <Text style={{ color: '#A78BFA' }}>7 Days Left</Text>
//             )}
//           </View>
//           <UpgradeBtn
//             tittle="Upgrade Plan"
//             onPress={() =>
//               navigation.navigate('TrialPaywall', { type: 'upgrade' })
//             }
//           />
//         </View>
//         <View style={styles.progressBar}>
//           <View style={[styles.progress, { width: `${progress}%` }]} />
//           <View style={[styles.thumb, { left: `${progress}%` }]} />
//         </View>
//       </View>

//       {/* Search */}
//       <View style={styles.SearchViewContainer}>
//         <View style={styles.searchContainer}>
//           <Icon name="search-outline" size={20} color="#2F3036" />
//           <TextInput
//             placeholder="Search"
//             value={query}
//             onChangeText={text => setQuery(text)}
//             style={{ color: '#71727A', flex: 1 }}
//             placeholderTextColor="#8F9098"
//           />
//         </View>
//         <TouchableOpacity
//           style={styles.optionView}
//           onPress={() => setShowFilters(!showFilters)}
//         >
//           <Icon name="options" size={22} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       {renderFilters()}

//       {/* Tabs */}
//       <View style={styles.tabRow}>
//         {['All', 'Favourites', 'Recently Played'].map(tab => (
//           <TouchableOpacity
//             key={tab}
//             style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
//             onPress={() => setActiveTab(tab)}
//           >
//             <Text
//               style={[
//                 styles.tabText,
//                 activeTab === tab && styles.tabTextActive,
//               ]}
//             >
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Stories */}
//       <FlatList
//         data={getTabStories()}
//         keyExtractor={item => item.id.toString()}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{
//           flexDirection: 'row',
//           flexWrap: 'wrap',
//           paddingBottom: hp('12%'),
//         }}
//         renderItem={({ item }) => <StoryCard story={item}
  
//         />}
//       />

//       {/* Trial Ended Modal */}
//       <Modal visible={trialEnded} transparent animationType="fade">
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalBox}>
//             <Text style={styles.modalTitle}>Trial Ended</Text>
//             <Text style={styles.modalMsg}>
//               Your 7-day free trial has expired. Upgrade now to continue
//               enjoying stories.
//             </Text>
//             <UpgradeBtn
//               tittle="Upgrade Now"
//               onPress={() => {
//                 setTrialEnded(false);
//                 navigation.navigate('TrialPaywall');
//               }}
//             />
//           </View>
//         </View>
//       </Modal>
//     </GradientWrapper>
//   );
// };

// const Font_Size = 18;
// const styles = StyleSheet.create({
//   welcome: {
//     fontWeight: '700',
//     fontSize: Font_Size,
//     lineHeight: Font_Size * 1.5,
//   },
//   welcomeSubheading: { fontWeight: '600', color: '#71727A', fontSize: 12 },
//   freeProgressbar: {
//     backgroundColor: 'rgba(167, 139, 250, 0.15)',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 12,
//     marginBottom: hp('2%'),
//   },

//   progressBar: {
//     height: 8,
//     backgroundColor: '#F8F9FE',
//     borderRadius: 3,
//     marginTop: 20,
//   },

//   progressBar: {
//     height: 10,
//     backgroundColor: '#F8F9FE',
//     borderRadius: 10,
//     marginTop: 20,
//     position: 'relative',
//   },

//   progress: {
//     height: '100%',
//     backgroundColor: '#A78BFA',
//     borderRadius: 10,
//   },

//   thumb: {
//     position: 'absolute',
//     top: -8.5,
//     width: wp('1%'),
//     height: hp('3%'),
//     borderRadius: 9,
//     backgroundColor: '#A78BFA',
//     transform: [{ translateX: -4 }],
//   },

//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     overflow: 'hidden',
//     marginBottom: 16,
//     width: wp('45%'),
//     marginLeft: wp('2%'),
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 3 },
   
//   },
//   proBadge: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 999,
//     zIndex: 2,
//   },
//   proBadgeText: {
//     color: '#fff',
//     fontSize: RFValue(12),
//     fontWeight: '700',
//     letterSpacing: 1,
//   },
//   tonightBadge: {
//     backgroundColor: '#A78BFA',
//     position: 'absolute',
//     top: 8,
//     left: 6,
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 999,
//     zIndex: 2,
//   },
//   tonightBadgeText: {
//     color: '#fff',
//     fontSize: RFValue(13),
//     fontWeight: '700',
//   },

//   homeImage: { width: '100%', height: hp('20%') },
//   noImageBox: {
//     width: '100%',
//     height: hp('20%'),
//     backgroundColor: '#ccc',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardContent: { padding: 10 },
//   title: { fontSize: RFValue(14), fontWeight: '700', color: '#1F2024' },
//   category: { fontSize: 12, color: '#8F9098', marginTop: 4 },
//   searchContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 24,
//     paddingHorizontal: 10,
//     marginBottom: 12,
//     height: 44,
//   },
//   SearchViewContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   optionView: {
//     backgroundColor: '#A78BFA',
//     borderRadius: 999,
//     height: 44,
//     width: 44,
//     marginLeft: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   filterRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 },
//   filterChip: {
//     backgroundColor: '#FFFFFF',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   filterChipActive: { backgroundColor: '#A78BFA' },
//   filterText: { color: '#2F3036', fontSize: 14 },
//   filterTextActive: { color: '#FFFFFF', fontWeight: '600' },
//   tabRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#FFFFFF',
//     paddingVertical: hp('1%'),
//     borderRadius: wp('16%'),
//     marginBottom: hp('2%'),
//     marginTop: hp('1%'),
//   },
//   tabBtn: {
//     paddingVertical: hp('1%'),
//     paddingHorizontal: wp('5%'),
//     borderRadius: 20,
//   },
//   tabBtnActive: { backgroundColor: '#A78BFA' },
//   tabText: { color: '#71727A', fontSize: 14, fontWeight: '700' },
//   tabTextActive: { color: '#FFFFFF', fontWeight: '600' },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalBox: {
//     width: wp('80%'),
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 16,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: RFValue(18),
//     fontWeight: '700',
//     marginBottom: 10,
//     color: '#1F2024',
//   },
//   modalMsg: {
//     fontSize: RFValue(14),
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
// });

// export default Home;






import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
    Modal,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import GradientWrapper from "../ReuseableComponents/GradientWrapper";
import UpgradeBtn from "../ReuseableComponents/UpgradeBtn";
import Icon from "react-native-vector-icons/Ionicons";
import storiesJson from "../assets/JsonFiles/stories.json";
import { useFavorites } from "../Context/FavoritesContext";
import HalfCircleProgress from "../Components/HalfCircleProgress";
import { useApp } from "../Context/RainbowProgress";
import LinearGradient from "react-native-linear-gradient";
import { Shadow } from "react-native-shadow-2";
const CATEGORY_FILTERS = [
    "Bedtime & Sleep",
    "Adventure & Exploration",
    "Friendship & Family",
    "Magic & Fantasy",
    "Animals & Nature",
];

const AGE_FILTERS = [
    { label: "Age 2–3", range: [2, 3] },
    { label: "Age 4–5", range: [4, 5] },
    { label: "Age 6–8", range: [6, 8] },
];

const DURATION_FILTERS = [
    { label: "Short (2–3 min)", range: [120, 180] },
    { label: "Medium (4–6 min)", range: [240, 360] },
    { label: "Long (7–10 min)", range: [420, 600] },
];

const Home = ({ navigation }) => {
    const { playsUsed, incrementPlay } = useApp();
    const { favorites } = useFavorites();

    const TOTAL_DAYS = 7;
    const [startDate, setStartDate] = useState(null);
    const [daysUsed, setDaysUsed] = useState(0);
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({
        category: null,
        age: null,
        duration: null,
    });
    const [showFilters, setShowFilters] = useState(false);
    const [activeTab, setActiveTab] = useState("All");
    const [recentlyPlayed, setRecentlyPlayed] = useState([]);
    const [trialEnded, setTrialEnded] = useState(false);

    // normalize JSON
    const normalizeStories = (data) =>
        data
            .filter((s) => s.type === "Story")
            .map((s, index) => ({
                id: index + 1,
                title: s.story_id.replace(/_/g, " "),
                categories: s.categories,
                age_min: s.age_min,
                age_max: s.age_max || s.age_min,
                duration: s.duration_s,
                audio_url: s.assets?.final_m4a_url,
                image_url: s.image_url || null,
                description: s.description || "",
                isPro: s.isPro || false,
                tonightPic: s.tonightPic || false
            }));

    const allStories = normalizeStories(storiesJson);

    // auto start trial on mount
    useEffect(() => {
        if (!startDate) {
            setStartDate(new Date().toISOString());
        }
    }, []);

    // free trial countdown
    useEffect(() => {
        if (startDate) {
            const updateDays = () => {
                const now = new Date();
                const diffDays = Math.floor(
                    (now - new Date(startDate)) / (1000 * 60 * 60 * 24)
                );
                setDaysUsed(Math.min(diffDays, TOTAL_DAYS));
                if (diffDays >= TOTAL_DAYS) {
                    setTrialEnded(true);
                }
            };
            updateDays();
            const interval = setInterval(updateDays, 1000 * 60 * 60);
            return () => clearInterval(interval);
        }
    }, [startDate]);

    const MIN_PROGRESS = 20;
    const progress = startDate
        ? MIN_PROGRESS + (daysUsed / TOTAL_DAYS) * (100 - MIN_PROGRESS)
        : MIN_PROGRESS;

    const handleProCardPress = (story) => {
        if (story.isPro) {
            if (playsUsed >= 3) {
                alert("⚠ You’ve already used all 3 Pro plays!");
                return;
            }
            incrementPlay();
        }
        setRecentlyPlayed((prev) => {
            const updated = [story, ...prev.filter((s) => s.id !== story.id)];
            return updated.slice(0, 10);
        });
        navigation.navigate("StoryDetail", { story });
    };

    const applyFilters = (stories, text = query, activeFilters = filters) => {
        let filtered = [...stories];
        if (text.trim() !== "") {
            filtered = filtered.filter((s) =>
                s.title.toLowerCase().includes(text.toLowerCase())
            );
        }
        if (activeFilters.category) {
            filtered = filtered.filter((s) =>
                s.categories.includes(activeFilters.category)
            );
        }
        if (activeFilters.age) {
            filtered = filtered.filter(
                (s) =>
                    s.age_min >= activeFilters.age[0] &&
                    s.age_max <= activeFilters.age[1]
            );
        }
        if (activeFilters.duration) {
            filtered = filtered.filter(
                (s) =>
                    s.duration >= activeFilters.duration[0] &&
                    s.duration <= activeFilters.duration[1]
            );
        }
        return filtered;
    };

    const getTabStories = () => {
        switch (activeTab) {
            case "Favourites":
                return applyFilters(favorites);
            case "Recently Played":
                return applyFilters(recentlyPlayed);
            default:
                return applyFilters(allStories);
        }
    };

    const StoryCard = ({ story }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleProCardPress(story)}
        >
            {story.tonightPic ? (
                <Shadow
                    distance={20}
                    offset={[0, 0]}
                    startColor={"rgba(67,4,255,0.4)"}   // purple glow
                    finalColor={"rgba(67,4,255,0)"}     // fade outward
                    style={{ borderRadius: 15, width: "100%" }}
                >
                    <View style={{ borderRadius: 12, overflow: "hidden" }}>
                        {story.image_url ? (
                            <Image
                                source={{ uri: story.image_url }}
                                style={styles.homeImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={styles.noImageBox}>
                                <Text>No Image</Text>
                            </View>
                        )}

                        {/* Tonight’s Pick badge */}
                        <View style={styles.tonightBadge}>
                            <Text style={styles.tonightBadgeText}>Tonight's Pick</Text>
                        </View>

                        {/* Pro badge */}
                        {story.isPro && (
                            <LinearGradient
                                colors={["#A78BFA", "#FA8B8B"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.proBadge}
                            >
                                <Text style={styles.proBadgeText}>PRO</Text>
                            </LinearGradient>
                        )}
                    </View>
                </Shadow>
            ) : (
                <View style={{ borderRadius: 12, overflow: "hidden" }}>
                    {story.image_url ? (
                        <Image
                            source={{ uri: story.image_url }}
                            style={styles.homeImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.noImageBox}>
                            <Text>No Image</Text>
                        </View>
                    )}

                    {/* Tonight’s Pick badge (no shadow case) */}
                    {story.tonightPic && (
                        <View style={styles.tonightBadge}>
                            <Text style={styles.tonightBadgeText}>Tonight's Pick</Text>
                        </View>
                    )}

                    {/* Pro badge */}
                    {story.isPro && (
                        <LinearGradient
                            colors={["#A78BFA", "#FA8B8B"]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.proBadge}
                        >
                            <Text style={styles.proBadgeText}>PRO</Text>
                        </LinearGradient>
                    )}
                </View>
            )}

            {/* Card Content */}
            <View style={styles.cardContent}>
                <Text style={styles.title}>{story.title}</Text>
                <Text style={styles.category}>{story.categories.join(", ")}</Text>
                <Text style={styles.category}>
                    {story.age_min}–{story.age_max} yrs · {(story.duration / 60).toFixed(0)} min
                </Text>
            </View>
        </TouchableOpacity>
    );



    const renderFilters = () =>
        showFilters && (
            <>
                <View style={styles.filterRow}>
                    {CATEGORY_FILTERS.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[
                                styles.filterChip,
                                filters.category === cat && styles.filterChipActive,
                            ]}
                            onPress={() =>
                                setFilters({
                                    ...filters,
                                    category: filters.category === cat ? null : cat,
                                })
                            }
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    filters.category === cat && styles.filterTextActive,
                                ]}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.filterRow}>
                    {AGE_FILTERS.map((age) => (
                        <TouchableOpacity
                            key={age.label}
                            style={[
                                styles.filterChip,
                                filters.age?.[0] === age.range[0] && styles.filterChipActive,
                            ]}
                            onPress={() =>
                                setFilters({
                                    ...filters,
                                    age:
                                        filters.age?.[0] === age.range[0] ? null : age.range,
                                })
                            }
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    filters.age?.[0] === age.range[0] &&
                                    styles.filterTextActive,
                                ]}
                            >
                                {age.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.filterRow}>
                    {DURATION_FILTERS.map((dur) => (
                        <TouchableOpacity
                            key={dur.label}
                            style={[
                                styles.filterChip,
                                filters.duration?.[0] === dur.range[0] &&
                                styles.filterChipActive,
                            ]}
                            onPress={() =>
                                setFilters({
                                    ...filters,
                                    duration:
                                        filters.duration?.[0] === dur.range[0]
                                            ? null
                                            : dur.range,
                                })
                            }
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    filters.duration?.[0] === dur.range[0] &&
                                    styles.filterTextActive,
                                ]}
                            >
                                {dur.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </>
        );

    return (
        <GradientWrapper>
            {/* Header */}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: hp("2%"),
                }}
            >
                <View>
                    <Text style={styles.welcome}>Welcome Back John</Text>
                    <Text style={styles.welcomeSubheading}>
                        Magical stories for every night
                    </Text>
                </View>
                <View style={{ flexDirection: "column", marginTop: wp('-2%') }}>
                    <HalfCircleProgress playsUsed={playsUsed} />
                    <Text style={{ fontWeight: 600, fontSize: RFValue(12), color: '#1F2024' }}>Free PLays</Text>
                </View>
            </View>

            {/* Free Trial */}
            <View style={styles.freeProgressbar}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View>
                        <Text style={{ fontWeight: "700", fontSize: 16 }}>Free Trial</Text>
                        {startDate ? (
                            <Text style={{ color: "#A78BFA" }}>
                                {Math.max(TOTAL_DAYS - daysUsed, 0)} Days Left
                            </Text>
                        ) : (
                            <Text style={{ color: "#A78BFA" }}>7 Days Left</Text>
                        )}
                    </View>
                    <UpgradeBtn
                        tittle="Upgrade Plan"
                        onPress={() => navigation.navigate('TrialPaywall', { type: "upgrade" })}
                    />
                </View>
                <View style={styles.progressBar}>
                    <View style={[styles.progress, { width: `${progress}%` }]} />
                    <View
                        style={[
                            styles.thumb,
                            { left: `${progress}%` }
                        ]}
                    />
                </View>

            </View>

            {/* Search */}
            <View style={styles.SearchViewContainer}>
                <View style={styles.searchContainer}>
                    <Icon name="search-outline" size={20} color="#2F3036" />
                    <TextInput
                        placeholder="Search"
                        value={query}
                        onChangeText={(text) => setQuery(text)}
                        style={{ color: "#71727A", flex: 1 }}
                        placeholderTextColor="#8F9098"
                    />
                </View>
                <TouchableOpacity
                    style={styles.optionView}
                    onPress={() => setShowFilters(!showFilters)}
                >
                    <Icon name="options" size={22} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {renderFilters()}

            {/* Tabs */}
            <View style={styles.tabRow}>
                {["All", "Favourites", "Recently Played"].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.tabBtn,
                            activeTab === tab && styles.tabBtnActive,
                        ]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab && styles.tabTextActive,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Stories */}
            <FlatList
                data={getTabStories()}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    paddingBottom: hp("12%"),
                    marginTop: hp('1.5%')
                }}
                renderItem={({ item }) => <StoryCard story={item} />}
            />

            {/* Trial Ended Modal */}
            <Modal visible={trialEnded} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Trial Ended</Text>
                        <Text style={styles.modalMsg}>Your 7-day free trial has expired. Upgrade now to continue enjoying stories.</Text>
                        <UpgradeBtn
                            tittle="Upgrade Now"
                            onPress={() => {
                                setTrialEnded(false);
                                navigation.navigate("TrialPaywall");
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </GradientWrapper>
    );
};

const Font_Size = 18;
const styles = StyleSheet.create({
    welcome: { fontWeight: "700", fontSize: Font_Size, lineHeight: Font_Size * 1.5 },
    welcomeSubheading: { fontWeight: "600", color: "#71727A", fontSize: 12 },
    freeProgressbar: {
        backgroundColor: "rgba(167, 139, 250, 0.15)",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: hp("2%"),
    },

    progressBar: {
        height: 8,
        backgroundColor: "#F8F9FE",
        borderRadius: 3,
        marginTop: 20,
    },
    // progress: { height: "100%", backgroundColor: "#A78BFA" },
    progressBar: {
        height: 10,
        backgroundColor: "#F8F9FE",
        borderRadius: 10, // rounded track
        marginTop: 20,
        position: "relative",
    },

    progress: {
        height: "100%",
        backgroundColor: "#A78BFA",
        borderRadius: 10,
    },

    thumb: {
        position: "absolute",
        top: -8.5,
        width: wp('1%'),
        height: hp('3%'),
        borderRadius: 9,
        backgroundColor: "#A78BFA",
        transform: [{ translateX: -4 }],
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: 'visible',
        marginBottom: 16,
        width: wp("45%"),
        marginLeft: wp("2%"),
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    proBadge: {
        position: "absolute",
        top: 8,
        right: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        zIndex: 2,
    },
    proBadgeText: {
        color: "#fff",
        fontSize: RFValue(12),
        fontWeight: "700",
        letterSpacing: 1,
    },
    tonightBadge: {
        backgroundColor: "#A78BFA",
        position: "absolute",
        top: 8,
        left: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        zIndex: 2,
    },
    tonightBadgeText: {
        color: "#fff",
        fontSize: RFValue(13),
        fontWeight: '700'
    },
    homeImage: { width: "100%", height: hp("20%") },
    noImageBox: {
        width: "100%",
        height: hp("20%"),
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
    },
    cardContent: { padding: 10 },
    title: { fontSize: RFValue(14), fontWeight: "700", color: "#1F2024" },
    category: { fontSize: 12, color: "#8F9098", marginTop: 4 },
    searchContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 44,
    },
    SearchViewContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    optionView: {
        backgroundColor: "#A78BFA",
        borderRadius: 999,
        height: 44,
        width: 44,
        marginLeft: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    filterRow: { flexDirection: "row", flexWrap: "wrap", marginVertical: 8 },
    filterChip: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    filterChipActive: { backgroundColor: "#A78BFA" },
    filterText: { color: "#2F3036", fontSize: 14 },
    filterTextActive: { color: "#FFFFFF", fontWeight: "600" },
    tabRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#FFFFFF",
        paddingVertical: hp("1%"),
        borderRadius: wp("16%"),
        marginBottom: hp("1%"),
        marginTop: hp("1%"),
    },
    tabBtn: {
        paddingVertical: hp("1%"),
        paddingHorizontal: wp("5%"),
        borderRadius: 20,
    },
    tabBtnActive: { backgroundColor: "#A78BFA" },
    tabText: { color: "#71727A", fontSize: 14, fontWeight: "700" },
    tabTextActive: { color: "#FFFFFF", fontWeight: "600" },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        width: wp("80%"),
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: RFValue(18),
        fontWeight: "700",
        marginBottom: 10,
        color: "#1F2024",
    },
    modalMsg: {
        fontSize: RFValue(14),
        color: "#555",
        textAlign: "center",
        marginBottom: 20,
    },
});

export default Home;
