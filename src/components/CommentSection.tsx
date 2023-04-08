import React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import MUIButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Project } from '../types/ProjectTypes';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import IconButton from '@mui/material/IconButton';
import { colors } from '../lib/colors';
import useDeleteProjectComment from '../hooks/project/useDeleteComment';
import { MutateOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import useAuth from '../context/AuthContext';

dayjs.extend(isToday);

interface FormValues {
    content: string;
}

export interface Params {
    comment: { content: string };
    id: string;
}

interface Props {
    id: string;
    comments: Project['project_comment'];
    handleRefetch: () => Promise<any>;
    handleAddComment: (
        data: Params,
        options?:
            | MutateOptions<AxiosResponse<any, any>, unknown, Params, unknown>
            | undefined
    ) => void;
}

const CommentSection = ({
    id,
    comments,
    handleRefetch,
    handleAddComment,
}: Props): JSX.Element => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
    } = useForm<FormValues>();

    const auth = useAuth();

    const deleteComment = useDeleteProjectComment();
    const handleDeleteComment = (id: string): void => {
        console.log(id);
        deleteComment.mutate(
            {
                commentId: id,
            },
            {
                onSuccess: () => {
                    resetField('content');
                    handleRefetch()
                        .then()
                        .catch(() => {
                            toast.error(
                                'An error occured while refetching query.'
                            );
                        });
                },
                onError: () => {
                    toast.error('An error occured while deleting the comment.');
                },
            }
        );
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        const dataToSend = {
            comment: { content: data.content },
            id,
        };

        handleAddComment(dataToSend, {
            onSuccess: () => {
                resetField('content');
                handleRefetch()
                    .then()
                    .catch(() => {
                        toast.error('An error occured while refetching query.');
                    });
            },
            onError: () => {
                toast.error('An error occured while adding the comment.');
            },
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
                {comments.length > 0 &&
                    comments.map((comment) => (
                        <React.Fragment key={comment.comment_id}>
                            <ListItem alignItems='flex-start'>
                                <ListItemText
                                    primary={
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    display: 'inline',
                                                    marginRight: '0.5rem',
                                                }}
                                                component='span'
                                                fontWeight='bold'
                                                fontSize={'1rem'}
                                            >
                                                {comment.user.username}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    display: 'inline',
                                                    textAlign: 'center',
                                                }}
                                                component='span'
                                                fontSize={'0.8rem'}
                                            >
                                                {dayjs(
                                                    comment.time_posted
                                                ).isToday()
                                                    ? dayjs(
                                                          comment.time_posted
                                                      ).format('HH:MM')
                                                    : dayjs(
                                                          comment.time_posted
                                                      ).format('YYYY-MM-DD')}
                                            </Typography>
                                            {comment.user_id ===
                                                auth?.user_id && (
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component='span'
                                                    fontSize={'0.8rem'}
                                                    marginLeft={'auto'}
                                                    noWrap
                                                >
                                                    <IconButton
                                                        sx={{
                                                            color: colors.secondary,
                                                            marginLeft: 'auto',
                                                            padding: 0,
                                                        }}
                                                        onClick={() => {
                                                            handleDeleteComment(
                                                                comment.comment_id
                                                            );
                                                        }}
                                                    >
                                                        <Delete fontSize='small' />
                                                    </IconButton>
                                                </Typography>
                                            )}
                                        </div>
                                    }
                                    secondary={
                                        <Typography fontSize={'1rem'}>
                                            {comment.content}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <Divider component='li' />
                        </React.Fragment>
                    ))}
            </List>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    <TextField
                        label='Comment'
                        variant='outlined'
                        multiline
                        minRows={2}
                        maxRows={2}
                        sx={{ width: '100%' }}
                        {...register('content', {
                            required: {
                                value: true,
                                message:
                                    'Must be between 10 and 200 characters long',
                            },
                            minLength: {
                                value: 10,
                                message:
                                    'Must be between 10 and 200 characters long',
                            },
                            maxLength: {
                                value: 200,
                                message:
                                    'Must be between 10 and 200 characters long',
                            },
                        })}
                        error={Boolean(errors.content)}
                        helperText={errors.content?.message}
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
