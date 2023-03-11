import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { Projects } from '../../types/ProjectTypes';
import useAuth from '../../context/AuthContext';
import TextLineClamp from '../styled/TextLineClamp';
import EditLink from '../styled/EditLink';

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
                        <h3>{`${project.title}`}</h3>
                    </TitleWrapper>
                    <EditLink to={`/projects/${project.project_id}/edit`}>
                        ...
                    </EditLink>
                </TitleEditWrapper>
            )}
            {project.number_of_members > 0 ? (
                <div>
                    <BoldSpan>Number of members: </BoldSpan>
                    <TextLineClamp>
                        {`${project.number_of_members}`}
                    </TextLineClamp>
                </div>
            ) : (
                <></>
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
