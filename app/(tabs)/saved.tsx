import { Image, Text, View } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';
import { colors } from '@/constants/colors';

const Saved = () => {
    return (

        <View className='bg-primary flex-1 px-10'>
            <View className='flex-1 flex flex-col items-center justify-center gap-5'>
                <Image source={icons.save} className='size-10' tintColor={colors.white} />
                <Text className='text-gray-500 text-base'>Saved</Text>
            </View>
        </View>
    )
}
export default Saved;