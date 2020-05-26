import React, { Fragment } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { Filter, Create, Edit, List, SimpleList, Datagrid, TextField, ReferenceField, SimpleForm, ReferenceInput, SelectInput, TextInput, BulkDeleteButton, Show, RichTextField, ReferenceManyField, SingleFieldList, ChipField } from 'react-admin';
import ResetViewsButton from './ResetViewsButton';

const PostBulkActionButtons = props => (
    <Fragment>
      <ResetViewsButton label="Reset Views" {...props} />
      <BulkDeleteButton {...props} />
    </Fragment>
);

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const PostTitle = ({ record }) => {
    return <span>Post edition: {record ? `${record.title}` : ''} </span>
};



export const PostCreate = props => (
    <Create title="Post creation" {...props}>
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
<Edit title={<PostTitle />} {...props}>
        <SimpleForm> 
            <RichTextField source="body" /> 
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
    <List title="List of posts" filters={<PostFilter />} {...props} bulkActionButtons={ <PostBulkActionButtons />} >
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => record.userId}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                    linkType={record => record.canEdit ? "edit" : "show"}
                />
            ) : (
                <Datagrid rowClick="edit" expand={ <PostShow /> } >
                    <TextField source="id" />
                    <ReferenceField label="User" source="userId" reference="users">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="title" />
                    <TextField source="body"/>
                </Datagrid>
                //antes de encerrar o Datagrid, acicionar botão que redireciona o usuário para o AlbumList
            )}
        </List>
    );
};

export const PostShow = props => (
    <Show {...props} title=" ">
        <ReferenceManyField reference="comments" target="post_id">
            <SingleFieldList>
                <ChipField source="body"/>
            </SingleFieldList>
        </ReferenceManyField>
    </Show>   
);