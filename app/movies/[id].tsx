import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

// Resources
import { icons } from '@/constants/icons';

// Services
import useFetch from '@/services/useFetch';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies } from '@/services/api';

// Components
import CastCard from '@/components/CastCard';
import TrendingCard from '@/components/TrendingCard';
import BackButton from '@/components/BackButton';
import Header from '@/components/Header';

const MovieDetails = () => {

    // Get movie id
    const { id } = useLocalSearchParams();

    // Get movies details
    const { data: movie, loading: detailsLoading, error: detailsError } =
        useFetch(() => fetchMovieDetails(id as string))
    // console.log(movie);

    // Get movies credits
    const { data: movieCredits, loading: movieCreditsLoading, error: movieCreditsError } =
        useFetch(() => fetchMovieCredits(id as string))

    // Get similar movies
    const { data: similarMovies, loading: similarMoviesLoading, error: similarMoviesError } =
        useFetch(() => fetchSimilarMovies(id as string))

    // Movie info component
    interface MovieInfoProps {
        label: string;
        value?: string | number | null;
    }

    const MovieInfo = ({ label, value }: MovieInfoProps) => (
        <View className='flex-col items-start justify-center mt-5'>
            <Text className='text-light-200 font-normal text-sm'>
                {label}
            </Text>
            <Text className='text-light-100 font-semibold text-sm mt-2'>
                {value || 'N/A'}
            </Text>
        </View>
    )

    return (
        <View className='bg-primary flex-1'>
            <Header fixed />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 80,
                }}
            >
                {detailsLoading || movieCreditsLoading || similarMoviesLoading ? (
                    <View className='flex-col min-h-[75vh] items-center'>
                        <ActivityIndicator size="large" color="#0000ff" className="my-auto" />
                    </View>
                ) : !detailsError || !movieCreditsError || !similarMoviesError ? (
                    <>
                        {/* Movie poster */}
                        <View className='h-[550px] max-h-[70vh]'>
                            <Image
                                source={{
                                    uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                                }}
                                className='w-full h-full'
                            />
                        </View>

                        {/* Movie main details */}
                        <View className='flex-col items-start justify-center mt-5 px-5'>
                            <Text className='text-white font-bold text-xl'>{movie?.title}</Text>
                            <View className='flex-row items-start gap-x-1 mt-2'>
                                <Text className='text-light-200 text-sm'>
                                    {movie?.release_date?.split('-')[0]}
                                </Text>
                                <Text className='text-light-200 text-sm'>
                                    {movie?.runtime}m
                                </Text>
                            </View>
                            <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
                                <Image source={icons.star} className="size-4" />
                                <Text className='text-white font-bold text-sm'>
                                    {Math.round(movie?.vote_average ?? 0)}/10
                                </Text>
                                <Text className='text-light-200 text-sm'>
                                    ({movie?.vote_count} votes)
                                </Text>
                            </View>
                            <MovieInfo label='Overview' value={movie?.overview} />
                            <MovieInfo label='Genres' value={movie?.genres?.map(g => g.name).join(' - ') || 'N/A'} />
                            <View className='flex flex-row gap-4'>
                                <MovieInfo label='Budget' value={`$${(movie?.budget ?? 0) / 1_000_000} millions`} />
                                <MovieInfo label='Revenue' value={`$${Math.round(movie?.revenue ?? 0) / 1_000_000} millions`} />
                            </View>
                            <MovieInfo label='Production Companies' value={movie?.production_companies.map(c => c?.name).join(' - ') || 'N/A'} />
                        </View>

                        {/* Cast */}
                        <View className='mt-5 px-5'>
                            <Text className='text-white font-bold text-xl'>
                                Cast
                            </Text>
                            <FlatList
                                className="flex-1 my-4"
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => <View className="w-4" />}
                                data={movieCredits?.cast}

                                renderItem={({ item }) => (
                                    <CastCard {...item} />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                            />
                        </View>

                        {/* Top 20 trending movies */}
                        {similarMovies && similarMovies?.results.length > 0 && (
                            <View className="pb-42 px-5">
                                <Text className='text-white font-bold text-xl my-5'>
                                    Similar movies
                                </Text>
                                <FlatList
                                    className="mb-4 mt-2"
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    ItemSeparatorComponent={() => <View className="w-4" />}
                                    data={similarMovies?.results?.slice(0, 10)}
                                    renderItem={({ item, index }) => (
                                        <TrendingCard movie={item} index={index} />
                                    )}
                                    keyExtractor={(item, index) => `${item.id}_${index}`}
                                />
                            </View>
                        )}
                    </>
                ) : (
                    <Text className="text-red-500 px-5 py-3">
                        Error: {detailsError?.message || movieCreditsError?.message || similarMoviesError?.message}
                    </Text>
                )}
            </ScrollView>

            {/* Back button */}
            <BackButton />
        </View>
    )
}
export default MovieDetails;