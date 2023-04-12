import styled from '@emotion/styled';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Projects } from '../../types/ProjectTypes';
import SelectInput from '../input/SelectInput';
import Button from '../styled/Button';
import H3 from '../styled/H3';
import useRemoveUser from '../../hooks/user/useRemoveUser';

const Container = styled.div({
    width: '600px',
    backgroundColor: '#201e1e',
    borderRadius: '0.5rem',
    minHeight: '280px',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem 1rem',
});

const RemoveUserFromProject = ({
    project,
    handleRefetchs,
}: {
    project: Projects[0];
    handleRefetchs: () => Promise<void>;
}): JSX.Element => {
    const options = useMemo(() => {
        const userOptions: Array<{ value: string; label: string }> = [];
        console.log('Members:', project.members);

        project.members?.forEach((member) => {
            userOptions.push({
                value: member.username,
                label: member.username,
            });
        });
        return userOptions;
    }, [project]);

    const [selectedUser, setSelectedUser] = useState<{
        value: string;
        label: string;
    }>();
    console.log(selectedUser);

    const removeUser = useRemoveUser();

    return (
        <Container>
            <H3>Remove user from project</H3>
            <div style={{ display: 'flex' }}>
                {options !== undefined && (
                    <SelectInput<typeof options[0]>
                        label={'User'}
                        selectProps={{
                            maxMenuHeight: 115,
                            placeholder: 'Select user...',
                            options,
                            value: selectedUser,
                            onChange: (selected) => {
                                if (selected !== null)
                                    setSelectedUser({
                                        label: selected.label,
                                        value: selected.value,
                                    });
                            },
                        }}
                    />
                )}
            </div>
            <Button
                style={{ marginTop: 'auto' }}
                onClick={() => {
                    if (selectedUser === undefined) return;

                    const userToRemove = selectedUser.value;

                    removeUser.mutate(
                        {
                            username: userToRemove,
                            projectId: String(project.project_id),
                        },
                        {
                            onSuccess: () => {
                                toast.success(
                                    `Successfully removed user ${userToRemove}`
                                );
                            },
                            onError: () => {
                                toast.error(
                                    'An error occured when trying to remove a user.'
                                );
                            },
                            onSettled: () => {
                                handleRefetchs()
                                    .then(() => {})
                                    .catch(() => {
                                        toast.error(
                                            'An error occured while refetching query.'
                                        );
                                    });
                            },
                        }
                    );
                }}
            >
                Remove
            </Button>
        </Container>
    );
};

export default RemoveUserFromProject;
