import React from 'react';
import Select, { GroupBase, Props } from 'react-select';

type SelectProps<
    Option,
    isMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, isMulti, Group>;

interface ComponentProps<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
> {
    selectProps: SelectProps<Option, IsMulti, Group>;
}

const SortBy = <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(
    props: ComponentProps<Option, IsMulti, Group>
): JSX.Element => {
    return (
        <div
            style={{
                margin: '1rem 0',
                width: '40%',
                display: 'flex',
                alignContent: 'center',
                columnGap: '1rem',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '1.2rem',
                }}
            >
                Sort by:
            </div>
            <Select
                styles={{
                    container: (baseStyles) => ({
                        ...baseStyles,
                        minWidth: '180px',
                    }),
                    option: (baseStyles) => ({
                        ...baseStyles,
                        color: '#111',
                    }),
                }}
                isSearchable={false}
                {...props.selectProps}
            />
        </div>
    );
};

export default SortBy;
