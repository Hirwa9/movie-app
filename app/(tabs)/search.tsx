import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
// import { useRouter } from 'expo-router';

// Resorces
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Services
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { updateSearchCount } from '@/services/appwrite';

// Components
import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';

const Search = () => {
    // const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');

    // Destruct and rename movies data, from the useFetch hook
    const { data: movies, loading: moviesLoading, error: moviesError, refetch: loadMovies, reset } = useFetch(
        () => fetchMovies({ query: searchQuery }), false
    );

    // Dynamic and debounced refetch
    // when search query changes
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();
            } else {
                reset();
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
            <Image source={images.bg} className='flex-1 absolute w-full z-0 ' resizeMode='cover' />
            <FlatList
                className="px-5"

                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row items-center justify-center mt-3">
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

                        {moviesLoading ? (
                            <View className='flex-col min-h-[50vh] items-center'>
                                <ActivityIndicator size="large" color="#0000ff" className="my-auto" />
                            </View>
                        ) : !moviesError ? (
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
                    !moviesLoading && !moviesError ? (
                        <View className='mt-10 px-5'>
                            {searchQuery.trim() ? (
                                // No results
                                <View className='items-center mt-20'>
                                    <MaterialCommunityIcons name="movie-open-off-outline" size={60} color="#fca5a5" className="mb-8" />
                                    <Text className='text-center text-gray-300 max-w-[75%]'>No movies found. You can try something else.</Text>
                                </View>
                            ) : (
                                // Initial
                                <View className='items-center mt-20'>
                                    <MaterialCommunityIcons name="movie-search" size={60} color="#c084fc" className="mb-8" />
                                    <Text className='text-center text-gray-300 max-w-[75%]'>Go ahead and find your wishlist movies.</Text>
                                </View>
                            )}
                        </View>
                    ) : null
                }
                data={movies}
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