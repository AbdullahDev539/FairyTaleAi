


import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useFavorites } from '../Context/FavoritesContext';
import GradientWrapper from '../ReuseableComponents/GradientWrapper';
import RNFS from 'react-native-fs';
import UpgradeBtn from '../ReuseableComponents/UpgradeBtn';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useApp } from '../Context/RainbowProgress';
import { RFValue } from 'react-native-responsive-fontsize';

const Favorites = ({ navigation }) => {
  const { favorites, removeFromFavorites, addToFavorites } = useFavorites();
  const { playsUsed, incrementPlay } = useApp();
  const [downloading, setDownloading] = useState({});
  const [progressMap, setProgressMap] = useState({});

  const handleProCardPress = story => {
    if (story.isPro) {
      if (playsUsed >= 2) {
        alert('⚠️ You’ve already used all 3 Pro plays!');
        return;
      }
      incrementPlay();
    }
    navigation.navigate('StoryDetail', { story });
  };

  const handleDownload = async story => {
    try {
      // Start download simulation
      setDownloading(prev => ({ ...prev, [story.id]: true }));
      setProgressMap(prev => ({ ...prev, [story.id]: 0 }));

      let progress = 0;
      const interval = setInterval(() => {
        progress += 20; // faster simulation
        setProgressMap(prev => ({ ...prev, [story.id]: progress }));

        if (progress >= 100) {
          clearInterval(interval);

          const path = `${RNFS.DocumentDirectoryPath}/${story.id}.txt`;
          RNFS.writeFile(path, story.assets?.text || '', 'utf8')
            .then(() => {
              const updatedStory = { ...story, localPath: path };
              removeFromFavorites(story.id);
              addToFavorites(updatedStory);
              Alert.alert('Success', 'Story downloaded offline');
            })
            .catch(err => {
              console.log(err);
              Alert.alert('Error', 'Failed to save story offline');
            })
            .finally(() => {
              // stop download
              setDownloading(prev => ({ ...prev, [story.id]: false }));
            });
        }
      }, 1000);
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Download failed');
      setDownloading(prev => ({ ...prev, [story.id]: false }));
    }
  };

  const renderItem = ({ item }) => {
    const progress = progressMap[item.id] || 0;
    const isDownloading = downloading[item.id];
    const isDownloaded = !!item.localPath;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.imageWrapper}
          onPress={() => handleProCardPress(item)}
        >
          {item.image_url ? (
            <Image source={{ uri: item.image_url }} style={styles.storyImage} />
          ) : (
            <View style={[styles.storyImage, styles.imagePlaceholder]}>
              <Text>No Image</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => handleProCardPress(item)}
          >
            <View style={styles.playView}>
              <Ionicons name="play" size={wp('5%')} color="#fff" />
            </View>
          </TouchableOpacity>
        </TouchableOpacity>

        <View style={styles.infoColumn}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{item.categories}</Text>

          {/*  Progress bar visible while downloading */}
          {isDownloading && (
            <View style={styles.progressRow}>
              <View style={styles.progressWrapper}>
                <View
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />
              </View>
              <Text style={styles.percentage}>{progress}%</Text>
            </View>
          )}

          <View style={styles.buttonsRow}>
            {/* Remove button stays same */}
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => removeFromFavorites(item.id)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>

            {/* Download button shows only if not downloaded yet */}
            {!isDownloaded && (
              <UpgradeBtn
                tittle={'Download offline'}
                style={{
                  paddingHorizontal: wp('2.5%'),
                  opacity: isDownloading ? 0.6 : 1,
                }}
                icon={
                  <Ionicons name="lock-closed" size={wp('4%')} color="#fff" style={{marginRight:wp('1%')}} />
                }
                onPress={() => {
                  if (!isDownloading) handleDownload(item);
                }}
              />
            )}

            
            {isDownloaded && (
              <Text
                style={{
                  color: '#4CAF50',
                  fontWeight: '600',
                  alignSelf: 'center',
                }}
              >
                Downloaded
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  if (favorites.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No favorites yet!</Text>
      </View>
    );

  return (
    <GradientWrapper>
      <Text style={styles.favourites}>Favourites</Text>
      <FlatList
        data={favorites}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: wp('3%'),
        }}
      />
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  favourites: {
    color: '#1F2024',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: RFValue(14),
    fontWeight: '700',
    marginTop:hp('5%'),
  },
  card: {
    flexDirection: 'row',
    paddingVertical: hp('1%'),
    marginVertical: hp('1%'),
    borderRadius: 12,
    width: wp('94%'),
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  playView: {
    backgroundColor: '#A78BFA',
    borderRadius: 999,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  imageWrapper: {
  position: 'relative',
  width: wp('28%'),
  height: hp('12%'),
  justifyContent: 'center',
  alignItems: 'center',
},
storyImage: {
  width: '100%',
  height: '100%',
  borderRadius: 12,
},
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  playBtn: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
  infoColumn: {
    flex: 1,
    marginLeft: wp('3%'),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginTop:hp('1%'),
    color:'#1F2024',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.6%'),
  },
  progressWrapper: {
    width: wp('50%'),
    height: hp('1.4%'),
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: wp('3%'),
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#A78BFA',
  },
  percentage: {
    fontSize: RFValue(13),
    fontWeight: 'bold',
    color: '#1F2024',
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
    marginTop:hp('2.6%'),
  },
  removeBtn: {
    backgroundColor: '#A78BFA',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('2%'),
  },
  removeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: RFValue(12),
  },
  category: {
    fontSize: RFValue(14),
    color: '#71727A',
    fontWeight: 'bold',
  },
});

export default Favorites;

