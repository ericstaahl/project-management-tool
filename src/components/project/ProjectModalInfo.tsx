import React from 'react';
import styled from '@emotion/styled';
import { Projects } from '../../types/ProjectTypes';
import ProjectDescription from './ProjectDescription';
import useAuth from '../../context/AuthContext';
import { colors } from '../../lib/colors';

const InfoContainer = styled.div({
    rowGap: '1rem',
    backgroundColor: colors.primary,
    fontSize: '1.2rem',
    borderRadius: '0.5rem',
    minHeight: '200px',
    minWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '2rem 1rem',
    border: `2px solid ${colors.borderPrimary}`,
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
