import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images} from '../../constants'
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import { EmptyState, SearchInput,  VideoCard } from '../../components';


const Bookmark = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary">
      <FlatList 
        data={posts}
        keyExtractor={(item)=> item.$id}
        renderItem={({item}) => (
          <VideoCard
          title={item.title}
          thumbnail={item.thumbnail}
          video={item.video}
          creator={item?.creator?.username}
          avatar={item?.creator?.avatar}
        />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-66">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-2xl text-white">
                  Saved Videos
                </Text>
                
              </View>
            </View>

            <SearchInput />

              

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos saved"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }

      />
    </SafeAreaView>
  );
};

export default Bookmark;