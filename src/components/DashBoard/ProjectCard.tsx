import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../helpers/formatDate';
import { Projects } from '../../types/ProjectTypes';
import Card from '../styled/Card';
import H3 from '../styled/H3';

interface Props {
    project: Projects[0];
    hoursLeft: number;
}

const ProjectCard = ({ project, hoursLeft }: Props): JSX.Element => {
    console.log(hoursLeft, project.title);
    const daysLeftFloat = hoursLeft / 24;
    const daysLeft = Math.ceil(daysLeftFloat);
    console.log('daysLeft', daysLeft);

    return (
        <Card style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <H3>{project.title}</H3>
                <div style={{ marginTop: '0.8rem' }}>
                    {`Start date: ${formatDate(project.start_date)}`}
                </div>

                <div style={{ marginTop: '0.8rem' }}>
                    {`Due date: ${formatDate(project.due_date)}`}
                </div>

                <div style={{ marginTop: '0.8rem' }}>
                    {daysLeft > 0
                        ? `${daysLeft} days left`
                        : daysLeft === 0
                        ? 'Due date is today'
                        : `${Math.abs(daysLeft)} ${
                              Math.abs(daysLeft) > 1 ? 'days' : 'day'
                          } since due date passed`}
                </div>
            </div>

            <Link
                style={{ color: 'white' }}
                to={`/projects/${project.project_id}`}
            >
                See more
            </Link>
        </Card>
    );
};

export default ProjectCard;
