import isEmpty from "lodash/isEmpty";

const DELAY_MS = 100;

export const prefetchTranslations = (
  resourceKeys?: string[]
): Promise<void> => {
  const keysToFetch = Array.isArray(resourceKeys) ? resourceKeys : [];

  if (isEmpty(keysToFetch)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, DELAY_MS);
  });
};
