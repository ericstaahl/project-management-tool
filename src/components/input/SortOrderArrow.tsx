import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownwardRounded';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpwardRounded';
import IconButton from '@mui/material/IconButton';

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
        <IconButton
            onClick={() => {
                sortOrder === 'asc'
                    ? handleSetSortOrder('desc')
                    : handleSetSortOrder('asc');
            }}
            {...rest}
        >
            {sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </IconButton>
    );
};

export default SortOrderArrow;
