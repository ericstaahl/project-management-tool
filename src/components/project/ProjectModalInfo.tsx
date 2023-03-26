import React from 'react';
import styled from '@emotion/styled';
import { Projects } from '../../types/ProjectTypes';
import ProjectDescription from './ProjectDescription';
import useAuth from '../../context/AuthContext';

const InfoContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    borderRadius: '5px',
    backgroundColor: '#363942',
    padding: '1rem',
    fontSize: '1.2rem',
    height: '40vh',
    width: '40vw',
});

interface Props {
    project: Projects[0];
    auth: ReturnType<typeof useAuth>;
    detail?: boolean;
}

const ProjectModalInfo = ({ project, detail, auth }: Props): JSX.Element => {
    return (
        <InfoContainer>
            <ProjectDescription project={project} detail={detail} auth={auth} />
        </InfoContainer>
    );
};

export default ProjectModalInfo;
