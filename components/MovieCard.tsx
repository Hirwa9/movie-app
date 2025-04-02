import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { icons } from '@/constants/icons';

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className='w-[30%]'>
                <Image
                    source={{
                        uri: poster_path ?
                            `https://image.tmdb.org/t/p/w500${poster_path}` :
                            'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                    className='w-full h-52'
                    style={{
                        borderBottomWidth: 4,
                        borderColor: '#1a3a8a',
                    }}
                    resizeMode='cover'
                />
                <Text className='mt-2 text-sm font-bold text-white' numberOfLines={1}>{title}</Text>
                <View className='flex-row items-center justify-start gap-1'>
                    <Image source={icons.star} className='size-4 ' />
                    <Text className='text-xs text-white/50 font-bold uppercase'>
                        {Math.round(vote_average / 2)}
                    </Text>
                </View>
                <View className='flex-row items-center justify-between'>
                    <Text className='mt-1 text-xs text-light-300 font-medium'>
                        {(release_date?.split('-')[0])}
                    </Text>
                    {/* <Text className='text-xs text-light-300 font-medium uppercase'>
                        Movie
                    </Text> */}
                </View>
            </TouchableOpacity>

        </Link>
        // <View>
        //     <Text className='text-sm text-white'>MovieCard</Text>
        // </View>
    )
}

export default MovieCard;