import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';
import GradientWrapper from '../ReuseableComponents/GradientWrapper';
import UpgradeBtn from '../ReuseableComponents/UpgradeBtn';
import Icon from 'react-native-vector-icons/Ionicons';
import storiesJson from '../assets/JsonFiles/stories.json';
import { useFavorites } from '../Context/FavoritesContext';
import HalfCircleProgress from '../Components/HalfCircleProgress';
import { useApp } from '../Context/RainbowProgress';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../ReuseableComponents/CustomButton';
const M1 = require('../assets/M1.png');
const M2 = require('../assets/M2.png');
const CATEGORY_FILTERS = [
  'Bedtime & Sleep',
  'Adventure & Exploration',
  'Friendship & Family',
  'Magic & Fantasy',
  'Animals & Nature',
];

const AGE_FILTERS = [
  { label: 'Age 2–3', range: [2, 3] },
  { label: 'Age 4–5', range: [4, 5] },
  { label: 'Age 6–8', range: [6, 8] },
];

const DURATION_FILTERS = [
  { label: 'Short (2–3 min)', range: [120, 180] },
  { label: 'Medium (4–6 min)', range: [240, 360] },
  { label: 'Long (7–10 min)', range: [420, 600] },
];

const Home = ({ navigation }) => {
  const { playsUsed, incrementPlay } = useApp();
  const { favorites } = useFavorites();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const TOTAL_DAYS = 6;
  const [startDate, setStartDate] = useState(null);
  const [daysUsed, setDaysUsed] = useState(0);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: null,
    age: null,
    duration: null,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [trialEnded, setTrialEnded] = useState(false);

  const normalizeStories = data =>
    data
      .filter(s => s.type === 'Story')
      .map((s, index) => ({
        id: index + 1,
        title: s.story_id.replace(/_/g, ' '),
        categories: s.categories,
        age_min: s.age_min,
        age_max: s.age_max || s.age_min,
        duration: s.duration_s,
        audio_url: s.assets?.final_m4a_url,
        image_url: s.image_url || null,
        description: s.description || '',
        isPro: s.isPro || false,
        tonightPic: s.tonightPic || false,
      }));

  const allStories = normalizeStories(storiesJson);

  useEffect(() => {
    if (!startDate) {
      setStartDate(new Date().toISOString());
    }
  }, []);

  useEffect(() => {
    if (startDate) {
      const updateDays = () => {
        const now = new Date();
        const diffDays = Math.floor(
          (now - new Date(startDate)) / (1000 * 60 * 60 * 24),
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

  const handleProCardPress = story => {
    if (story.isPro) {
      if (playsUsed >= 3) {
        alert('⚠ You’ve already used all 3 Pro plays!');
        return;
      }
      incrementPlay();
    }
    setRecentlyPlayed(prev => {
      const updated = [story, ...prev.filter(s => s.id !== story.id)];
      return updated.slice(0, 10);
    });
    navigation.navigate('StoryDetail', { story });
  };

  const applyFilters = (stories, text = query, activeFilters = filters) => {
    let filtered = [...stories];
    if (text.trim() !== '') {
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(text.toLowerCase()),
      );
    }
    if (activeFilters.category) {
      filtered = filtered.filter(s =>
        s.categories.includes(activeFilters.category),
      );
    }
    if (activeFilters.age) {
      filtered = filtered.filter(
        s =>
          s.age_min >= activeFilters.age[0] &&
          s.age_max <= activeFilters.age[1],
      );
    }
    if (activeFilters.duration) {
      filtered = filtered.filter(
        s =>
          s.duration >= activeFilters.duration[0] &&
          s.duration <= activeFilters.duration[1],
      );
    }
    return filtered;
  };

  const getTabStories = () => {
    switch (activeTab) {
      case 'Favourites':
        return applyFilters(favorites);
      case 'Recently Played':
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
          distance={10}
          offset={[0, 0]}
          startColor={'rgba(67,4,255,0.4)'}
          finalColor={'rgba(67,4,255,0)'}
          style={{ borderRadius: wp('5%'), width: '100%' }}
        >
          <View style={{ borderRadius: wp('3%'), overflow: 'hidden' }}>
            {story.image_url ? (
              <Image
                source={{ uri: story.image_url }}
                style={[
                  styles.homeImage,
                  {
                    borderWidth: 3,
                    borderColor: '#A78BFA',
                    borderRadius: wp('3%'),
                  },
                ]}
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
                colors={['#FA8B8B', '#A78BFA']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.proBadge}
              >
                <Text style={styles.proBadgeText}>PRO</Text>
              </LinearGradient>
            )}
          </View>
        </Shadow>
      ) : (
        <View style={{ borderRadius: 12, overflow: 'hidden' }}>
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
              colors={['#A78BFA', '#FA8B8B']}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 0 }}
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
        <Text style={styles.category}>{story.categories}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFilters = () =>
    showFilters && (
      <>
        <View style={styles.filterRow}>
          {CATEGORY_FILTERS.map(cat => (
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
          {AGE_FILTERS.map(age => (
            <TouchableOpacity
              key={age.label}
              style={[
                styles.filterChip,
                filters.age?.[0] === age.range[0] && styles.filterChipActive,
              ]}
              onPress={() =>
                setFilters({
                  ...filters,
                  age: filters.age?.[0] === age.range[0] ? null : age.range,
                })
              }
            >
              <Text
                style={[
                  styles.filterText,
                  filters.age?.[0] === age.range[0] && styles.filterTextActive,
                ]}
              >
                {age.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.filterRow}>
          {DURATION_FILTERS.map(dur => (
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
                    filters.duration?.[0] === dur.range[0] ? null : dur.range,
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
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: hp('2%'),
        }}
      >
        <View style={{ marginTop: hp('1.5%'), marginLeft: wp('3%') }}>
          <TouchableOpacity  onPress={() => setModalVisible(true)}>
          <Text style={styles.welcome}>Welcome John</Text>
          </TouchableOpacity>
          <Text style={styles.welcomeSubheading}>
            Magical stories for every night
          </Text>
        </View>
        <View style={{ marginRight: wp('3%') }}>
          <HalfCircleProgress playsUsed={playsUsed} />
        </View>
      </View>

      {/* Free Trial */}
      <View style={styles.freeProgressbar}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <TouchableOpacity onPress={() => setModalVisible2(true)}>
            <Text style={{ fontWeight: 'bold', fontSize: RFValue(16) }}>
              Free Trial
            </Text>
            </TouchableOpacity>
            {startDate ? (
              <Text style={{ color: '#A78BFA' }}>
                {Math.max(TOTAL_DAYS - daysUsed, 0)} Days Left
              </Text>
            ) : (
              <Text
                style={{
                  color: '#A78BFA',
                  fontWeight: '800',
                  fontSize: RFValue(16),
                }}
              >
                6 Days Left
              </Text>
            )}
          </View>
          <UpgradeBtn
            tittle="Upgrade Plan"
            onPress={() =>
              navigation.navigate('TrialPaywall', { type: 'upgrade' })
            }
            
          />
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress}%` }]} />
          <View style={[styles.thumb, { left: `${progress}%` }]} />
        </View>
      </View>

      {/* Search */}
      <View style={styles.SearchViewContainer}>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={24}
            color="#2F3036"
            style={{ fontWeight: 'bold' }}
          />
          <TextInput
            placeholder="Search"
            value={query}
            onChangeText={text => setQuery(text)}
            style={{ color: '#71727A', flex: 1 }}
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
        {['All', 'Favourites', 'Recently Played'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
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
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingBottom: hp('12%'),
          marginTop: hp('1.5%'),
        }}
        renderItem={({ item }) => <StoryCard story={item} />}
      />
         
      {/*  Modal 1 */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient
            style={styles.modalContent}
            colors={['#FFF6D6', '#F4F2EB', '#FFFBEB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: hp('1%'),
              }}
            >
              <Text style={styles.modalTitle}>Reminder</Text>
              
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={22} color="#333" />
              </TouchableOpacity>
            </View>
             <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
             <Image
                source={M1}
                style={{width:wp('20%'),height:hp('12%'),alignItems:'center'}}
                resizeMode='contain'
              />
              <Text style={styles.modalTitle2}>Your trial ends <Text style={{color:'#A78BFA'}}>tomorrow</Text></Text>
              <Text style={[styles.modaldescription,{marginTop:hp('0.6%')}]}>Keep bedtime magical with </Text>
              <Text style={styles.modaldescription}>unlimited stories in your voice.</Text>
              </View>
           

            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.useBtn}>
                <Text style={[styles.btnText,{color:'#1F2024'}]}>Switch to monthly</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.selectBtn}>
                <Text style={styles.btnText}>Keep Subscription</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
      {/* Modal 2 */}
      <Modal
        visible={modalVisible2}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible2(false)}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient
            style={styles.modalContent}
            colors={['#FFF6D6', '#F4F2EB', '#FFFBEB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: hp('1%'),
              }}
            >
              <Text style={styles.modalTitle}>Upgrade</Text>
              
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setModalVisible2(false)}
              >
                <Ionicons name="close" size={22} color="#333" />
              </TouchableOpacity>
            </View>
             <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
             <Image
                source={M2}
                style={{width:wp('20%'),height:hp('10%'),alignItems:'center'}}
                resizeMode='contain'
              />
              <Text style={styles.modalTitle2}>Your trial has <Text style={{color:'#A78BFA'}}>ended</Text></Text>
              <Text style={[styles.modaldescription,{marginTop:hp('0.6%')}]}>Unlock unlimited bedtime with Pro </Text>

              </View>
           

             <CustomButton
               title="Upgrade Now"
                style={{marginBottom:hp('5%')}}
             />
          </LinearGradient>
        </View>
      </Modal>
    </GradientWrapper>
  );
};

const Font_Size = 18;
const styles = StyleSheet.create({
  welcome: {
    fontWeight: '700',
    fontSize: Font_Size,
    lineHeight: Font_Size * 1.5,
  },
  welcomeSubheading: { fontWeight: '600', color: '#71727A', fontSize: 12 },
  freeProgressbar: {
    backgroundColor: 'rgba(167, 139, 250, 0.15)',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('4%'),
    marginBottom: hp('2%'),
    marginHorizontal: wp('2%'),
    marginTop: hp('2%'),
  },

  progressBar: {
    height: 8,
    backgroundColor: '#F8F9FE',
    borderRadius: 3,
    marginTop: 20,
  },

  progressBar: {
    height: 10,
    backgroundColor: '#F8F9FE',
    borderRadius: 10, // rounded track
    marginTop: 20,
    position: 'relative',
  },

  progress: {
    height: '100%',
    backgroundColor: '#A78BFA',
    borderRadius: 10,
  },

  thumb: {
    position: 'absolute',
    top: hp('-1.2%'),
    width: wp('2%'),
    height: hp('3.5%'),
    borderRadius: wp('1.5%'),
    backgroundColor: '#A78BFA',
    transform: [{ translateX: -4 }],
  },

  card: {
    borderRadius: 12,
    overflow: 'visible',
    marginBottom: 16,
    width: wp('45%'),
    marginLeft: wp('1.8%'),
  },
  proBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 999,
    zIndex: 2,
  },
  proBadgeText: {
    color: '#fff',
    fontSize: RFValue(14),
    fontWeight: '700',
    letterSpacing: 1,
  },
  tonightBadge: {
    backgroundColor: '#A78BFA',
    position: 'absolute',
    top: 8,
    left: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    zIndex: 2,
  },
  tonightBadgeText: {
    color: '#fff',
    fontSize: RFValue(13),
    fontWeight: '700',
  },
  homeImage: { width: '100%', height: hp('16%') },
  noImageBox: {
    width: '100%',
    height: hp('20%'),
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: { padding: 10 },
  title: { fontSize: RFValue(14), fontWeight: '700', color: '#1F2024' },
  category: { fontSize: RFValue(14), color: '#8F9098', marginTop: hp('0.5%') },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 14,
    marginBottom: 10,
    height: 44,
  },
  SearchViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp('2%'),
  },
  optionView: {
    backgroundColor: '#A78BFA',
    borderRadius: 999,
    height: 44,
    width: 44,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 },
  filterChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipActive: { backgroundColor: '#A78BFA' },
  filterText: { color: '#2F3036', fontSize: 14 },
  filterTextActive: { color: '#FFFFFF', fontWeight: '600' },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: hp('1%'),
    borderRadius: wp('16%'),
    paddingHorizontal: wp('1%'),
    marginBottom: hp('1%'),
    marginTop: hp('1%'),
  },
  tabBtn: {
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('4%'),
  },
  tabBtnActive: { backgroundColor: '#A78BFA' },
  tabText: { color: '#71727A', fontSize: RFValue(12), fontWeight: '700' },
  tabTextActive: { color: '#FFFFFF', fontWeight: '600' },

  closeBtn: {
    alignSelf: 'flex-end',
    borderWidth: 1.5,
    borderRadius: 999,
    marginRight: wp('1%'),
    marginBottom: hp('1.4%'),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
      height:hp('52%'),
    // maxHeight: hp('55%'),
    
  },
  modalTitle: {
    fontSize: RFValue(18),
    fontWeight: '700',
    color:'#000000',
    marginBottom: 16,
    textAlign: 'center',
    marginRight: wp('22%'),
  },
   modalTitle2: {
    fontSize: RFValue(23),
    fontWeight: 'bold',
    marginTop:hp('1%'),
    color:'#2F3036',
  },
  modaldescription:{
    color:'#71727A',
    fontSize:RFValue(16),
    fontWeight:'semibold',
  },
  modalBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 34,
  },
  useBtn: {
    backgroundColor: '#FEC89A',
    flex: 1,
    marginRight: 10,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  selectBtn: {
    backgroundColor: '#A78BFA',
    flex: 1,
    marginLeft: 10,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});

export default Home;
