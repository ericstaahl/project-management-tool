import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { Projects } from '../../types/ProjectTypes';
import useAuth from '../../context/AuthContext';
import TextLineClamp from '../styled/TextLineClamp';
import EditLink from '../styled/EditLink';
import H3 from '../styled/H3';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { colors } from '../../lib/colors';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BoldSpan = styled.span({
    fontWeight: 'bold',
});
const TitleWrapper = styled.div({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    wordBreak: 'break-word',
    margin: 'auto 0',
});

const TitleEditWrapper = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 'auto',
});

interface Params {
    project: Projects[0];
    auth: ReturnType<typeof useAuth>;
    detail?: boolean;
}

const ProjectDescription = ({
    project,
    auth,
    detail = false,
}: Params): JSX.Element => {
    return (
        <>
            {!detail && (
                <TitleEditWrapper>
                    <TitleWrapper>
                        <H3>{`${project.title}`}</H3>
                    </TitleWrapper>
                    <EditLink to={`/projects/${project.project_id}/edit`}>
                        <IconButton style={{ color: colors.secondary }}>
                            <EditIcon fontSize={'small'} />
                        </IconButton>
                    </EditLink>
                </TitleEditWrapper>
            )}
            <div style={{ padding: detail ? '0 0.5rem' : 0 }}>
                <BoldSpan>Start date </BoldSpan>
                <TextLineClamp>
                    {`${new Date(project.start_date).toLocaleDateString(
                        'sv-SE'
                    )}`}
                </TextLineClamp>
            </div>
            <div style={{ padding: detail ? '0 0.5rem' : 0 }}>
                <BoldSpan>Due date: </BoldSpan>
                <TextLineClamp>
                    {`${new Date(project.due_date).toLocaleDateString(
                        'sv-SE'
                    )}`}
                </TextLineClamp>
            </div>
            <div style={{ padding: detail ? '0 0.5rem' : 0 }}>
                <BoldSpan>Number of todos </BoldSpan>
                <TextLineClamp>{`${project._count.todo}`}</TextLineClamp>
            </div>
            <div style={{ padding: detail ? '0 0.5rem' : 0 }}>
                <BoldSpan>Role </BoldSpan>
                <TextLineClamp>
                    {project.user_id === auth?.user_id ? 'Owner' : 'Member'}
                </TextLineClamp>
            </div>
            <div style={{ padding: detail ? '0 0.5rem' : 0 }}>
                <BoldSpan>Completed </BoldSpan>
                <TextLineClamp>{project.complete ? 'Yes' : 'No'}</TextLineClamp>
            </div>

            {!detail && (
                <div style={{ padding: detail ? '0 0.5rem' : 0 }}>
                    <BoldSpan>Description </BoldSpan>
                    <TextLineClamp style={{ WebkitLineClamp: 1 }}>
                        <Typography>{project.description}</Typography>
                    </TextLineClamp>
                </div>
            )}

            {detail && (
                <div style={{ maxWidth: '50vw' }}>
                    <BoldSpan style={{ padding: '0 0.5rem' }}>
                        Description{' '}
                    </BoldSpan>

                    <Accordion sx={{ marginTop: '0.3rem' }}>
                        <AccordionSummary
                            sx={{ paddingLeft: '0.5rem' }}
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography
                                sx={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 1,
                                    overflow: 'hidden',
                                }}
                            >
                                {project.description}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{project.description}</Typography>
                        </AccordionDetails>
                        <Typography></Typography>
                    </Accordion>
                </div>
            )}

            {!detail && (
                <Link
                    style={{ color: 'white' }}
                    to={`/projects/${project.project_id}`}
                >
                    See more
                </Link>
            )}
        </>
    );
};

export default ProjectDescription;
