import { Container } from './Container';
import { colorPalettes } from './shared-styles';

export type CodeProps = {
  label: string;
};

export const Code = ({ label }: CodeProps) => {
  const styles = {
    margin: 'xxxs',
    padding: '3px 5px',
    lineHeight: '1',
    border: '1px solid #eee',
    backgroundColor: '#f8f8f8',
    borderRadius: 'global.50',
    fontSize: '13px',
    color: colorPalettes.neutral['1000'],
    fontFamily: "Menlo, Consolas, 'DejaVu Sans Mono', monospace",
  };

  return (
    <Container data-component="Code" as="code" __css={styles}>
      {label}
    </Container>
  );
};

Code.displayName = 'Code';
