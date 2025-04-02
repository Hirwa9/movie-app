import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

// Resources
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

// Services
import useFetch from "@/services/useFetch";
import { fetchMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "@/services/api";
// import { getTrendingMovies } from "@/services/appwrite";

// Components
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  // Destruct and rename movies data, from the useFetch hook
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(
    () => fetchMovies({ query: '' })
  );

  // Get trending movies
  // const { data: trendingMovies, loading: trendingLoading, error: trendingError } = useFetch(getTrendingMovies);
  const { data: trendingMovies, loading: trendingLoading, error: trendingError } = useFetch(fetchTrendingMovies);

  // Get top rated movies
  const { data: topratedMovies, loading: topratedLoading, error: topratedError } = useFetch(fetchTopRatedMovies);

  // Get upcoming movies
  const { data: upcomingMovies, loading: upcomingLoading, error: upcomingError } = useFetch(fetchUpcomingMovies);

  // console.log(upcomingMovies);

  return (
    <View className="flex-1 w-full h-full bg-primary"
    >
      <Image source={images.bg} className="absolute w-full h-full z-0" />
      {/* Page head */}
      <ScrollView className="min-w-[80%]">
        <Image source={icons.logo} className="w-12 h-10 mt-10 mb-5 mx-auto" />

        {moviesLoading || trendingLoading || upcomingLoading ? (
          <View className='flex-col min-h-[50vh] items-center'>
            <ActivityIndicator size="large" color="#0000ff" className="my-auto" />
          </View>
        ) : moviesError || trendingError || upcomingError ? (
          <Text className='text-red-500 px-5 py-3'>
            Error : {moviesError?.message || trendingError?.message || upcomingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            {/* Content */}

            {/* Search bar */}
            <SearchBar onPress={() => router.push("/search")} placeholder="Search for a movie" className="mx-5" />

            {/* Top 20 trending movies */}
            {trendingMovies && (
              <View className="pb-42 px-5">
                <View className="mt-10">
                  <Text className="text-xl text-white font-bold mt-5 mb-3">Trending</Text>
                </View>

                <FlatList
                  className="mb-4 mt-2"
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  data={trendingMovies}
                  // data={
                  //   Object.values(
                  //     trendingMovies?.reduce((acc, movie) => {
                  //       // @ts-ignore
                  //       if (!acc[movie.movie_id] || acc[movie.movie_id].count < movie.count) {
                  //         // @ts-ignore
                  //         acc[movie.movie_id] = movie; // Keep the movie with the highest count
                  //       }
                  //       return acc;
                  //     }, {}) // Use an object to group movies by movie_id
                  //     // @ts-ignore
                  //   ).sort((a, b) => a.count - a.count) // Sort by count (descending)
                  // }

                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item, index) => `${item.id}_${index}`}
                />
              </View>
            )}

            {/* Latest movies */}
            {movies && (
              <View className="pb-42 px-5">
                <Text className="text-xl text-white font-bold mt-5 mb-3">
                  Latest movies
                </Text>

                <FlatList
                  className="flex-1 mt-2"
                  data={movies}
                  renderItem={({ item }) => (
                    <MovieCard {...item} />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10
                  }}
                  scrollEnabled={false}
                  contentContainerStyle={{
                    paddingBottom: 10,
                  }}
                  showsVerticalScrollIndicator={false}
                />
              </View>
            )}

            {/* Top 20 trending movies */}
            {upcomingMovies && (
              <View className="pb-42 px-5">
                <View className="mt-10">
                  <Text className="text-xl text-white font-bold mt-5 mb-3">Upcoming</Text>
                </View>

                <FlatList
                  className="mb-4 mt-2"
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  data={upcomingMovies}

                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item, index) => `${item.id}_${index}`}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
