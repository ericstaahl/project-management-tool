import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { Projects } from '../../types/ProjectTypes';
import useAuth from '../../context/AuthContext';
import TextLineClamp from '../styled/TextLineClamp';
import EditLink from '../styled/EditLink';
import H3 from '../styled/H3';
import MoreHorizontal from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import { colors } from '../../lib/colors';

const BoldSpan = styled.span({
    fontWeight: 'bold',
});
const TitleWrapper = styled.div({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    wordBreak: 'break-word',
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
                            <MoreHorizontal fontSize={'large'} />
                        </IconButton>
                    </EditLink>
                </TitleEditWrapper>
            )}
            <div>
                <BoldSpan>Start date: </BoldSpan>
                <TextLineClamp>
                    {`${new Date(project.start_date).toLocaleDateString(
                        'sv-SE'
                    )}`}
                </TextLineClamp>
            </div>
            <div>
                <BoldSpan>Due date: </BoldSpan>
                <TextLineClamp>
                    {`${new Date(project.due_date).toLocaleDateString(
                        'sv-SE'
                    )}`}
                </TextLineClamp>
            </div>
            <div>
                <BoldSpan>Number of todos: </BoldSpan>
                <TextLineClamp>{`${project._count.todo}`}</TextLineClamp>
            </div>
            <div>
                <BoldSpan>Role: </BoldSpan>
                <TextLineClamp>
                    {project.user_id === auth?.user_id ? 'Owner' : 'Member'}
                </TextLineClamp>
            </div>
            <div>
                <BoldSpan>Completed: </BoldSpan>
                <TextLineClamp>{project.complete ? 'Yes' : 'No'}</TextLineClamp>
            </div>
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
