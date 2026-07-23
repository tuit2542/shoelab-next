export const parsePrice = (priceStr: string) => {
  if (!priceStr) return Infinity;
  const cleaned = priceStr.replace(/~/g, '').replace(/,/g, '').replace(/x/gi, '0');
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? Infinity : num; 
};

export const parseStack = (stackStr: string) => parseFloat((stackStr || '0').split('/')[0]) || 0;
export const parseWeight = (weight: number | string) => typeof weight === 'number' ? weight : parseFloat(weight as string) || 0;
