import { type TestIdProp, useTestId } from '@melio/penny-utils';
import { forwardRef } from 'react';

export type VideoProps = {
  /** The path to the video. */
  src: string;
  /** The width of the video's display area. Either in pixels or percentages. */
  width?: string | number;
  /** The height of the video's display area. Either in pixels or percentages. */
  height?: string | number;
  /** If specified, hides the default browser controls for video playback. */
  hideControls?: boolean;
  /** If specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data. This will also set `isMuted` to be true. */
  autoPlay?: boolean;
  /** If set, the audio will be initially silenced. Will be set to true if `autoPlay` is specified. */
  isMuted?: boolean;
  /** If specified, the browser will automatically seek back to the start upon reaching the end of the video. */
  loop?: boolean;
} & TestIdProp;

export const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({ hideControls, autoPlay, isMuted, 'data-testid': dataTestId = 'video', ...otherProps }, ref) => {
    const getTestId = useTestId(dataTestId);

    return (
      <video
        data-component="Video"
        ref={ref}
        controls={!hideControls}
        autoPlay={autoPlay}
        muted={autoPlay || isMuted}
        {...getTestId()}
        {...otherProps}
      />
    );
  }
);

Video.displayName = 'Video';
