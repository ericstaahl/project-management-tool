import React from 'react';

interface Props {
    sortOrder: 'asc' | 'desc';
    handleSetSortOrder: (order: 'asc' | 'desc') => void;
}

const SortOrderArrow: React.FC<Props> = ({
    sortOrder,
    handleSetSortOrder,
    ...rest
}: Props) => {
    return (
        <div
            style={{ cursor: 'pointer', fontSize: '1.5rem' }}
            onClick={() => {
                sortOrder === 'asc'
                    ? handleSetSortOrder('desc')
                    : handleSetSortOrder('asc');
            }}
            {...rest}
        >
            {sortOrder === 'asc' ? '↑' : '↓'}
        </div>
    );
};

export default SortOrderArrow;
