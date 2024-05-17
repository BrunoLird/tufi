import React, {FC, useRef, useState} from "react";
import {Dimensions, FlatList, Image, TouchableOpacity, View, ViewStyle} from "react-native";
import {colors} from "app/theme";

export const MiniCarrousel: FC = () => {
    const imagePaths = [
        require("../../assets/images/carrousel2.png"),
        require("../../assets/images/carrousel1.png"),
        require("../../assets/images/carrousel3.png"),
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleImageChange = (index: number) => {
        setActiveIndex(index);
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({index: index, animated: true});
        }
    };

    return (
        <View style={$container}>
            <FlatList
                ref={flatListRef}
                horizontal
                data={imagePaths}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({item}) => (
                    <Image source={item} style={$carouselImage}/>
                )}
                onScroll={(event) => {
                    const offset = event.nativeEvent.contentOffset.x;
                    const index = Math.round(offset / Dimensions.get("window").width);
                    setActiveIndex(index);
                }}
            />

            <View style={$paginationContainer}>
                {imagePaths.map((_, index) => (
                    <View key={index} style={$paginationDotContainer}>
                        <TouchableOpacity
                            style={[
                                $paginationDot,
                                {
                                    backgroundColor: colors.palette.primaryT500,
                                },
                            ]}
                            onPress={() => handleImageChange(index)}
                        />
                        {index === activeIndex && (
                            <View style={$borderContainer}>
                                <View style={$borderInner}/>
                            </View>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
};

const $container: ViewStyle = {
    borderRadius: 10,
};

const $carouselImage: ViewStyle = {
    margin: 1,
    borderRadius: 10,
    borderColor: "transparent",
    width: 350,
    height: 197,
};

const $paginationContainer: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
};

const $paginationDot: ViewStyle = {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
};

const $paginationDotContainer: ViewStyle = {
    position: "relative",
    width: 20,
    height: 20,
};

const $borderContainer: ViewStyle = {
    position: "absolute",
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
};

const $borderInner: ViewStyle = {
    width: 14,
    height: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#C4C4C4",
};
