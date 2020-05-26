import React, { Fragment } from 'react';
import { useMediaQuery } from '@material-ui/core';
import {Filter, ShowButton, Create, Edit, List, SimpleList, Datagrid, TextField, ReferenceField, SimpleForm, ReferenceInput, SelectInput, TextInput, BulkDeleteButton, Show, ImageField, ListButton, EditButton, TopToolbar, SingleFieldList  } from 'react-admin';
import ResetViewsButton from './ResetViewsButton';
import Button from '@material-ui/core/Button';



const PhotosBulkActionButtons = props => (
    <Fragment>
        <ResetViewsButton label="Reset Views" {...props}/>
        <BulkDeleteButton {...props}/>
    </Fragment>
);

const PhotoEditAndListButton = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={PhotoList}/>
        <EditButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={PhotoEdit}/>
    </TopToolbar>
);

const PhotoEditButton = ({ basePath, data, resource }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={PhotoEdit}/>
    </TopToolbar>
);

const PhotoListAndShowButton = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={PhotoList}/>
        <ShowButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={PhotoShow}/>
    </TopToolbar>
);

const PhotosFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
        <ReferenceInput label="Agent" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <ReferenceInput label="Album" source="albumId" reference="albums" allowEmpty>
            <SelectInput optionText="title"/>
        </ReferenceInput>
    </Filter>
);

const PhotosTitle = ({ record }) => {
    return <span>Photo: {record ? `${record.title}` : ''}</span>
};



export const PhotoCreate = props => (
    <Create title={<PhotosTitle/>} {...props}>
        <SimpleForm>
            <ReferenceInput source="albumId" reference="albums">
                <SelectInput optionText="title"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <TextInput source="url"/>
            <TextInput source="thumbnailUrl"/>
        </SimpleForm>
    </Create>
);

export const PhotoEdit = props => (
    <Edit title={<PhotosTitle/>} {...props} actions={<PhotoListAndShowButton/>}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <ReferenceInput source="albumId" reference="albums">
                <SelectInput optionText="title"/>
            </ReferenceInput>
            <TextInput source="title"/>
            <TextInput source="url"/>
            <TextInput source="thumbnailUrl"/>
        </SimpleForm>
    </Edit>
);

export const PhotoList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List title={<PhotosTitle/>} filters={<PhotosFilter/>} {...props} bulkActionButtons={<PhotosBulkActionButtons/>}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => record.albumId}
                    tertiaryText={record => record.url}
                />
            ) : (
                <Datagrid rowClick="edit" expand={<PhotoShow/>}>
                    <TextField source="id"/>
                    <ReferenceField label="Album" source="albumId" reference="albums">
                        <TextField source="title"/>
                    </ReferenceField>
                    <TextField source="title"/>
                    <TextField source="url"/>
                    <TextField source="thumbnailUrl"/>
                </Datagrid>
            )}
        </List>
    );
};

export const PhotoShow = props => (
    <Show {...props} title={<PhotosTitle/>} actions={<PhotoEditButton/>}>
        <ImageField source="url" title={<PhotosTitle/>} align="center" />
    </Show>
);