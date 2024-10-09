import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { stylesMod } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { fallbackMoviePoster, image185 } from '../../api/moviedb';


var { width, height } = Dimensions.get("window");


const MovieList = ({title, data, hideSeeAll}) => {
    //let movieName = 'Ant-Man  and the Wasp: Quantumania';
    const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 32, marginVertical: 16 }}>
        <View style={{ marginHorizontal: 16, 
            flexDirection: 'row',
            
            justifyContent: 'space-between',  
            alignContent: 'center'}}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold'}}>{title}</Text>
            {
                !hideSeeAll && (
                    <TouchableOpacity>
                        <Text style={stylesMod.text}>See All</Text>
                    </TouchableOpacity>
                )
            }
                
      </View>
      {/* movie row*/}
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 15}}
      >
        {data.map((item, index )=>{
            return (
                <TouchableWithoutFeedback
                key={index} 
                onPress={()=> navigation.push('Movie', item)}>
                    <View style={{marginVertical: 4, marginRight: 16}}>
                        <Image
                        //source ={require('../assets/2.png')}
                        source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                        style={{ borderRadius: 15, marginTop: 10, marginBottom: 10, width: width * 0.33, height: height * 0.22 }}
                        />
                    <Text style={{color: 'white', marginLeft: 6}}> 
                        {
                        item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                    </Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        })}
      </ScrollView>
    </View>
  );
} 

export default MovieList;

