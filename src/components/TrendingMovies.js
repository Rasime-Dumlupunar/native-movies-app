import { Dimensions, Image, Text, TouchableWithoutFeedback, View} from "react-native";
import React from "react";
import Carousel from "react-native-new-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../../api/moviedb";

var { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate('Movie', item);
  }
  return (
    <View style={{ marginTop: 16 }}>
      <Text
        style={{
          color: "white",
          fontSize: 24,
          fontWeight: 'bold',
          marginHorizontal: 16,
          marginBottom: 20,
        }}
      >
        Trending
      </Text>
      <Carousel
        data={data}
        renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.62}
        slideStyle={{ display: "flex", alignItems: 'center'
        }}
      />
    </View>
  );
};

export default TrendingMovies;

const MovieCard = ({ item, handleClick }) => {
  return (

    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        // source={require('../assets/1.png')} 
        source={{ uri: image500(item.poster_path)}}

        style={{width: width*0.6, height: height*0.4, borderRadius: 10}} />
    </TouchableWithoutFeedback>
  );
};
