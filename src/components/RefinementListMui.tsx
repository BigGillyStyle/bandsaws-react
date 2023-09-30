import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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
      <List>
        {items.map((item) => (
          <ListItem key={item.label} disablePadding>
            <Checkbox
              edge="start"
              checked={item.isRefined}
              onChange={() => refine(item.value)}
              sx={{ padding: '3px' }}
            />
            <ListItemText
              primary={`${item.label} (${item.count})`}
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </ListItem>
        ))}
      </List>
      {canToggleShowMore && (
        <Button onClick={toggleShowMore}>
          {isShowingMore ? 'Show less' : 'Show more'}
        </Button>
      )}
    </>
  );
}
