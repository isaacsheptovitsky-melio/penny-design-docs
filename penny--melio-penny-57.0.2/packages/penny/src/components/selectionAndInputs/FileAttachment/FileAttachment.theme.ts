import { type ComponentMultiStyleConfig } from '@/theme/component-style-config-types';

import { type FileAttachmentProps } from './FileAttachment.types';

export const fileAttachmentTheme: ComponentMultiStyleConfig<
  'pdf' | 'container' | 'fileImageContainer' | 'attachmentIconContainer' | 'deleteButton' | 'noPreview',
  Pick<FileAttachmentProps, 'isEmpty' | 'onViewModeClick'> & { width: number }
> = {
  parts: ['pdf', 'container', 'fileImageContainer', 'attachmentIconContainer', 'deleteButton', 'noPreview'],
  baseStyle: ({ isEmpty, onViewModeClick, width }) => ({
    container: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    fileImageContainer: {
      display: 'inline-flex',
      position: 'relative',
      overflow: 'hidden',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: `${width}px`,
      height: 'auto',
      maxWidth: '176px',
      maxHeight: '224px',
      minWidth: '50px',
      aspectRatio: '176 / 224',
      border: 'global.25',
      borderColor: isEmpty ? 'global.neutral.300' : 'semantic.border.static',
      borderRadius: 'semantic.input.default',
      cursor: 'pointer',
      shadow: 500,
      transition: 'box-shadow 0.1s ease-in-out',
      _hover: {
        cursor: 'pointer',
        shadow: 600,
      },
      _loading: {
        shadow: 500,
        cursor: 'default',
      },
      _active: {
        shadow: 600,
      },
      '&[data-view-mode="true"]': {
        shadow: !isEmpty ? 500 : 0,
        _hover: {
          cursor: !isEmpty ? 'pointer' : 'default',
          shadow: !isEmpty ? 600 : 0,
        },
      },
      _readOnly: {
        shadow: 0,
        _hover: {
          cursor: 'default',
          shadow: 0,
        },
      },
      _focusVisible: {
        outlineColor: 'semantic.focus.primary',
        outlineWidth: '2px',
        outlineOffset: '2px',
        outlineStyle: 'solid',
      },
    },
    pdf: {
      position: 'absolute',
      width: '180px',
      height: '233px',
      overflow: 'hidden',
    },
    attachmentIconContainer: {
      position: 'absolute',
      zIndex: 'dropdown',
      display: 'flex',
      borderRadius: 'global.100',
      justifyContent: 'center',
      alignItems: 'center',

      '&[data-view-mode="true"]': {
        width: '24px',
        height: '24px',
        backgroundColor: 'semantic.icon.primary',
        opacity: 0.3,
        top: '16px',
        right: '16px',

        _hover: {
          opacity: onViewModeClick && 0.6,
          transition: onViewModeClick && 'opacity 0.1s ease-in-out',
        },
      },

      _readOnly: {
        width: '24px',
        height: '24px',
        backgroundColor: 'semantic.icon.primary',
        opacity: 0.3,
        top: '16px',
        right: '16px',
      },
    },
    deleteButton: {
      marginTop: 'xs-s',
    },
    noPreview: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      opacity: 0.6,
      textStyle: 'body3',
      textAlign: 'center',
      paddingX: 'm',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      wordBreak: 'break-word',
      maxWidth: '100%',
    },
  }),
};
