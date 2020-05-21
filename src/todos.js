import React from 'react';
import { useMediaQuery } from '@material-ui/core';
import { Filter, Create, Edit, List, SimpleList, Datagrid, TextField, ReferenceField, EditButton, SimpleForm, ReferenceInput, SelectInput, TextInput, BooleanInput } from 'react-admin';

const TodoFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput option="name" />
        </ReferenceInput>
    </Filter>
);

export const TodoList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List filters={<TodoFilter />} {...props}>
            {isSmall ? (
                <SimpleList
                primaryText={record => record.title}
                secondaryText={record => `${record.views} views`}
                tertiaryText={record => new Date(record.published_at).toLocaleDateString()}
                />
            ) : (
                <Datagrid>
                    <TextField source="id" />
                    <ReferenceField label="User" source="userId" reference="users">
                        <TextField source="name" />
                    </ReferenceField>
                    <TextField source="title" />
                    <TextField source="completed" />
                    <EditButton />
                </Datagrid>
            )}
        </List>
    );
}

const TodoTitle = ({ record }) => {
    return <span>Todo {record ? `"${record.title}"` : ''} </span>
};

export const TodoEdit = props => (
    <Edit title={<TodoTitle />} {...props}>
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

export const TodoCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            <BooleanInput source="completed" />
        </SimpleForm>
    </Create>
);