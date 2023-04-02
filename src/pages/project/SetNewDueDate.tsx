import React from 'react';
import InputLabelWrapper from '../../components/input/InputLabelWrapper';
import InputContainer from '../../components/input/InputContainer';
import styled from '@emotion/styled';
import Input from '../../components/styled/Input';
import { Projects } from '../../types/ProjectTypes';
import Button from '../../components/styled/Button';
import useUpdateProject from '../../hooks/project/useUpdateProject';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { nowFromDate } from '../../helpers/formatDate';
import { colors } from '../../lib/colors';
import ButtonContainer from '../../components/styled/ButtonContainer';

const ModalContainer = styled.div({
    backgroundColor: colors.primary,
    borderRadius: '0.5rem',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '2rem 1rem',
    border: `2px solid ${colors.borderPrimary}`,
});

const StyledForm = styled.form({
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '150px',
});

interface Props {
    project: Projects[0];
    handleSetShowModal: () => void;
    handleRefetch: () => Promise<any>;
}

const SetNewDueDate = <T extends Promise<T>>({
    project,
    handleRefetch,
    handleSetShowModal,
}: Props): JSX.Element => {
    const { register, handleSubmit } = useForm<{ due_date: string }>();
    const updateProject = useUpdateProject();

    const onSubmit: SubmitHandler<{ due_date: string }> = (data) => {
        const dueDateFromNow = nowFromDate(data.due_date, 'days');
        if (dueDateFromNow < 0)
            return toast.error(`Can't pick a due date that has already passed`);
        updateProject.mutate(
            {
                updatedProject: {
                    start_date: project.start_date,
                    due_date: project.due_date,
                },
                projectId: String(project.project_id),
            },
            {
                onSuccess: () => {
                    toast.success('Updated due date.');
                    handleRefetch()
                        .then(() => {
                            handleSetShowModal();
                        })
                        .catch(() => {
                            toast.error(
                                'An error occured while refetching query.'
                            );
                        });
                },
                onError: () => {
                    toast.error(
                        'An error occured while updating the due date.'
                    );
                },
            }
        );
    };

    const handleMarkAsComplete = (): void => {
        const projectCopy = { ...project };
        projectCopy.complete = true;
        console.log(projectCopy);
        updateProject.mutate(
            {
                updatedProject: projectCopy,
                projectId: String(project.project_id),
            },
            {
                onSuccess: () => {
                    toast.success('Updated completed status.');
                    handleSetShowModal();
                    void (async () => {
                        await handleRefetch();
                    })();
                },
                onError: () => {
                    toast.error(
                        'An error occured while updating the completed status.'
                    );
                },
            }
        );
    };

    return (
        <ModalContainer>
            <p>The due date of the project has passed.</p>
            <p>Would you like to pick a new date or mark it as complete?</p>

            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <InputContainer>
                    <InputLabelWrapper>
                        <label htmlFor='due_date'>Due date</label>
                    </InputLabelWrapper>

                    <Input
                        {...register('due_date', {
                            required: true,
                        })}
                        type='date'
                    />
                </InputContainer>
                <ButtonContainer style={{ padding: '1rem 0 0 0' }}>
                    <Button type='submit'>Save date</Button>
                    <Button
                        onClick={() => {
                            handleMarkAsComplete();
                        }}
                    >
                        Mark as complete
                    </Button>
                </ButtonContainer>
            </StyledForm>
        </ModalContainer>
    );
};

export default SetNewDueDate;
