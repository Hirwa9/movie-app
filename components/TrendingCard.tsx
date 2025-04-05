import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
    const { id, poster_path, title } = movie;

    return (
        <Link href={`/movies/${id}`} asChild>
            <Pressable className='relative w-[65vw] min-w-[12rem] pl-5 active:scale-95 transition-transform duration-200' android_ripple={{ color: '#1a3a8a', borderless: true }}>
                <Image
                    source={{
                        uri: poster_path ?
                            `https://image.tmdb.org/t/p/w500${poster_path}` :
                            'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                    className='w-full h-[40vh] min-h-[15rem] rounded-3xl'
                    resizeMode='cover'
                />
                <View className='absolute bottom-9 -left-2 px-2 py-1 rounded-4'>
                    <MaskedView
                        maskElement={
                            <Text className='font-bold text-white text-6xl'>{index + 1}</Text>
                        } >
                        <Image source={images.rankingGradient} className='size-14' resizeMode='cover' />
                    </MaskedView>
                </View>
                <Text className='text-sm font-bold mt-2 text-light-200' numberOfLines={2}>{title}</Text>
            </Pressable>
        </Link>
    )
}

export default TrendingCard;