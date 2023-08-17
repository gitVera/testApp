import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import TextInput from './TextInput';
import {useDeletePostMutation, useUpdatePostMutation} from '../redux/services/api';
import {useDispatch} from 'react-redux';
import {deletePostRT, updatePostRT} from '../redux/features/posts';

const Card = ({id, title, body, onPress}) => {
  const [deletePost, result] = useDeletePostMutation();
  const [updatePost, resultUpdate] = useUpdatePostMutation();
  const [isEditMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const [titleText, setChangeTitleText] = useState(title);
  const [bodyText, setChangeBodyText] = useState(body);

  const onDelete = () => {
    deletePost(id);
    // if (result.isSuccess) { // if status ОК
      dispatch(deletePostRT(id)); // delete in redux
    // }
  };

  const onEditPress = () => {
    if (isEditMode) {
      const data = {
        id,
        title: titleText,
        body: bodyText,
      };
      updatePost(data);
      // if (resultUpdate.isSuccess) {
        dispatch(updatePostRT(data)); // обновляем локально
      // }
    }
    setEditMode(prev => !prev);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <TouchableOpacity style={styles.delete} onPress={onDelete}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.title}
        value={titleText}
        editable={isEditMode}
        onChangeText={setChangeTitleText}
      />
      <TextInput
        style={styles.body}
        value={bodyText}
        multiline
        editable={isEditMode}
        onChangeText={setChangeBodyText}
      />
      <Button
        title={isEditMode ? 'Сохранить' : 'Редактировать'}
        onPress={onEditPress}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eee',
    padding: 24,
    marginBottom: 24,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    // borderWidth: 1,
    height: 30,
    paddingVertical: 0,
  },
  delete: {
    position: 'absolute',
    zIndex: 5,
    right: 0,
    top: 0,
    width: 40,
    height: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#555',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Card;
