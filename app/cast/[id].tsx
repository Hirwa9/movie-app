import { View, Text, ScrollView, ActivityIndicator, Image, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { fetchCastDetails, fetchCastMovieCredits } from '@/services/api';
import useFetch from '@/services/useFetch';

// Components
import BackButton from '@/components/BackButton';
import Header from '@/components/Header';
import TrendingCard from '@/components/TrendingCard';

const CastDetails = () => {

    // Get person id
    const { id } = useLocalSearchParams();

    // Get persons details
    const { data: personDetails, loading: personDetailsLoading, error: personDetailsError } =
        useFetch(() => fetchCastDetails(id as string));

    // Get persons movie credits
    const { data: personMovieCredits, loading: personMovieCreditsLoading, error: personMovieCreditsError } =
        useFetch(() => fetchCastMovieCredits(id as string));

    return (
        <View className='bg-primary flex-1'>
            <Header name="heart-outline" />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 80,
                }}
            >
                {personDetailsLoading || personMovieCreditsLoading ? (
                    <View className='flex-col min-h-[75vh] items-center'>
                        <ActivityIndicator size="large" color="#0000ff" className="my-auto" />
                    </View>
                ) : !personDetailsError || !personMovieCreditsError ? (
                    <>
                        <View className='relative px-5'>
                            {/* Person profile image */}
                            <Image
                                source={{
                                    uri: `https://image.tmdb.org/t/p/w500${personDetails?.profile_path}`
                                }}
                                className='w-[80vw] mb-8 aspect-square border-4 border-gray-500 shadow-xl shadow-slate-600 rounded-full mx-auto'
                                resizeMode='cover'
                            />
                            {/* Name and place of birth */}
                            <View className='items-center'>
                                <Text className='text-center text-3xl font-bold text-white'>{personDetails?.name}</Text>
                                <Text className='text-center text-sm font-bold text-light-300'>{personDetails?.place_of_birth}</Text>
                            </View>

                            {/*  */}
                            <View className='flex-row items-center justify-between overflow-auto mt-5 p-4 bg-white/10 rounded-full'>
                                <View className='items-center px-2 border-e-[2.5px] border-white/30'>
                                    <Text className='text-center text-md font-bold text-white'>Gender</Text>
                                    <Text className='text-center text-sm font-bold text-light-300'>
                                        {
                                            personDetails?.gender ?
                                                (personDetails?.gender === 1 ? "Female" : "Male")
                                                : 'N/A'
                                        }
                                    </Text>
                                </View>
                                <View className='items-center px-2 border-e-[2.5px] border-white/30'>
                                    <Text className='text-center text-md font-bold text-white'>Birthday</Text>
                                    <Text className='text-center text-sm font-bold text-light-300'>
                                        {personDetails?.birthday || 'N/A'}
                                    </Text>
                                </View>
                                <View className='items-center px-2 border-e-[2.5px] border-white/30'>
                                    <Text className='text-center text-md font-bold text-white'>Known for</Text>
                                    <Text className='text-center text-sm font-bold text-light-300'>
                                        {personDetails?.known_for_department || 'N/A'}
                                    </Text>
                                </View>
                                <View className='items-center px-2'>
                                    <Text className='text-center text-md font-bold text-white'>Popularity</Text>
                                    <Text className='text-center text-sm font-bold text-light-300'>
                                        {personDetails?.popularity?.toFixed(2) || 'N/A'}
                                    </Text>
                                </View>
                            </View>

                            {/* Biography */}
                            <View className='flex-col items-start justify-center mt-5'>
                                <Text className='text-white font-bold text-xl'>
                                    Biography
                                </Text>
                                <Text className='text-light-100 font-semibold text-sm mt-2'>
                                    {personDetails?.biography || 'N/A'}
                                </Text>
                            </View>

                            {/* Movie credits */}
                            <View className='flex-col items-start justify-center mt-5'>
                                <Text className='text-white font-bold text-xl my-5'>
                                    Movies
                                </Text>

                                <FlatList
                                    className="mb-4 mt-2"
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    ItemSeparatorComponent={() => <View className="w-4" />}
                                    data={personMovieCredits?.cast}
                                    renderItem={({ item, index }) => (
                                        <TrendingCard movie={item} index={index} media_type={item?.media_type} />
                                    )}
                                    keyExtractor={(item, index) => `${item.id}_${index}`}
                                />
                            </View>
                        </View>
                    </>
                ) : (
                    <Text className="text-red-500 px-5 py-3">
                        Error: {personDetailsError?.message || personMovieCreditsError?.message}
                    </Text>
                )}
            </ScrollView>

            {/* Back button */}
            <BackButton />
        </View>
    )
}

export default CastDetails;