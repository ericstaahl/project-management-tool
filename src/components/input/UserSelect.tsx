import React, { useMemo } from 'react';
import {
    FieldValues,
    useController,
    UseControllerProps,
} from 'react-hook-form';
import useGetAllMembers from '../../hooks/user/useGetAllMembers';
import SelectInput from './SelectInput';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
    label?: string;
    projectId: number;
    defaultInputValue?: string;
}

interface InputValue {
    value: string;
    label: string;
}

const UserSelect = <T extends FieldValues>({
    label,
    projectId,
    defaultInputValue,
    ...props
}: Props<T>): JSX.Element => {
    console.log(props);
    const { data: users, isLoading } = useGetAllMembers(projectId);
    const { field } = useController(props);
    console.log(users);
    const options = useMemo(() => {
        return users?.map((user) => ({
            value: user.username,
            label: user.username,
        }));
    }, [users]);

    const defaultValue =
        defaultInputValue !== undefined
            ? { value: defaultInputValue, label: defaultInputValue }
            : undefined;

    console.log(props.defaultValue);

    return (
        <div style={{ display: 'flex' }}>
            {options !== undefined && !isLoading && (
                <SelectInput<InputValue>
                    label={label}
                    selectProps={{
                        ...field,
                        value:
                            typeof field.value !== 'string'
                                ? field.value
                                : null,
                        options,
                        defaultValue,
                    }}
                />
            )}
        </div>
    );
};

export default UserSelect;
