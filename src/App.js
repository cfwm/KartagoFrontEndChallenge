import React from 'react';
import { Admin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';

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
import { PostCreate, PostList, PostEdit, PostShow } from './posts';
import { TodoList, TodoEdit, TodoCreate } from './todos';
import { CommentList } from './comments';
import { AlbumCreate, AlbumList, AlbumEdit, AlbumShow } from './albums'

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
    <Resource name="todos" list={TodoList} edit={TodoEdit} create={TodoCreate} />
    <Resource name="posts" list={PostList} create={PostCreate} edit={PostEdit} icon={PostIcon} show={PostShow}/>
    <Resource name="comments" list={CommentList} />
    <Resource name="albums" create={AlbumCreate} edit={AlbumEdit} list={AlbumList}  show={AlbumShow}/>
    <Resource name="photos" list={ListGuesser} edit={EditGuesser} show={ShowGuesser}/>
    
</Admin>
);
export default App;
