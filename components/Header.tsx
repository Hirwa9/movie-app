import { View } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

// Resources
import { Ionicons } from '@expo/vector-icons';

import { ComponentProps } from 'react';
import { colors } from '@/constants/colors';

interface HeaderProps {
    name?: ComponentProps<typeof Ionicons>['name']; // Make sure to use only the name prop from Ionicons
    onPress?: () => void;
    fixed?: boolean;
}

const Header = ({ name, onPress, fixed }: HeaderProps) => {
    return (
        <View className={`${fixed ? 'absolute' : 'py-4'} start-0 w-full flex-row justify-between px-4 z-10`}>
            <Ionicons
                onPress={() => router.dismissTo('/')}
                name="home-outline" size={24} color={colors.white}
                style={{ textShadowColor: '#000', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 10 }}
                className='p-2'
            />
            <Ionicons
                onPress={onPress}
                name={name} size={24} color={colors.white}
                className='p-2'
            />
        </View>
    )
}

export default Header