import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import { Filter, List, SimpleList, TextField, ReferenceField, ReferenceInput, SelectInput, TextInput, BulkDeleteButton, Show, SimpleShowLayout} from "react-admin";
import ResetViewsButton from './ResetViewsButton';
import { useMediaQuery } from '@material-ui/core';



const CommentBulkActionButtons = props => (
    <Fragment>
        <ResetViewsButton label="Reset Views" {...props}/>
        <BulkDeleteButton {...props}/>
    </Fragment>
);

const CommentsFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn/>
        <ReferenceInput label="Agent" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name"/>
        </ReferenceInput>
        <ReferenceInput label="Post" source="postId" reference="posts" allowEmpty>
            <SelectInput optionText="title"/>
        </ReferenceInput>
    </Filter>
);

const CommentsTitle = ({ record }) => {
    return <span>Comment: {record ? `${record.name}` : ''}</span>
};

//CommentList - begin
const cardStyle = {
    width: 300,
    minHeight: 300,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};
const CommentGrid = ({ ids, data, basePath }) => (
    <div style={{ margin: '1em' }}>
    {ids.map(id =>
        <Card key={id} style={cardStyle}>
            <CardHeader
                title={<TextField record={data[id]} source="postId" />}
                subheader={<TextField record={data[id]} source="name" />}
                avatar={<Avatar icon={<CommentIcon />} />}
            />
            <CardContent >
                <TextField record={data[id]} source="body" />
            </CardContent>
            <CardContent>
            <ReferenceField record={data[id]} basePath={basePath} label="Post" source="postId" reference="posts" >
                <TextField source="title" />
            </ReferenceField>
            </CardContent>
        </Card>
    )}
    </div>
);

CommentGrid.defaultProps = {
    data: {},
    ids: [],
};

export const CommentList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
    <List title={<CommentsTitle/>} filters={<CommentsFilter/>} {...props} bulkActionButtons={<CommentBulkActionButtons/>}>
        {isSmall ? (
            <SimpleList
                primaryText={record => record.name}
                secondaryText={record => record.body}
                tertiaryText={record => record.email}
            />    
        ) :(
        <CommentGrid/>
        )}
    </List>
    );
};
//CommentList - end

export const CommentShow = props => (
    <Show {...props} title={<CommentsTitle/>} actions={<CommentList/>}>
        <SimpleShowLayout>
            <TextField source="name"/>
            <TextField source="body"/>
            <TextField source="email"/>
        </SimpleShowLayout>
    </Show>
);