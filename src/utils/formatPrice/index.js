const formatPrice = str => {
  const s = str.length;
  const chars = str.split('');
  const strWithSpaces = chars.reduceRight((acc, char, i) => {
    const spaceOrNothing = (s - i) % 3 === 0 ? ' ' : '';
    return spaceOrNothing + char + acc;
  }, '');

  return strWithSpaces[0] === ' ' ? strWithSpaces.slice(1) : strWithSpaces;
};

export default formatPrice;