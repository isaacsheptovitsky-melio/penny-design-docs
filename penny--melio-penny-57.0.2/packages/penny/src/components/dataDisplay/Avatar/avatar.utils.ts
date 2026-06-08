import type { AvatarProps } from './Avatar.types';

/*
 RULES:
 * Remove special characters !@#$%^&*().,-
 * If the size is extra-small - take the first letter of it.
 * If there's 1 word - take the first letter of it.
 * If there are 2+ words - take the first letter of the first and second words.
*/
export const getAvatarInitials = (name: AvatarProps['name'], showSingleInitial?: boolean) => {
  const [firstName, lastName] = name.replace(/[!@#$%^&*().,-]/g, '').split(' ');

  const firstNameLetter = firstName?.charAt(0).toUpperCase();

  if (showSingleInitial) {
    return firstNameLetter;
  }

  return firstName && lastName
    ? `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`
    : firstNameLetter;
};
