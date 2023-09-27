import { Box, Fade, Progress } from '@/components/chakra';
import { useState, useEffect, useInterval, useTimeoutFn } from '@/hooks';

type LoadingBarProps = {
  isLoading: boolean;
  isError?: boolean;
};

export const LoadingBar = ({ isLoading, isError }: LoadingBarProps) => {
  const [startTime, setStartTime] = useState(Date.now());
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const colorScheme = isError ? 'red' : 'green';

  const [isReady, cancel, reset] = useTimeoutFn(() => {
    if (loading && !isLoading) {
      setLoading(false);
    }
  }, 1200);

  useInterval(
    () => {
      const elapsedTime = Date.now() - startTime;
      const percent =
        (Math.atan(elapsedTime / (isLoading ? 3000 : 300)) / (Math.PI / 2)) *
        100;
      setProgress(percent);
    },
    loading ? 10 : null
  );

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      setStartTime(Date.now());
      reset();
    } else if (isReady()) {
      setLoading(false);
    }
    return () => {
      if (!isReady() && !isLoading) {
        cancel();
      }
    };
  }, [cancel, isReady, loading, reset, isLoading]);

  return (
    <Fade in={loading}>
      <Box position="absolute" top="0" left="0" width="100vw">
        <Progress height="3px" colorScheme={colorScheme} value={progress} />
      </Box>
    </Fade>
  );
};
