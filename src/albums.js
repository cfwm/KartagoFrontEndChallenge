import React, { Fragment } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { TopToolbar, ListButton, ShowButton, Filter, Create, Edit, List, SimpleList, Datagrid, TextField, ReferenceField, SimpleForm, ReferenceInput, SelectInput, TextInput, BulkDeleteButton, Show, ReferenceManyField, SingleFieldList, ChipField, ImageField  } from 'react-admin';
import ResetViewsButton from './ResetViewsButton';
import Button from '@material-ui/core/Button';


const AlbumsFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Agent" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const AlbumsBulkActionButtons = props => (
    <Fragment>
        <ResetViewsButton label="Reset Views" {...props} />
        <BulkDeleteButton {...props} />
    </Fragment>
);

const AlbumListAndShowButton = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={AlbumList}/>
        <ShowButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={AlbumShow}/>
    </TopToolbar>
);

const AlbumListButton = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={AlbumList}/>
    </TopToolbar>
);

const AlbumsTitle = ({ record }) => {
    return <span> Album: {record ? `${record.title}` : ''} </span>
};



export const AlbumCreate = props => (
    <Create title={<AlbumsTitle/>} {...props} actions={<AlbumListButton/>}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
        </SimpleForm>
    </Create>
);

export const AlbumEdit = props => (
    <Edit title={<AlbumsTitle/>} {...props} actions={<AlbumListAndShowButton/>}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name"/>
            </ReferenceInput>
            <TextInput source="title"/>
        </SimpleForm>
    </Edit>
);

export const AlbumList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List title={<AlbumsTitle/>} filters={<AlbumsFilter />} {...props} bulkActionButtons={ <AlbumsBulkActionButtons />} >
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => record.userId}
                    tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                    linkType={record => record.canEdit ? "edit" : "show"}
                />
            ) : (
                <Datagrid rowClick="edit" expand={<AlbumShow/>}>
                    <TextField source="id"/>
                    <ReferenceField label="Agent" source="userId" reference="users">
                        <TextField source="name"/>
                    </ReferenceField>
                    <TextField source="title"/>
                </Datagrid>
            )}
        </List>
    );
};

export const AlbumShow = props => (
    <Show {...props} title={<AlbumsTitle/>}>
        <ReferenceManyField reference="photos" target="album_id">
            <SingleFieldList>
                <ImageField source="thumbnailUrl"/>
            </SingleFieldList>
        </ReferenceManyField>
    </Show>
);