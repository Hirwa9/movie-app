import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

interface TabIconProps {
    path: string;
    focused: boolean;
    title: string;
    icon: React.ReactNode;
    className?: string;
}

const TabIcon = ({ path, focused, icon, title, className }: TabIconProps) => {
    return focused ? (
        <Pressable onPress={() => router.navigate(path as any)}>
            <View
                className={`flex-1 flex flex-row gap-2 items-center justify-center min-w-[105px] min-h-[50px] py-2 px-3 bg-white/70 rounded-full translate-y-[6px] ${className}`}
            >
                {icon}
                <Text className="text-sm text-gray-700">{title}</Text>
            </View>
        </Pressable>
    ) : (
        <Text onPress={() => router.navigate(path as any)} className="flex-shrink active:scale-95 transition-all duration-200 translate-y-[6px]">
            {icon}
        </Text>
    );
};

const _Layout = () => (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#0F0D23',
                borderRadius: 50,
                marginHorizontal: 10,
                marginBottom: 20,
                paddingHorizontal: 5,
                height: 52,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 0,
                borderColor: 'transparent',
            },
            tabBarItemStyle: {
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
            },
        }}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        path='/'
                        focused={focused}
                        icon={<Ionicons name="home-outline" size={24} color={focused ? "#151312" : "#fff"} />}
                        title="Home"
                    />
                ),
            }}
        />
        <Tabs.Screen
            name="search"
            options={{
                title: 'Search',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        path='/search'
                        focused={focused}
                        icon={<Ionicons name="search-outline" size={24} color={focused ? "#151312" : "#fff"} />}
                        title="Search"
                    />
                ),
            }}
        />
        <Tabs.Screen
            name="saved"
            options={{
                title: 'Saved',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        path='/saved'
                        focused={focused}
                        icon={<Ionicons name="bookmark-outline" size={24} color={focused ? "#151312" : "#fff"} />}
                        title="Saved"
                    />
                ),
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <TabIcon
                        path='/profile'
                        focused={focused}
                        icon={<AntDesign name="user" size={24} color={focused ? "#151312" : "#fff"} />}
                        title="Profile"
                    />
                ),
            }}
        />
    </Tabs>
);

export default _Layout;
