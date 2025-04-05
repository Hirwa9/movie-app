import React from "react";
import { View } from "react-native";
import Svg, { Defs, Pattern, Circle, Rect, LinearGradient, Stop } from "react-native-svg";

import { colors } from "@/constants/colors";
const DotsPattern = () => {
    return (
        <View className="absolute top-0 left-0 w-full h-full mt-[9px] z-0 text-accent">
            <Svg height="100%" width="100%">
                <Defs>
                    {/* Dots Pattern */}
                    <Pattern id="dots" patternUnits="userSpaceOnUse" width="15" height="15">
                        <Circle cx="1" cy="1" r="1" fill="currentColor" />
                    </Pattern>
                    {/* Gradient */}
                    <LinearGradient id="fade" x1="0" y1="1" x2="0" y2="0">
                        <Stop offset="80%" stopColor={colors.primary} stopOpacity="1" />
                        <Stop offset="90%" stopColor={colors.primary} stopOpacity=".5" />
                        <Stop offset="100%" stopColor={colors.primary} stopOpacity="0" />
                    </LinearGradient>
                </Defs>
                {/* Apply Pattern */}
                <Rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
                {/* Overlay with Gradient */}
                <Rect x="0" y="0" width="100%" height="100%" fill="url(#fade)" />
            </Svg>
        </View>
    );
};

export default DotsPattern;