import styled from '@emotion/styled';
import React, { useMemo, useState } from 'react';
import useGetAllUsers from '../../hooks/user/useGetAllUsers';
import useInviteUser from '../../hooks/user/useInviteUsers';
import SelectInput from '../input/SelectInput';
import Button from '../styled/Button';

const Container = styled.div({
    width: '50%',
    backgroundColor: 'red',
    borderRadius: '0.5rem',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '2rem 1rem',
});

const AddUserToProject: React.FC<{ projectId: string | undefined }> = ({
    projectId,
}) => {
    const { data: users, isLoading } = useGetAllUsers();
    console.log(users);
    const options = useMemo(() => {
        return users?.map((user) => ({
            value: user.username,
            label: user.username,
        }));
    }, [users]);
    const [selectedUser, setSelectedUser] = useState<{
        value: string;
        label: string;
    }>();
    console.log(selectedUser);

    const inviteUser = useInviteUser();

    return (
        <Container>
            <div>Add user to project</div>
            <div style={{ display: 'flex' }}>
                {options !== undefined && !isLoading && (
                    <SelectInput<typeof options[0]>
                        label={'User'}
                        selectProps={{
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
                    if (selectedUser === undefined || projectId === undefined)
                        return;
                    inviteUser.mutate({
                        username: selectedUser.value,
                        projectId,
                    });
                }}
            >
                Add
            </Button>
        </Container>
    );
};

export default AddUserToProject;
