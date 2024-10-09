import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { fallbackPersonImage, image185 } from '../../api/moviedb';

const Cast = ({cast, navigation}) => {
    let personName = 'Keanu Reevs';
    let character= 'John Wick';
  return (
    <View style={{ marginVertical: 24 }}>
      <Text style={{ color: 'white', fontSize: 18, marginHorizontal: 16, marginBottom: 20 }}> Top Cast</Text>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
            cast && cast.map((person, index) => {
                return (
                    <TouchableOpacity
                    key= {index}
                    style={{ marginRight: 16, textAlign: 'center' }}
                    onPress={() => navigation.navigate('Person', person)}>
                        <View style={{ overflow: 'hidden', borderRadius: '100%', height:50, width: 50, textAlign: 'center', borderColor: 'white'}}>
                        <Image style={{ borderRadius: 16, height: 55, width: 50}}
                        //source={require('../assets/Keanu-Reeves.png')} 
                        source={{uri: image185(person?.profile_path) || fallbackPersonImage}}/>
                        </View>
                        
                        <Text style={{ color: 'white', fontSize: 12, marginTop: 4}}>
                            {
                                person?.character.length>10? person?.character.slice(0,10)+ '...': person?.character
                            } 

                        </Text>
                        <Text style={{ color: 'gray', fontSize: 12, marginTop: 4}}>
                            {
                                person?.original_name.length>10? person?.original_name.slice(0,10)+ '...': person?.original_name
                            }

                        </Text>
                    </TouchableOpacity>
                )
            })
        }

      </ScrollView>
    </View>
  )
}

export default Cast;