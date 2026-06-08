import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Portal } from '@chakra-ui/react';
import { cloneElement, ReactElement, useState } from 'react';

import { Container } from './Container';

type PlacementProps = {
  wrapper: ReactElement;
  placements: string[];
};

export const Placement = ({ wrapper, placements, ...props }: PlacementProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedItem = placements.find((_item, index) => index === selectedIndex);
  return (
    <Container {...props} data-component="Storybook.Placement">
      <Menu>
        {cloneElement(wrapper, {
          children: (
            <MenuButton as={Button} padding="s" border="1px solid black" borderRadius="global.200">
              {selectedItem ?? 'Select placement'}
            </MenuButton>
          ),
          placement: selectedItem,
        })}
        <Portal>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Box as="melio-wrapper">
            <MenuList>
              {placements.map((placement, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    setSelectedIndex(index);
                  }}
                >
                  {placement}
                </MenuItem>
              ))}
            </MenuList>
          </Box>
        </Portal>
      </Menu>
    </Container>
  );
};

Placement.displayName = 'Storybook.Placement';
