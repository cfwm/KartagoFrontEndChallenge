import React, { Fragment } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { Filter, Create, Edit, List, SimpleList, Datagrid, TextField, ReferenceField, SimpleForm, ReferenceInput, SelectInput, TextInput, BulkDeleteButton, Show, ReferenceManyField, SingleFieldList, ChipField, ListButton, EditButton, ShowButton, TopToolbar } from 'react-admin';
import ResetViewsButton from './ResetViewsButton';
import Button from '@material-ui/core/Button';



const PostBulkActionButtons = props => (
    <Fragment>
      <ResetViewsButton label="Reset Views" {...props} />
      <BulkDeleteButton {...props} />
    </Fragment>
);

const PostEditAndListButton = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={PostList}/>
        <EditButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={PostEdit}/>
    </TopToolbar>
);

const PostListAndShowButton = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={PostList}/>
        <ShowButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={PostShow}/>
    </TopToolbar>
);

const PostListButton = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={PostList}/>
    </TopToolbar>
);

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Agent" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const PostTitle = ({ record }) => {
    return <span>Post: {record ? `${record.title}` : ''} </span>
};



export const PostCreate = props => (
    <Create title="Post creation" {...props} actions={<PostListButton/>}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);
   
export const PostEdit = props => (
<Edit title={<PostTitle />} actions={<PostListAndShowButton/>} {...props}>
        <SimpleForm> 
            <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const PostList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
    <List title={<PostTitle/>} filters={<PostFilter />} {...props} bulkActionButtons={ <PostBulkActionButtons />} >
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => record.userId}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                    linkType={record => record.canEdit ? "edit" : "show"}
                />
            ) : (
                <Datagrid rowClick="edit" expand={ <PostShow/> } >
                    <TextField source="id" />
                    <ReferenceField label="Agent" source="userId" reference="users">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="title" />
                    <TextField source="body"/>
                </Datagrid>
            )}
        </List>
    );
};

export const PostShow = props => (
    <Show {...props} title={<PostTitle/>} actions={<PostEditAndListButton/>}>
        <ReferenceManyField reference="comments" target="post_id">
            <SingleFieldList>
                <ChipField source="body"/>
            </SingleFieldList>
        </ReferenceManyField>
    </Show>   
);