import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { stylesMod } from "../theme/theme";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/solid";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../../api/moviedb";

const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();

  }, [])

  const getTrendingMovies = async ()=>{
    const data =  await fetchTrendingMovies();
    //console.log('got trending movies:' , data);
    if(data && data.results) setTrending(data.results);
    setLoading(false);
  }
  const getUpcomingMovies = async ()=>{
    const data =  await fetchUpcomingMovies();
    //console.log('got upcoming movies:' , data);
    if(data && data.results) setUpcoming(data.results);
    
  }
  const getTopRatedMovies = async ()=>{
    const data =  await fetchTopRatedMovies();
    //console.log('got top rated movies:' , data);
    if(data && data.results) setTopRated(data.results);
    
  }

  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView style={{ marginBottom: -8 }}>
        <StatusBar style="light" />
        <View 
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 16,
          }}
        >
          <Bars3CenterLeftIcon
            color="white"
            size={30}
            strokeWidth={2}
          />
          <Text
            style={{
              color: "white",
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            <Text style={stylesMod.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <MagnifyingGlassIcon
            color="white"
            size={30}
            strokeWidth={2}
          />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {
        loading? ( 
          <Loading/>
        ) :(
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginBottom: 10 }}
      >
          {/* Trending movies carousel*/}
          { trending.length>0 && <TrendingMovies data={trending} />}

          {/* Upcoming movies carousel*/}
          <MovieList title="Upcoming" data={upcoming}/>

          {/* top rated movies carousel*/}
          <MovieList title="Top Rated" data={topRated}/>
      </ScrollView>
        )
        
      }
      
    </View>
  );
};

export default HomeScreen;
