import React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import MUIButton from '@mui/material/Button';
import Box from '@mui/material/Box';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAddProjectComment from '../hooks/project/useAddProjectComment';

interface FormValues {
    content: string;
}

const CommentSection = ({ projectId }: { projectId: string }): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const addProjectComment = useAddProjectComment();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        const dataToSend = { comment: { content: data.content }, projectId };

        addProjectComment.mutate(dataToSend, {
            onSuccess: () => {},
            onError: () => {},
        });
    };

    return (
        <div style={{ maxWidth: '720px' }}>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                }}
            >
                <ListItem alignItems='flex-start'>
                    <ListItemText
                        primary='user1'
                        secondary='Can I get an invite?'
                    />
                </ListItem>
                <Divider component='li' />
                <ListItem alignItems='flex-start'>
                    <ListItemText
                        primary='user2'
                        secondary='We need to fix this bug.'
                    />
                </ListItem>
            </List>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <TextField
                        id='outlined-basic'
                        label='Comment'
                        variant='filled'
                        multiline
                        minRows={2}
                        maxRows={2}
                        sx={{ width: '100%' }}
                        {...register('content', { required: true })}
                    />
                    <MUIButton
                        sx={{ display: 'block', ml: 'auto', mt: '0.5rem' }}
                        variant='contained'
                        type='submit'
                    >
                        Post
                    </MUIButton>
                </Box>
            </form>
        </div>
    );
};

export default CommentSection;
