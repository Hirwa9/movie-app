import { View, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '@/constants/icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '@/constants/colors';

interface SearchBarProps {
    value?: string,
    clearValue?: () => void,
    placeholder: string,
    onPress?: () => void,
    onChangeText?: (text: string) => void,
    className?: string,
    showClearIcon?: boolean,
}

const SearchBar = ({ placeholder, value, clearValue, onPress, onChangeText, className, showClearIcon }: SearchBarProps) => {

    const [canClearValue, setCanClearValue] = useState(false);

    useEffect(() => {
        if (showClearIcon) {
            if (value?.trim()) {
                setCanClearValue(true);
            } else {
                setCanClearValue(false);
            }
        }
    }, [value, showClearIcon]);

    return (
        <View className={`relative flex-row items-center px-5 bg-dark-200 rounded-full focus-within:scale-105 transition-transform duration-200 ${className}`}>
            <Image source={icons.search} className='size-5' resizeMode='contain' tintColor={colors.accent} />
            <TextInput
                onPress={onPress}
                placeholder={placeholder} value={value}
                onChangeText={onChangeText}
                onChange={() => { }} placeholderTextColor={colors.accent} className='flex-1 ml-2 py-3 text-white outline-none'
            />
            {canClearValue && (
                <Ionicons name="close-outline" size={20} color={colors.accent} className="absolute right-4 top-1/2 -translate-y-1/2"
                    onPress={clearValue}
                />
            )}
        </View>
    )
}

export default SearchBar;