import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import TextInput from './TextInput';
import {
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from '../redux/services/api';
import {deleteReviewRT, updateReviewRT} from '../redux/features/reviews';

const Review = ({text, id, postId}) => {
  const [isEditMode, setEditMode] = useState(false);
  const [deleteReview, res] = useDeleteReviewMutation();
  const [updateReview, resultUpdate] = useUpdateReviewMutation();
  const dispatch = useDispatch();
  const [value, setValue] = useState(text);

  const onDeletePress = () => {
    deleteReview(id);
    // if (res.isSuccess) {
    dispatch(deleteReviewRT(id));
    // }
  };

  const onEditPress = () => {
    if (isEditMode) {
      const data = {
        id,
        postId,
        text: value,
      };
      updateReview(data);
      // if (resultUpdate.isSuccess) {
      dispatch(updateReviewRT(data)); // update in redux
      // }
    }
    setEditMode(prev => !prev);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        value={value}
        onChangeText={setValue}
        editable={isEditMode}
        multiline
      />
      <View style={styles.buttons}>
        <View style={styles.btn}>
          <Button title="Delete" onPress={onDeletePress} />
        </View>
        <View style={styles.btn}>
          <Button title={isEditMode ? 'Save' : 'Edit'} onPress={onEditPress} />
        </View>
        {isEditMode && (
          <View style={styles.btn}>
            <Button
              title="Cancel"
              onPress={() => {
                setValue(text);
                setEditMode(prev => !prev);
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 24,
    marginBottom: 12,
  },
  title: {
    color: 'black',
    fontSize: 12,
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    marginLeft: 12,
  },
});

export default Review;
