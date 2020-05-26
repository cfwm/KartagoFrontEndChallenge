import React, { Fragment } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { EmailField, Filter, Create, Edit, List, SimpleList, Datagrid, TextField, SimpleForm, ReferenceInput, SelectInput, TextInput, BulkDeleteButton, Show, ReferenceManyField, ListButton, ShowButton, TopToolbar, BooleanField } from 'react-admin';
import MyUrlField from './MyUrlField';
import ResetViewsButton from './ResetViewsButton';
import Button from '@material-ui/core/Button';
import { TodoShow } from './todos';



const AgentBulkActionButtons = props => (
    <Fragment>
        <ResetViewsButton label="Reset Views" {...props} />
        <BulkDeleteButton {...props} />
    </Fragment>
);

const AgentListAndShowButton = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={AgentList}/>
        <ShowButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={AgentShow}/>
    </TopToolbar>
);

const AgentListButton = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={AgentList}/>
    </TopToolbar>
);

const AgentFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Post" source="postId" reference="posts" allowEmpty>
            <SelectInput optionText="title"/>
        </ReferenceInput>
        <ReferenceInput label="Album" source="albumId" reference="albums" allowEmpty>
            <SelectInput optionText="title"/>
        </ReferenceInput>
    </Filter>
);

const AgentTitle = ({ record }) => {
    return <span>Agent: {record ? `${record.name}` : ''} </span>
};



export const AgentCreate = props => (
    <Create title={<AgentTitle/>} {...props} actions={<AgentListButton/>}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <TextInput source="phone" />
            <TextInput source="website" />
        </SimpleForm>
    </Create>
);

export const AgentEdit = props => (
    <Edit title={<AgentTitle />} actions={<AgentListAndShowButton/>} {...props}>
            <SimpleForm> 
                <TextInput disabled source="id" />
                <ReferenceInput source="userId" reference="users">
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <TextInput source="name" />
                <TextInput source="email" />
                <TextInput source="phone" />
                <TextInput source="website" />
            </SimpleForm>
        </Edit>
    );

export const AgentList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
    <List title={<AgentTitle/>} filters={<AgentFilter/>} bulkActionButtons={<AgentBulkActionButtons/>} {...props}>
        {isSmall ? (
            <SimpleList
                primaryText={record => record.name}
                secondaryText={record => record.email}
                tertiaryText={record => record.phone}
                linkType={record => record.canEdit ? "edit" : "show"}
            />
        ) : (   
        <Datagrid rowClick="edit" expand={<AgentShow/>}>
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="phone" />
            <MyUrlField source="website" />
        </Datagrid>
        )}
    </List>
    );
};

export const AgentShow = props => (
    <Show {...props} title={<AgentTitle/>}>
        <ReferenceManyField reference="todos" target="userId">
            <Datagrid rowClick={<TodoShow/>}>
                <TextField source="title" label="Tasks"/>
                <BooleanField source="completed"/>    
            </Datagrid>     
        </ReferenceManyField>
    </Show>
);