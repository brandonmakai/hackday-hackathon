const ABBREVIATION_MAP: { [key: string]: string } = {
  'ux': 'UX',
  'ui': 'UI',
  'api': 'API',
  'id': 'ID',
  'url': 'URL',
  'sku': 'SKU',
  'seo': 'SEO',
};

const capitalize = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export const convertSnakeCase = (snakeCaseWord: string): string => {
  /*
    Early return is needed to prevent adding unneccessary 
    space after words without underscores
  */
  if (!snakeCaseWord.includes('_')) {
    return capitalize(snakeCaseWord)
  }

  const initialPascalCase = snakeCaseWord
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // This logic is needed to handle abbreviaion cases (e.g., 'Ux' -> "UX")
  let finalResult = initialPascalCase;
  const wordParts = finalResult.match(/[A-Z][a-z]+/g) || [];

  wordParts.forEach(part => {
    const lowercasePart = part.toLowerCase();
    
    if (ABBREVIATION_MAP[lowercasePart]) {
      finalResult = finalResult.replace(part, ABBREVIATION_MAP[lowercasePart]);
    }
  });

  return finalResult;
};
