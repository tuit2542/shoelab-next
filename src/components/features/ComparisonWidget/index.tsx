import React, { useState, useEffect } from 'react';
import { Shoe } from '@/types';
import { STYLES } from './styles';
import { MinimizedDock } from './MinimizedDock';
import { ComparisonHeader } from './ComparisonHeader';
import { ComparisonTable } from './ComparisonTable';

interface ComparisonWidgetProps {
  selectedShoes: Shoe[];
  onClear: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export function ComparisonWidget({ selectedShoes, onClear, onClose, isOpen }: Readonly<ComparisonWidgetProps>) {
  const [isMinimized, setIsMinimized] = useState<boolean>(true);
  const [isFullHeight, setIsFullHeight] = useState<boolean>(false);

  useEffect(() => {
    if (selectedShoes.length === 1) {
      setIsMinimized(true);
    }
  }, [selectedShoes.length]);

  if (selectedShoes.length === 0 && !isOpen) return null;

  if (isMinimized && selectedShoes.length > 0) {
    return <MinimizedDock selectedShoes={selectedShoes} onExpand={() => setIsMinimized(false)} onClear={onClear} />;
  }

  const heightClass = isFullHeight ? 'h-[92vh]' : 'h-[60vh] max-h-[750px]';

  return (
    <div className={`${STYLES.containerBase} ${heightClass} ${isOpen || selectedShoes.length > 0 ? STYLES.containerOpen : STYLES.containerClosed}`}>
      <div className={STYLES.wrapper}>
        <ComparisonHeader 
          selectedCount={selectedShoes.length}
          isFullHeight={isFullHeight}
          onClear={onClear}
          onToggleHeight={() => setIsFullHeight(!isFullHeight)}
          onMinimize={() => setIsMinimized(true)}
          onClose={onClose}
        />
        <ComparisonTable selectedShoes={selectedShoes} />
      </div>
    </div>
  );
}
