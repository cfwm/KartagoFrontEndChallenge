import React from 'react';
import { Admin, Resource } from 'react-admin';

import jsonServerProvider from 'ra-data-json-server';

import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import PostIcon from '@material-ui/icons/Book';
import AgentIcon from '@material-ui/icons/Group';
import CommentIcon from '@material-ui/icons/Comment';
import PhotoAlbumIcon from '@material-ui/icons/PhotoAlbum';
import PhotoIcon from '@material-ui/icons/Photo';
import DoneIcon from '@material-ui/icons/Done';

import Dashboard from './Dashboard';
import NotFound from './NotFound';
import authProvider from './authProvider'


import { AgentCreate, AgentEdit, AgentList, AgentShow } from './users';
import { TodoCreate, TodoEdit,TodoList} from './todos';
import { PostCreate, PostEdit, PostList, PostShow } from './posts';
import { CommentList, CommentShow } from './comments';
import { AlbumCreate, AlbumList, AlbumEdit, AlbumShow } from './albums';
import { PhotoCreate, PhotoEdit, PhotoList, PhotoShow } from './photos';

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
    <Resource name="users" options={{ label: 'Agents' }} create={AgentCreate} edit={AgentEdit}  icon={AgentIcon} list={AgentList} show={AgentShow}/>
    <Resource name="todos" options={{ label: "Tasks" }} create={TodoCreate} edit={TodoEdit} icon={DoneIcon}  list={TodoList}/>
    <Resource name="posts" create={PostCreate} edit={PostEdit} icon={PostIcon} list={PostList} show={PostShow}/>
    <Resource name="comments"  icon={CommentIcon} list={CommentList} show={CommentShow}/>
    <Resource name="albums" create={AlbumCreate} edit={AlbumEdit} icon={PhotoAlbumIcon} list={AlbumList}  show={AlbumShow}/>
    <Resource name="photos" create={PhotoCreate} edit={PhotoEdit} icon={PhotoIcon} list={PhotoList} show={PhotoShow}/>
    
</Admin>
);
export default App;
