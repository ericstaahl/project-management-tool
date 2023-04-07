import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import MUIButton from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MoreHorizontal from '@mui/icons-material/MoreHoriz';
import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAddProjectComment from '../hooks/project/useAddProjectComment';
import { Project } from '../types/ProjectTypes';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import IconButton from '@mui/material/IconButton';
import { colors } from '../lib/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

dayjs.extend(isToday);

interface FormValues {
    content: string;
}

const CommentSection = ({
    projectId,
    comments,
    handleRefetch,
}: {
    projectId: string;
    comments: Project['project_comment'];
    handleRefetch: () => Promise<any>;
}): JSX.Element => {
    const [anchorCommmentMenu, setAnchorCommmentMenu] =
        useState<null | HTMLElement>(null);

    const handleOpenCommentMenu = (e: React.MouseEvent<HTMLElement>): void => {
        setAnchorCommmentMenu(e.currentTarget);
    };

    const handleCloseCommentMenu = (): void => {
        setAnchorCommmentMenu(null);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
    } = useForm<FormValues>();

    console.log(errors);
    const addProjectComment = useAddProjectComment();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        console.log(data);
        const dataToSend = { comment: { content: data.content }, projectId };

        addProjectComment.mutate(dataToSend, {
            onSuccess: () => {
                resetField('content');
                handleRefetch()
                    .then()
                    .catch(() => {
                        toast.error('An error occured while refetching query.');
                    });
            },
            onError: () => {
                toast.error('An error occured while updating the due date.');
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
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component='span'
                                                fontSize={'0.8rem'}
                                                marginLeft={'auto'}
                                                noWrap
                                            >
                                                <IconButton
                                                    sx={{
                                                        padding: 0,
                                                        color: colors.secondary,
                                                    }}
                                                    onClick={
                                                        handleOpenCommentMenu
                                                    }
                                                >
                                                    <MoreHorizontal
                                                        fontSize={'medium'}
                                                    />
                                                </IconButton>
                                            </Typography>
                                            <Box
                                                sx={{
                                                    flexGrow: 0,
                                                    display: {
                                                        xs: 'none',
                                                        md: 'flex',
                                                    },
                                                }}
                                            >
                                                <Menu
                                                    id='menu-appbar'
                                                    anchorEl={
                                                        anchorCommmentMenu
                                                    }
                                                    keepMounted
                                                    open={Boolean(
                                                        anchorCommmentMenu
                                                    )}
                                                    onClose={
                                                        handleCloseCommentMenu
                                                    }
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}
                                                    sx={{
                                                        display: {
                                                            xs: 'none',
                                                            md: 'block',
                                                        },
                                                    }}
                                                    color='inherit'
                                                >
                                                    <MenuItem>
                                                        <IconButton
                                                            sx={{
                                                                color: colors.secondary,
                                                                marginLeft:
                                                                    'auto',
                                                                padding: 0,
                                                            }}
                                                        >
                                                            <Delete fontSize='small' />
                                                        </IconButton>
                                                    </MenuItem>
                                                </Menu>
                                            </Box>
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
