import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

// Resources
import { icons } from '@/constants/icons';

// Services
import useFetch from '@/services/useFetch';
import { fetchTvSeriesDetails, fetchSimilarTvSeries, fetchTvSeriesCredits } from '@/services/api';

// Components
import CastCard from '@/components/CastCard';
import TrendingCard from '@/components/TrendingCard';
import BackButton from '@/components/BackButton';
import Header from '@/components/Header';

const TvSeriesDetails = () => {
    // Get TV series ID
    const { id } = useLocalSearchParams();

    // Fetch TV series details
    const { data: tvSeries, loading: detailsLoading, error: detailsError } =
        useFetch(() => fetchTvSeriesDetails(id as string));

    // Get movies credits
    const { data: tvSerieCredits, loading: tvSerieCreditsLoading, error: tvSerieCreditsError } =
        useFetch(() => fetchTvSeriesCredits(id as string))

    // Fetch similar TV series
    const { data: similarTvSeries, loading: similarLoading, error: similarError } =
        useFetch(() => fetchSimilarTvSeries(id as string));

    console.log(tvSeries);

    // TV series info component
    interface TvSeriesInfoProps {
        label: string;
        value?: string | number | null;
    }

    const TvSeriesInfo = ({ label, value }: TvSeriesInfoProps) => (
        <View className='flex-col items-start justify-center mt-5'>
            <Text className='text-light-200 font-normal text-sm'>{label}</Text>
            <Text className='text-light-100 font-semibold text-sm mt-2'>{value || 'N/A'}</Text>
        </View>
    );

    return (
        <View className='bg-primary flex-1'>
            <Header fixed />
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 80,
                }}
            >
                {detailsLoading || tvSerieCreditsLoading || similarLoading ? (
                    <View className='flex-col min-h-[75vh] items-center'>
                        <ActivityIndicator size="large" color="#0000ff" className="my-auto" />
                    </View>
                ) : detailsError || tvSerieCreditsError || similarError ? (
                    <Text className="text-red-500 px-5 py-3">
                        Error: {detailsError?.message || tvSerieCreditsError?.message || similarError?.message}
                    </Text>
                ) : (
                    <>
                        {/* TV series poster */}
                        <View className='h-[550px] max-h-[70vh]'>
                            <Image
                                source={{
                                    uri: `https://image.tmdb.org/t/p/w500${tvSeries?.poster_path}`,
                                }}
                                className='w-full h-full'
                            />
                        </View>

                        {/* TV series main details */}
                        <View className='flex-col items-start justify-center mt-5 px-5'>
                            <Text className='text-white font-bold text-xl'>{tvSeries?.name}</Text>
                            <View className='flex-row items-start gap-x-1 mt-2'>
                                <Text className='text-light-200 text-sm'>
                                    {tvSeries?.first_air_date?.split('-')[0]}
                                </Text>
                                <Text className='text-light-200 text-sm'>
                                    {tvSeries?.number_of_seasons} seasons
                                </Text>
                                <Text className='text-light-200 text-sm'>
                                    {tvSeries?.number_of_episodes} episodes
                                </Text>
                            </View>
                            <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
                                <Image source={icons.star} className="size-4" />
                                <Text className='text-white font-bold text-sm'>
                                    {Math.round(tvSeries?.vote_average ?? 0)}/10
                                </Text>
                                <Text className='text-light-200 text-sm'>
                                    ({tvSeries?.vote_count} votes)
                                </Text>
                            </View>
                            <TvSeriesInfo label='Overview' value={tvSeries?.overview} />
                            <TvSeriesInfo label='Genres' value={tvSeries?.genres?.map(g => g.name).join(' - ') || 'N/A'} />
                            <TvSeriesInfo label='Status' value={tvSeries?.status} />
                            <TvSeriesInfo label='Networks' value={tvSeries?.networks?.map(n => n.name).join(', ') || 'N/A'} />
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
                                data={tvSerieCredits?.cast}

                                renderItem={({ item }) => (
                                    <CastCard {...item} />
                                )}
                                keyExtractor={(item) => item.id.toString()}
                            />
                        </View>

                        {/* Similar TV series */}
                        {similarTvSeries && similarTvSeries?.results.length > 0 && (
                            <View className="pb-42 px-5">
                                <Text className='text-white font-bold text-xl my-5'>Similar TV Series</Text>
                                <FlatList
                                    className="mb-4 mt-2"
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    ItemSeparatorComponent={() => <View className="w-4" />}
                                    data={similarTvSeries?.results?.slice(0, 10)}
                                    renderItem={({ item, index }) => (
                                        <TrendingCard movie={item} index={index} media_type={item?.media_type} />
                                    )}
                                    keyExtractor={(item, index) => `${item.id}_${index}`}
                                />
                            </View>
                        )}
                    </>
                )}
            </ScrollView>

            {/* Back button */}
            <BackButton />
        </View>
    );
};

export default TvSeriesDetails;