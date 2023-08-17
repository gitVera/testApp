import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Button,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {useSelector} from 'react-redux';
import Card from '../components/Card';
import {useCreatePostMutation, useGetPostsQuery} from '../redux/services/api';

const Main = props => {
  const {data: posts2, isLoading} = useGetPostsQuery();
  const [createPost, result] = useCreatePostMutation();
  const posts = useSelector(state => state.posts);

  const goTo = item => {
    Navigation.push(props.componentId, {
      component: {
        name: 'Post',
        passProps: {
          item,
        },
      },
    });
  };

  const createNewPost = () => {
    const data = {
      id: Date.now(),
      title: `Post from ${new Date().toLocaleString()}`,
      body: 'some text',
    };
    createPost(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnWrap}>
        <Button title="Add New Post" onPress={createNewPost} />
      </View>
      <ScrollView>
        {isLoading && <ActivityIndicator />}
        {posts?.map(item => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            body={item.body}
            onPress={() => goTo(item)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#555',
  },
  btnWrap: {
    width: 200,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
});

export default Main;
