import { useLinearProgressInitialAnimation } from './hooks/useLinearProgressInitialAnimation';
import { LinearProgressIndicator } from './LinearProgressIndicator';
import { LinearProgressRoot } from './LinearProgressRoot';
import { LinearProgressTrack } from './LinearProgressTrack';

export const WithInitialAnimationExample = () => {
  const { value } = useLinearProgressInitialAnimation({ initialValue: 0, targetValue: 60 });

  return (
    <LinearProgressRoot value={value}>
      <LinearProgressTrack>
        <LinearProgressIndicator />
      </LinearProgressTrack>
    </LinearProgressRoot>
  );
};
