import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { Projects } from '../../types/ProjectTypes';
import useAuth from '../../context/AuthContext';

const TextContainer = styled.div({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,
    overflow: 'hidden',
});

const BoldSpan = styled.span({
    fontWeight: 'bold',
});

const StyledLink = styled(Link)({
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: '1.5rem',
    textAlign: 'center',
});

const TitleWrapper = styled.div({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    wordBreak: 'break-all',
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
                    <StyledLink to={`/projects/${project.project_id}/edit`}>
                        ...
                    </StyledLink>
                </TitleEditWrapper>
            )}
            {project.number_of_members > 0 ? (
                <div>
                    <BoldSpan>Number of members: </BoldSpan>
                    <TextContainer>
                        {`${project.number_of_members}`}
                    </TextContainer>
                </div>
            ) : (
                <></>
            )}
            <div>
                <BoldSpan>Start date: </BoldSpan>
                <TextContainer>
                    {`${new Date(project.start_date).toLocaleDateString(
                        'sv-SE'
                    )}`}
                </TextContainer>
            </div>
            <div>
                <BoldSpan>Due date: </BoldSpan>
                <TextContainer>
                    {`${new Date(project.due_date).toLocaleDateString(
                        'sv-SE'
                    )}`}
                </TextContainer>
            </div>
            <div>
                <BoldSpan>Number of todos: </BoldSpan>
                <TextContainer>{`${project._count.todo}`}</TextContainer>
            </div>
            <div>
                <BoldSpan>Role: </BoldSpan>
                <TextContainer>
                    {project.user_id === auth?.user_id ? 'Owner' : 'Member'}
                </TextContainer>
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
