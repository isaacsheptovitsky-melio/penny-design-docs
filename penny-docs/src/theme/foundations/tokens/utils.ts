import { flatten } from 'flat';

export const replaceReferenceTokens = <RT extends object, PT extends object>(
  referenceTokens: RT,
  primitiveTokens: PT
): RT => {
  if (!referenceTokens) return referenceTokens;

  const flatPrimitiveTokens: Record<string, string> = flatten(primitiveTokens);

  const replaceReferenceToken = (_: string, value: unknown) => {
    if (typeof value === 'object') {
      return value;
    }

    const primitivePathKey = Object.keys(flatPrimitiveTokens).find(
      (primitiveTokenKey) => value === `{${primitiveTokenKey}}`
    );
    return primitivePathKey ? flatPrimitiveTokens[primitivePathKey] : value;
  };

  return JSON.parse(JSON.stringify(referenceTokens), replaceReferenceToken) as RT;
};
