import { Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { icons } from '@/constants/icons';
import { colors } from '@/constants/colors';

const BackButton = () => {
    return (
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
            <Image source={icons.arrow} className='size-5 rotate-180 mt-0.5' tintColor={colors.primary} />
            <Text className='text-primary font-semibold text-base'>Go back</Text>
        </TouchableOpacity>
    )
}

export default BackButton;