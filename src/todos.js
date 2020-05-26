import React, { Fragment } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { Filter, Create, Edit, List, SimpleList, Datagrid, TextField, ReferenceField, EditButton, SimpleForm, ReferenceInput, SelectInput, TextInput, BooleanInput, BooleanField, Show, ReferenceManyField, BulkDeleteButton, ListButton, TopToolbar } from 'react-admin';
import ResetViewsButton from './ResetViewsButton';
import Button from '@material-ui/core/Button';



const TodoBulkActionButtons = props => (
    <Fragment>
      <ResetViewsButton label="Reset Views" {...props} />
      <BulkDeleteButton {...props} />
    </Fragment>
);

const TodoListButton = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={TodoList}/>
    </TopToolbar>
);

const TodoFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Agent" source="userId" reference="users" allowEmpty>
            <SelectInput option="name" />
        </ReferenceInput>
    </Filter>
);

const TodoShows = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data}/>
        <Button color="primary" onClick={TodoList}/>
    </TopToolbar>
);

const TodoTitle = ({ record }) => {
    return <span>Todo {record ? `"${record.title}"` : ''} </span>
};



export const TodoCreate = props => (
    <Create {...props} actions={<TodoListButton/>}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <BooleanInput source="completed" />
        </SimpleForm>
    </Create>
);

export const TodoEdit = props => (
    <Edit title={<TodoTitle />} actions={<TodoShows/>} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <BooleanInput source="completed" /> 
        </SimpleForm>
    </Edit>
);

export const TodoList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List title={<TodoTitle/>} filters={<TodoFilter />} {...props} bulkActionButtons={ <TodoBulkActionButtons />}>
            {isSmall ? (
                <SimpleList
                primaryText={record => record.title}
                secondaryText={record => record.userId}
                tertiaryText={record => record.completed}
                />
            ) : (
                <Datagrid> 
                    <TextField source="id" />
                    <ReferenceField label="Agent" source="userId" reference="users">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="title" />
                    <BooleanField source="completed" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
};

export const TodoShow = props => (
    <Show {...props} title={<TodoTitle/>}>
        <ReferenceManyField reference="comments" target="post_id">
            <Datagrid rowClick={TodoList}>
                <TextField source="userId"/>
                <TextField source="id"/>
                <TextField source="title"/>
                <BooleanField source="completed"/>
            </Datagrid>
        </ReferenceManyField>
    </Show>   
);