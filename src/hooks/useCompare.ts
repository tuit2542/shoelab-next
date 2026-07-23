import { useState } from 'react';
import { Shoe } from '@/types';

export function useCompare(shoes: Shoe[]) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleShoe = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      if (prev.length >= 4) {
        alert("สามารถเลือกเปรียบเทียบได้สูงสุด 4 รุ่นเท่านั้น");
        return prev;
      }
      return [...prev, id];
    });
  };

  const clearCompare = () => setSelectedIds([]);

  const selectedShoes = selectedIds.map(id => shoes.find(s => s.id === id)).filter(Boolean) as Shoe[];

  return {
    selectedIds,
    selectedShoes,
    toggleShoe,
    clearCompare
  };
}
