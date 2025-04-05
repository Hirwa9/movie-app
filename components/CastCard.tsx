import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

interface CastCardProps {
    id: number,
    name: string,
    character: string,
    profile_path: string,
}

const CastCard = ({ id, name, character, profile_path }: CastCardProps) => {
    return (
        <Link href={`/cast/${id}`} asChild>
            <TouchableOpacity className='items-center w-[5rem] overflow-hidden'>
                <Image
                    source={{
                        uri: profile_path ?
                            `https://image.tmdb.org/t/p/w500${profile_path}` :
                            'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                    resizeMode='cover'
                    className='w-14 h-14 rounded-full mb-2'
                />
                <View className='w-full'>
                    <Text className='text-center text-white' numberOfLines={1}>{name}</Text>
                    <Text className='text-center text-light-200 text-xs' numberOfLines={1}>{character}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

export default CastCard;