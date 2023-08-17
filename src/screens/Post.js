import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  ScrollView,
} from 'react-native';
import Review from '../components/Review';
import {
  useCreateReviewMutation,
  useGetReviewsQuery,
} from '../redux/services/api';
import TextInput from '../components/TextInput';
import {useDispatch, useSelector} from 'react-redux';
import {createReviewRT} from '../redux/features/reviews';

const Post = ({item}) => {
  const {_, isLoading} = useGetReviewsQuery();
  const [createReview, result] = useCreateReviewMutation();
  const data = useSelector(state => state.reviews);
  const reviews = data?.filter(i => i.postId === item.id);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const sendComment = () => {
    if (!text) {
      return;
    }
    const review = {
      id: Date.now(),
      postId: item.id,
      text,
    };
    createReview(review);
    // if(result.isSuccess) {
    dispatch(createReviewRT(review));
    setText('');
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item?.title}</Text>
      <Text>{item?.body}</Text>
      <View style={{marginTop: 20}}>
        <View style={styles.block}>
          <TextInput
            style={styles.input}
            placeholder="Add comment"
            value={text}
            onChangeText={setText}
          />
          <Button title="Send" onPress={sendComment} />
        </View>
        {reviews?.length > 0 && <Text style={styles.header}>Комментарии</Text>}
        <ScrollView contentContainerStyle={{marginBottom: 20}}>
          {isLoading && <ActivityIndicator />}
          {reviews?.map(item => (
            <Review
              key={item.id}
              id={item.id}
              text={item.text}
              postId={item.postId}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  block: {
    width: 300,
    alignSelf: 'flex-end',
  },
  input: {
    borderWidth: 1,
  },
  header: {
    marginTop: 16,
    paddingVertical: 8,
    textAlign: 'center',
    color: '#20232a',
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Post;
