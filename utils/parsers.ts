import sanitizer from 'sanitize-html';
import qs from 'qs';

// This helper mostly uses for pagination serach params: skip, take etc
export const paramParser = (query?: string | string[] | number | null) => {
  if (Array.isArray(query)) {
    throw new Error('We do not use Array of string in query');
  }

  if (typeof query === 'number') {
    return query;
  }

  if (typeof query === 'string' && query.length > 0) {
    const parsed = parseInt(query, 10);

    if (Number.isNaN(parsed)) {
      throw new Error('Query contains invalid characters');
    } else {
      return parsed;
    }
  }

  return undefined;
};

// From 'foo[bar]=baz' to foo: { bar: 'baz' }
export const queryParser = (
  input?: string | string[] | number | null
): Record<string, unknown> => {
  // Most of time we do not use array of strings
  if (Array.isArray(input) || typeof input === 'number') {
    throw new Error('We dont do that here');
  }

  if (input) {
    return qs.parse(input);
  }

  return {};
};

// From { a: { b: 'c' } } to a[b]=c
export const queryStringify = (input?: unknown) => {
  if (typeof input === 'object') {
    return qs.stringify(input, { encode: false });
  }

  if (typeof input === 'string') {
    return input;
  }

  return '';
};

export const exclude = <T extends Record<string, unknown>, K extends keyof T>(
  data: T,
  keys: K | K[]
): Omit<T, K> => {
  const result = { ...data };

  if (Array.isArray(keys)) {
    keys.forEach((key) => delete result[key]);
    return result;
  }

  delete result[keys];
  return result;
};

export const htmlSanitizer = (textWithHTML?: string | null): string => {
  if (!textWithHTML) return '';

  return sanitizer(textWithHTML, {
    allowedTags: [],
  });
};

export const inputSanitizer = (input?: string | null): string => {
  if (!input) return '';

  return sanitizer(input, {
    allowedTags: [
      'p',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'em',
      'span',
      'strong',
    ],
  });
};
