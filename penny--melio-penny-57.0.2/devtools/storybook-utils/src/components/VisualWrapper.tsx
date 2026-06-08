import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

export function VisualWrapper({ children, isInverse = false }: { children: ReactNode; isInverse?: boolean }) {
  return (
    <Box style={{ position: 'relative' }}>
      {isInverse && (
        <Box
          style={{
            position: 'absolute',
            margin: '-10px',
            zIndex: -10,
            inset: 0,
            backgroundColor: 'black',
          }}
        />
      )}
      {children}
    </Box>
  );
}
