import React from 'react';
import {Navigation} from 'react-native-navigation';
import Main from './src/screens/Main';
import Post from './src/screens/Post';

import {Provider} from 'react-redux';
import {store} from './src/redux/store';

Navigation.registerComponent(
  'Main',
  () => props =>
    (
      <Provider store={store}>
        <Main {...props} />
      </Provider>
    ),
  () => Main,
);

Navigation.registerComponent(
  'Post',
  () => props =>
    (
      <Provider store={store}>
        <Post {...props} />
      </Provider>
    ),
  () => Post,
);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Main',
            },
          },
        ],
      },
    },
  });
});
