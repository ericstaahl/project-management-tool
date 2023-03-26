import styled from '@emotion/styled';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../context/AuthContext';
import useGetAllUsers from '../../hooks/user/useGetAllUsers';
import useInviteUser from '../../hooks/user/useInviteUsers';
import { Projects } from '../../types/ProjectTypes';
import SelectInput from '../input/SelectInput';
import Button from '../styled/Button';
import H3 from '../styled/H3';

const Container = styled.div({
    width: '40vw',
    backgroundColor: '#201e1e',
    borderRadius: '0.5rem',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '2rem 1rem',
});

const AddUserToProject = ({
    project,
}: {
    project: Projects[0];
}): JSX.Element => {
    const { data: users, isLoading, refetch } = useGetAllUsers();

    const auth = useAuth();

    const options = useMemo(() => {
        const userOptions: Array<{ value: string; label: string }> = [];
        console.log('Members:', project.members);

        users?.forEach((user) => {
            if (user.username === auth?.username) return;
            console.log('user', user);
            const userIsFound = project.members?.some(
                (member) => member.username === user.username
            );
            console.log('userIsFound', userIsFound);
            if (userIsFound === true) return;
            userOptions.push({
                value: user.username,
                label: user.username,
            });
        });
        return userOptions;
    }, [users]);

    const [selectedUser, setSelectedUser] = useState<{
        value: string;
        label: string;
    }>();
    console.log(selectedUser);

    const inviteUser = useInviteUser();

    return (
        <Container>
            <H3>Add user to project</H3>
            <div style={{ display: 'flex' }}>
                {options !== undefined && !isLoading && (
                    <SelectInput<typeof options[0]>
                        label={'User'}
                        selectProps={{
                            placeholder: 'Select user...',
                            options,
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
                onClick={() => {
                    if (selectedUser === undefined) return;

                    const userToAdd = selectedUser.value;

                    inviteUser.mutate(
                        {
                            username: userToAdd,
                            projectId: String(project.project_id),
                        },
                        {
                            onSuccess: () => {
                                toast.success(
                                    `Successfully added user ${userToAdd}`
                                );
                            },
                            onError: () => {
                                toast.error(
                                    'An error occured when trying to add a user.'
                                );
                            },
                            onSettled: () => {
                                refetch()
                                    .then()
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
                Add
            </Button>
        </Container>
    );
};

export default AddUserToProject;
