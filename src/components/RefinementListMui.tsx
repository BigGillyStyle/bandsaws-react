import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch';

export default function RefinementListMui(props: UseRefinementListProps) {
  const {
    items,
    refine,
    // searchForItems,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList(props);

  return (
    <>
      <ul style={{ padding: 0 }}>
        {items.map((item) => (
          <li key={item.label} style={{ listStyleType: 'none' }}>
            <label>
              <Checkbox
                checked={item.isRefined}
                onChange={() => refine(item.value)}
              />
              <span>{item.label}</span>
              <span> ({item.count})</span>
            </label>
          </li>
        ))}
      </ul>
      {canToggleShowMore && (
        <Button onClick={toggleShowMore}>
          {isShowingMore ? 'Show less' : 'Show more'}
        </Button>
      )}
    </>
  );
}
