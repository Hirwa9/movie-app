import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { icons } from '@/constants/icons';

const MovieCard = ({ id, poster_path, title, name, vote_average, release_date, first_air_date, media_type }: Movie) => {

    return (
        <Link href={media_type === 'movie' ? `/movies/${id}` : `/tvSerie/${id}`} asChild className='mb-3'>
            <TouchableOpacity className='w-[30%]'>
                <View className='w-full border-b-4 border-purple-950'>
                    <Image
                        source={{
                            uri: poster_path ?
                                `https://image.tmdb.org/t/p/w500${poster_path}` :
                                'https://placehold.co/600x400/1a1a1a/ffffff.png'
                        }}
                        className='w-full h-52'
                        resizeMode='cover'
                    />
                </View>
                <Text className='mt-2 text-sm font-bold text-white' numberOfLines={1}>{media_type === 'movie' ? title : name}</Text>
                <View className='flex-row items-center justify-start gap-1'>
                    <Image source={icons.star} className='size-4 ' />
                    <Text className='text-xs text-white/50 font-bold uppercase'>
                        {Math.round(vote_average / 2)}
                    </Text>
                </View>
                <View className='flex-row items-center justify-between mt-1'>
                    <Text className='text-xs text-light-300 font-medium'>
                        {media_type === 'movie' ? release_date?.split('-')[0] : first_air_date?.split('-')[0]}
                    </Text>
                    <Text className='text-xs text-light-300 font-medium uppercase'>
                        {
                            media_type === 'movie' ? 'Movie'
                                : media_type === 'tv' ? 'Series' : ''
                        }
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default MovieCard;