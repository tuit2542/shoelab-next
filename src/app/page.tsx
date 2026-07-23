'use client';
import React, { useState } from 'react';
import { useShoes } from '@/hooks/useShoes';
import { useCompare } from '@/hooks/useCompare';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { DashboardSection } from '@/components/features/DashboardSection';
import { CatalogSection } from '@/components/features/CatalogSection';
import { BattleSection } from '@/components/features/BattleSection';
import { AlternativesSection } from '@/components/features/AlternativesSection';
import { ComparisonWidget } from '@/components/features/ComparisonWidget';
import { LabReportModal } from '@/components/features/LabReportModal';
import { Shoe } from '@/types';

export default function Home() {
  const shoesData = useShoes();
  const { selectedIds, selectedShoes, toggleShoe, clearCompare } = useCompare(shoesData.shoes);
  const [activeLabShoe, setActiveLabShoe] = useState<Shoe | null>(null);

  // Scatter chart data mapping
  const scatterPoints = shoesData.shoes.map(d => ({ 
    x: d.weight, 
    y: parseFloat(d.stack.split('/')[0]) || 30, 
    label: d.name 
  })).filter(d => d.x > 0 && d.y > 0);

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
        <DashboardSection scatterData={scatterPoints} />
        <CatalogSection 
          shoesData={shoesData} 
          selectedIds={selectedIds} 
          onToggleShoe={toggleShoe} 
          onOpenLabReport={(shoe) => setActiveLabShoe(shoe)}
        />
        <BattleSection shoes={shoesData.shoes} />
        <AlternativesSection />
      </main>
      <Footer />
      <ComparisonWidget 
        selectedShoes={selectedShoes} 
        onClear={clearCompare} 
        onClose={clearCompare} 
        isOpen={selectedShoes.length > 0} 
      />
      <LabReportModal
        shoe={activeLabShoe}
        isOpen={activeLabShoe !== null}
        onClose={() => setActiveLabShoe(null)}
      />
    </>
  );
}

