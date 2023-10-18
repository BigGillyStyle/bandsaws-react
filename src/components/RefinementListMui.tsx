import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { UseRefinementListProps, useRefinementList } from 'react-instantsearch';

function sortItems(items: any[]) {
  if (items.every((item) => !Number.isNaN(parseInt(item.value)))) {
    return [...items].sort((a, b) => parseInt(a.value) - parseInt(b.value));
  }
  return items;
}

function getLabel(label: string) {
  if (label === 'true') {
    return 'Yes';
  }
  if (label === 'false') {
    return 'No';
  }
  return label;
}

export default function RefinementListMui(props: UseRefinementListProps) {
  const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore } = useRefinementList({ ...props, limit: 1000 });

  let sortedItems = items;

  return (
    <>
      <List>
        {sortedItems.map((item) => (
          <ListItem key={item.label} disablePadding secondaryAction={`(${item.count})`}>
            <Checkbox edge="start" checked={item.isRefined} onChange={() => refine(item.value)} sx={{ padding: '3px' }} />
            <ListItemText primary={getLabel(item.label)} primaryTypographyProps={{ variant: 'body2' }} />
          </ListItem>
        ))}
      </List>
      {canToggleShowMore && <Button onClick={toggleShowMore}>{isShowingMore ? 'Show less' : 'Show more'}</Button>}
    </>
  );
}
