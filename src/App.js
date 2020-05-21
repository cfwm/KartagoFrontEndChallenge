import React from 'react';
import { Admin, Resource } from 'react-admin';


import jsonServerProvider from 'ra-data-json-server';

import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';

import Dashboard from './Dashboard';
import NotFound from './NotFound';

import authProvider from './authProvider'


import { UserList } from './users';
import { PostCreate, PostList, PostEdit } from './posts';
import { TodoList, TodoEdit, TodoCreate } from './todos';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: purple,
    secondary: green, 
  }
});

const App = () => (
  <Admin theme={theme} dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider} catchAll={NotFound}>
    <Resource name="users" list={UserList} icon={UserIcon} />
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
    <Resource name="todos" list={TodoList} edit={TodoEdit} create={TodoCreate} />
  </Admin>
);
export default App;
