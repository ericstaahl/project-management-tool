import styled from '@emotion/styled';
import React from 'react';
import Select, { GroupBase, Props } from 'react-select';
import SortOrderArrow from './SortOrderArrow';

const Container = styled.div({
    margin: '1rem 0',
    display: 'flex',
    alignContent: 'center',
    rowGap: '0.5rem',
    justifyContent: 'space-between',
    flexDirection: 'column',
});

const LabelWrapper = styled.div({
    display: 'flex',
    // justifyContent: 'space-between',
    columnGap: '0.5rem',
});

type SortOrder = 'asc' | 'desc';

export type SelectProps<
    Option,
    isMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
> = Props<Option, isMulti, Group>;

export interface ComponentProps<
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
> {
    label?: string;
    selectProps: SelectProps<Option, IsMulti, Group>;
    handleSetSortOrder?: (order: SortOrder) => void;
    sortOrder?: SortOrder;
}

const SelectInput = <
    Option,
    IsMulti extends boolean = false,
    Group extends GroupBase<Option> = GroupBase<Option>
>(
    props: ComponentProps<Option, IsMulti, Group>
): JSX.Element => {
    return (
        <Container>
            <LabelWrapper>
                {props.label !== undefined && (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '1rem',
                            }}
                        >
                            {props.label}
                        </div>
                        {props.sortOrder !== undefined &&
                            props.handleSetSortOrder !== undefined && (
                                <SortOrderArrow
                                    sortOrder={props.sortOrder}
                                    handleSetSortOrder={
                                        props.handleSetSortOrder
                                    }
                                />
                            )}
                    </>
                )}
            </LabelWrapper>
            <Select
                styles={{
                    container: (baseStyles) => ({
                        ...baseStyles,
                        width: '225px',
                    }),
                    option: (baseStyles) => ({
                        ...baseStyles,
                        color: '#111',
                    }),
                }}
                isSearchable={false}
                {...props.selectProps}
            />
        </Container>
    );
};

export default SelectInput;
