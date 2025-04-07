import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { useRouter } from 'expo-router';

// Resorces
import { icons } from '@/constants/icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Services
import { fetchMovies, fetchTvSeries } from '@/services/api';
import useFetch from '@/services/useFetch';
import { updateSearchCount } from '@/services/appwrite';

// Components
import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';
import DotsPattern from '@/components/DotsPattern';

const Search = () => {
    // const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');

    // Destruct and rename movies data, from the useFetch hook
    const { data: movies, loading: moviesLoading, error: moviesError, refetch: loadMovies, reset: resetMovies } = useFetch(
        () => fetchMovies({ query: searchQuery }), false
    );
    // Destruct and rename movies data, from the useFetch hook
    const { data: tvSeries, loading: tvSeriesLoading, error: tvSeriesError, refetch: loadTvSeries, reset: resetTvSeries } = useFetch(
        () => fetchTvSeries({ query: searchQuery }), false
    );

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

    console.log(tvSeries);

    // Combine and sort movies and tv series data
    const combinedSearchResults = [...(movies || []), ...(tvSeries || [])];
    const sortedSearchResults = combinedSearchResults.sort((a, b) => b?.popularity - a?.popularity);

    // Debounced refetch when search query changes
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery.trim()) {
                // Refetch movies and tv series using a promise
                Promise.all([loadMovies(), loadTvSeries()])
                    .catch((error) => {
                        console.error('Error fetching data:', error);
                    });
            } else {
                resetMovies();
                resetTvSeries();
            }
        }, 700);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Dynamic trending updates
    useEffect(() => {
        if (movies?.length > 0 && movies?.[0]) {
            // update only is provided a search query
            if (searchQuery.trim() !== '') {
                updateSearchCount(searchQuery, movies[0]);
            }
        }
    }, [movies]);

    return (
        <View className='flex-1 bg-primary'>
            {/* Background */}
            {/* <DotsPattern /> */}
            <FlatList
                className="px-5"
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row items-center justify-center mt-5">
                            <Image source={icons.logo} className="w-12 h-10" />
                        </View>
                        <View className="my-5">
                            <SearchBar
                                placeholder="Search movies ..."
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                                showClearIcon={true}
                                clearValue={() => setSearchQuery('')}
                            />
                        </View>

                        {moviesLoading || tvSeriesLoading ? (
                            <View className='flex-col min-h-[50vh] items-center'>
                                <ActivityIndicator size="large" color="#0000ff" className="my-auto" />
                            </View>
                        ) : !moviesError || !tvSeriesError ? (
                            <>
                                {searchQuery.trim() && movies?.length > 0 && (
                                    <Text className="text-xl text-white font-bold">
                                        Search results for{' '}
                                        <Text className="text-accent">{searchQuery}</Text>
                                    </Text>
                                )}
                            </>
                        ) : (
                            <Text className="text-red-500 px-5 py-3">
                                Error: {moviesError?.message}
                            </Text>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !moviesLoading && !moviesError && !tvSeriesLoading && !tvSeriesError ? (
                        <View className='mt-10 px-5'>
                            {searchQuery.trim() ? (
                                // No results
                                <View className='items-center mt-20'>
                                    <MaterialCommunityIcons name="movie-open-off-outline" size={120} color="#fca5a5" className="mb-8" />
                                    <View className='max-w-[85%]'>
                                        <Text className='text-center text-gray-300 text-lg mb-3'>
                                            Oops! No results found.
                                        </Text>
                                        <Text className='text-center text-gray-400 text-[1rem]'>
                                            Try refining your search or using a different keyword!
                                        </Text>
                                    </View>
                                </View>
                            ) : (
                                // Initial
                                <View className='items-center mt-20'>
                                    <MaterialCommunityIcons name="movie-search" size={120} color="#c084fc" className="mb-8" />
                                    <Text className='text-center text-gray-300 text-[1rem] max-w-[85%]'>
                                        Looking for something to watch? Start exploring movies and TV shows now!
                                    </Text>
                                </View>
                            )}
                        </View>
                    ) : null
                }
                data={sortedSearchResults}
                // data={tvSeries}
                renderItem={({ item }) => (
                    <MovieCard {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap: 16,
                    paddingRight: 5,
                    marginVertical: 16
                }}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}
export default Search;