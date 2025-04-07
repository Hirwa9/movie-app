import { ActivityIndicator, FlatList, Image, RefreshControl, ScrollView, Text, View } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useRouter } from "expo-router";

// Resources
import { icons } from "@/constants/icons";

// Services
import useFetch from "@/services/useFetch";
import { fetchMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchTvSeries, fetchUpcomingMovies } from "@/services/api";
// import { getTrendingMovies } from "@/services/appwrite";

// Components
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";
import DotsPattern from "@/components/DotsPattern";

export default function Index() {
  const router = useRouter();

  /**
   * Destruct and rename data, obtained from the useFetch hook
   */

  // Get tv movies
  const { data: movies, loading: moviesLoading, error: moviesError, refetch: refetchMovies } = useFetch(
    () => fetchMovies({ query: '' })
  );

  // Get tv series
  const { data: tvSeries, loading: tvSeriesLoading, error: tvSeriesError, refetch: tvSeriesRefetch } = useFetch(
    () => fetchTvSeries({ query: '' })
  );

  // Get trending movies
  // const { data: trendingMovies, loading: trendingLoading, error: trendingError } = useFetch(getTrendingMovies);
  const { data: trendingMovies, loading: trendingLoading, error: trendingError, refetch: trendingMoviesRefetch } = useFetch(fetchTrendingMovies);

  // Get top rated movies
  const { data: topratedMovies, loading: topratedLoading, error: topratedError, refetch: topRatedMoviesRefetch } = useFetch(fetchTopRatedMovies);

  // Get upcoming movies
  const { data: upcomingMovies, loading: upcomingLoading, error: upcomingError, refetch: upcomingMoviesRefetch } = useFetch(fetchUpcomingMovies);

  // console.log(tvSeries);

  // Add media_type to movies and tv series
  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      movies?.forEach((movie: Movie) => {
        movie.media_type = 'movie';
      });
    }

    if (tvSeries?.length > 0 && tvSeries?.[0]) {
      tvSeries?.forEach((tv: Movie) => {
        tv.media_type = 'tv';
      });
    }
  }, [movies, tvSeries]);

  // Refresh functionality
  const refetching = useCallback(() => {
    refetchMovies();
    tvSeriesRefetch();
    trendingMoviesRefetch();
    topRatedMoviesRefetch();
    upcomingMoviesRefetch();
  }, []);

  return (
    <View className="flex-1 w-full h-full bg-primary relative isolate"
    >
      {/* Background */}
      {/* <DotsPattern /> */}
      {/* Page head */}
      <ScrollView className="min-w-[80%]">
        <Image source={icons.logo} className="w-12 h-10 mt-10 mb-5 mx-auto" />

        {moviesLoading || trendingLoading || upcomingLoading || tvSeriesLoading ? (
          <View className='flex-col min-h-[50vh] items-center'>
            <ActivityIndicator size="large" color="#0000ff" className="my-auto" />
          </View>
        ) : moviesError || trendingError || upcomingError || tvSeriesError ? (
          <Text className='text-red-500 px-5 py-3'>
            Error : {moviesError?.message || trendingError?.message || upcomingError?.message || tvSeriesError?.message}
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
                    <TrendingCard movie={item} index={index} media_type={item?.media_type} />
                  )}
                  keyExtractor={(item, index) => `${item.id}_${index}`}
                  refreshControl={
                    <RefreshControl
                      refreshing={trendingLoading}
                      onRefresh={refetching}
                    />
                  }
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
                  refreshControl={
                    <RefreshControl
                      refreshing={moviesLoading}
                      onRefresh={refetching}
                    />
                  }
                />
              </View>
            )}

            {/* Latest TV series */}
            {tvSeries && (
              <View className="pb-42 px-5">
                <Text className="text-xl text-white font-bold mt-5 mb-3">
                  TV series
                </Text>

                <FlatList
                  className="flex-1 mt-2"
                  data={tvSeries}
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
                  refreshControl={
                    <RefreshControl
                      refreshing={tvSeriesLoading}
                      onRefresh={refetching}
                    />
                  }
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
                    <TrendingCard movie={item} index={index} media_type={item?.media_type} />
                  )}
                  keyExtractor={(item, index) => `${item.id}_${index}`}
                  refreshControl={
                    <RefreshControl
                      refreshing={upcomingLoading}
                      onRefresh={refetching}
                    />
                  }
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}