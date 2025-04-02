import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { icons } from '@/constants/icons';

const MovieDetails = () => {
    // Get movie id
    const { id } = useLocalSearchParams();

    const { data: movie, loading: detailsLoading, error: detailsError } = useFetch(() => fetchMovieDetails(id as string))

    console.log(movie);

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
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 80,
                }}
            >
                {detailsLoading ? (
                    <View className='flex-col min-h-[75vh] items-center'>
                        <ActivityIndicator size="large" color="#0000ff" className="my-auto" />
                    </View>
                ) : !detailsError ? (
                    <>
                        <View className='h-[550px] max-h-[70vh]'>
                            <Image
                                source={{
                                    uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`
                                }}
                                className='w-full h-full'
                            />
                        </View>
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
                    </>
                ) : (
                    <Text className="text-red-500 px-5 py-3">
                        Error: {detailsError?.message}
                    </Text>
                )}
            </ScrollView>
            <TouchableOpacity
                className='absolute z-50 bottom-5 left-0 right-0 flex flex-row items-center justify-center gap-2 mx-5 bg-accent rounded-lg py-3.5'
                onPress={() => {
                    if (router.canGoBack()) {
                        router.back();
                    } else {
                        router.dismissTo('/');
                    }
                }}
            >
                <Image source={icons.arrow} className='size-5 rotate-180 mt-0.5' tintColor="#030014" />
                <Text className='text-primary font-semibold text-base'>Go back</Text>
            </TouchableOpacity>
        </View>
    )
}
export default MovieDetails;