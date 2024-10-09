import { View, Text, ScrollView, SafeAreaView, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { IOS } from 'nativewind/dist/utils/selector';
import { stylesMod } from '../theme/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/MovieList';
import Loading from '../components/loading';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../../api/moviedb';



var { width, height } = Dimensions.get("window");
const topMargin = IOS ? {} : { marginBottom: 12 };

const MovieScreen = () => {
    const {params: item} =useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [cast, setCast] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [movie, setMovie] =useState({});
    const [loading, setLoading] = useState(false);
    let movieName = 'Ant-Man  and the Wasp: Quantumania';
    useEffect(() => {
        //console.log('itemid:' , item.id);
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item]);

    const getMovieDetails = async id=> {
      const data = await fetchMovieDetails(id);
      //console.log('got movie details:', data);
      if(data) setMovie(data);
      setLoading(false);
    }
    const getMovieCredits = async id=> {
      const data = await fetchMovieCredits(id);
     // console.log('got credits:', data);
     if(data && data.cast) setCast(data.cast);
   
    }
    const getSimilarMovies = async id=> {
      const data = await fetchSimilarMovies(id);
      //console.log('got similar movies:', data);
    if(data && data.results) setSimilarMovies(data.results);
    
    }

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}}
    style={{ flex: 1, backgroundColor: 'black'}}>
      {/* back button and movie poster*/}
      <View style={{ width: '100%'}}>
        <SafeAreaView style={[{ position: 'absolute', zIndex: 20, width: '100%', flex: 'row', justifyContent: 'space-between', alignItems: 'center',paddingHorizontal: 16, flexDirection: 'row'}, topMargin]}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ backgroundColor: "#eaa308", borderRadius: 10, padding: 3}}>
                <ChevronLeftIcon size='28' strokeWidth={2.5} color='white'/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}> 
            <HeartIcon 
                    size="35" 
                    color={isFavourite ? stylesMod.background : 'white'}
                />
            </TouchableOpacity>
        </SafeAreaView>

        {
          loading? (
            <Loading/>
          ) : (
        <View style={{ width, height: height * 0.55, position: 'relative' }}>
            <Image 
            //source={require('../assets/1.png')}
            source={{uri: image500(movie?.poster_path) || fallbackMoviePoster
            }}
              style={{width, height: height*0.55 }}
              resizeMode="cover" ></Image>
            <LinearGradient
              colors={['transparent', 'rgba(20,20,20,0.8)', 'rgba(20,20,20, 1)' ]}
              style={{ width, height: height*0.40, position:'absolute', bottom: 0, left:0, right:0 }}
              start={{x: 0.5, y:0}}
              end={{x: 0.5, y:1}}
            />
        </View> 

          )
        }
        
      </View>
      {/* movie details*/}
      <View style={{ marginTop: -(height*0.09), marginHorizontal: 12, alignItems: 'center'}}>
      {/* title */}
      <Text style={{ color: 'white', textAlign: 'center',fontSize:28, fontWeight:'bold', letterSpacing: 2}}>
      {
        movie?.title
      }
      </Text>
      {/* status, relese, runtime */}
      {
        movie?.id?(
          <Text style={{ color: 'gray', fontWeight:'semibold', textAlign: 'center', fontSize:16 , marginTop: 10}}>
        {movie?.status} • {movie?.release_date?.split('-') [0]} • {movie?.runtime} min
          </Text>
        ) : null
      }
      
      {/* genres */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginHorizontal: 16, marginVertical: 8}}>
        {
          movie?.genres?.map((genre, index) =>{
            let showDot = index+1 != movie.genres.length;
            return (
              <Text key={index} 
              style={{ color: 'gray', fontWeight: 'semibold', fontSize: 16, textAlign: 'center',marginTop: 10 , paddingRight: 5}}>
              {genre?.name} {showDot? "•" : null}
            </Text>
            )

          })
        }
        {/*<Text style={{ color: 'gray', fontWeight: 'semibold', fontSize: 16, textAlign: 'center',marginTop: 10 , paddingRight: 5}}>
          Action * 
        </Text>
        <Text style={{ color: 'gray', fontWeight: 'semibold', fontSize: 16, textAlign: 'center',marginTop: 10, paddingRight: 5 }}>
          Thrill * 
        </Text><Text style={{ color: 'gray', fontWeight: 'semibold', fontSize: 16, textAlign: 'center',marginTop: 10 }}>
           Comedy
        </Text>*/}

      </View>
      {/* description*/}
        <Text style={{ color: 'gray', marginHorizontal: 12, letterSpacing: 0}}>
          {
            movie?.overview
          }
        </Text>
      </View>

      {/* cast */}

      {cast.length>0 && <Cast navigation={navigation} cast={cast} />} 

      {/* similar movies */}
      {similarMovies.length>0 && <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />}
 
    </ScrollView>
  )
}

export default MovieScreen; 