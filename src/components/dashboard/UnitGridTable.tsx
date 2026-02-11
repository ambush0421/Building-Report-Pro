'use client';

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDown, Check, Layers, Search, CheckSquare, Square } from "lucide-react";

interface UnitGridTableProps {
  units: any[];
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
}

function parseFloor(unit: any): { display: string; sortKey: number; isBasement: boolean; isRooftop: boolean } {
  const flrNo = Number(unit.flrNo) || 0;
  const flrGbCd = unit.flrGbCd;
  const isBasement = flrGbCd === "10";
  const isRooftop = flrGbCd === "30";
  const isPiloti = flrGbCd === "40";

  if (isBasement) {
    const basementLevel = flrNo > 0 ? flrNo : 1;
    return { display: `B${basementLevel}`, sortKey: -basementLevel, isBasement: true, isRooftop: false };
  } else if (isRooftop) {
    return { display: `R${flrNo > 0 ? flrNo : ''}`, sortKey: 1000 + flrNo, isBasement: false, isRooftop: true };
  } else if (isPiloti) {
    return { display: `P${flrNo > 0 ? flrNo : ''}`, sortKey: 0, isBasement: false, isRooftop: false };
  } else {
    return { display: flrNo > 0 ? `${flrNo}F` : '-', sortKey: flrNo, isBasement: false, isRooftop: false };
  }
}

export function UnitGridTable({ units, selectedIds, onSelectionChange }: UnitGridTableProps) {
  const [searchFilter, setSearchFilter] = useState('');
  const [floorFilter, setFloorFilter] = useState<string>('all');
  const [isFloorDropdownOpen, setIsFloorDropdownOpen] = useState(false);

  const uniqueUnits = useMemo(() => {
    const privateUnits = units.filter(u => u.exposPubuseGbCd === "1" || u.exposPubuseGbCdNm === "전유");
    const uniqueUnitsMap = new Map<string, any>();
    privateUnits.forEach((u, idx) => {
      const key = u._uid || `fallback-${idx}`;
      if (!uniqueUnitsMap.has(key)) uniqueUnitsMap.set(key, { ...u, _uid: key });
    });
    return Array.from(uniqueUnitsMap.values());
  }, [units]);

  const floorList = useMemo(() => {
    const floors = new Map<string, { display: string; sortKey: number; count: number }>();
    uniqueUnits.forEach(u => {
      const floorInfo = parseFloor(u);
      const key = floorInfo.display;
      if (key !== '-') {
        if (floors.has(key)) floors.get(key)!.count++;
        else floors.set(key, { display: key, sortKey: floorInfo.sortKey, count: 1 });
      }
    });
    return Array.from(floors.values()).sort((a, b) => a.sortKey - b.sortKey);
  }, [uniqueUnits]);

  const sortedUnits = useMemo(() => {
    let filtered = uniqueUnits;
    if (floorFilter !== 'all') filtered = filtered.filter(u => parseFloor(u).display === floorFilter);
    if (searchFilter) {
      filtered = filtered.filter(u => {
        const floorInfo = parseFloor(u);
        const hoStr = String(u.hoNm || '');
        return `${floorInfo.display} ${hoStr}`.toLowerCase().includes(searchFilter.toLowerCase());
      });
    }
    return filtered.sort((a, b) => {
      const floorA = parseFloor(a);
      const floorB = parseFloor(b);
      if (floorA.sortKey !== floorB.sortKey) return floorA.sortKey - floorB.sortKey;
      const parseHoNum = (ho: string | undefined) => {
        if (!ho) return 0;
        const match = ho.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
      };
      return parseHoNum(a.hoNm) - parseHoNum(b.hoNm);
    });
  }, [uniqueUnits, floorFilter, searchFilter]);

  const toggleUnit = (id: string) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) newSelection.delete(id);
    else {
      if (newSelection.size >= 100) return;
      newSelection.add(id);
    }
    onSelectionChange(newSelection);
  };

  const selectAllFiltered = () => {
    const filteredIds = sortedUnits.map(u => u._uid);
    const allSelected = filteredIds.every(id => selectedIds.has(id));
    const newSelection = new Set(selectedIds);
    filteredIds.forEach(id => {
      if (allSelected) newSelection.delete(id);
      else if (newSelection.size < 100) newSelection.add(id);
    });
    onSelectionChange(newSelection);
  };

  const selectedInView = sortedUnits.filter(u => selectedIds.has(u._uid)).length;
  const allSelected = sortedUnits.length > 0 && sortedUnits.every(u => selectedIds.has(u._uid));

  return (
    <Card className="h-full flex flex-col border-4 border-black shadow-none rounded-none overflow-hidden bg-white font-sans">
      <CardHeader className="bg-white border-b-4 border-black p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-3">
              <Layers className="w-6 h-6" />
              Unit Inventory
            </CardTitle>
            <div className="flex items-center gap-2">
              {selectedInView > 0 && (
                <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                  {selectedInView} Units Selected
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setIsFloorDropdownOpen(!isFloorDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-black bg-white border-2 border-black hover:bg-black hover:text-white transition-all uppercase tracking-tight"
            >
              Floor: {floorFilter === 'all' ? 'All' : floorFilter}
              <ChevronDown className={`w-3 h-3 transition-transform ${isFloorDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFloorDropdownOpen && (
              <div className="absolute top-[180px] left-8 mt-1 w-48 bg-white border-4 border-black z-50 shadow-2xl">
                <button onClick={() => { setFloorFilter('all'); setIsFloorDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-xs font-black hover:bg-gray-100 border-b-2 border-black uppercase">All Floors</button>
                <div className="max-h-60 overflow-y-auto">
                  {floorList.map(f => (
                    <button key={f.display} onClick={() => { setFloorFilter(f.display); setIsFloorDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-black hover:text-white border-b border-gray-100 uppercase">
                      {f.display} <span className="text-[10px] opacity-50 ml-2">({f.count})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="relative flex-1 min-w-[140px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
              <input
                type="text"
                placeholder="SEARCH UNIT NO..."
                className="w-full text-xs pl-10 pr-3 py-2 border-2 border-black focus:bg-black focus:text-white outline-none transition-all font-bold placeholder:text-gray-300"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
            </div>

            <button
              onClick={selectAllFiltered}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-black border-2 border-black transition-all uppercase ${allSelected ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'}`}
            >
              {allSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              {allSelected ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto p-0">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white border-b-2 border-black z-10">
            <tr className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              <th className="px-6 py-4 w-16 text-center">SEL</th>
              <th className="px-4 py-4 w-20">FLR</th>
              <th className="px-4 py-4">UNIT NO</th>
              <th className="px-4 py-4">NET AREA (평)</th>
              <th className="px-4 py-4">PURPOSE</th>
            </tr>
          </thead>
          <tbody className="divide-y border-b border-black">
            {sortedUnits.map((unit, index) => {
              const floorInfo = parseFloor(unit);
              const isSelected = selectedIds.has(unit._uid);
              return (
                <tr
                  key={unit._uid}
                  className={`group cursor-pointer transition-all ${isSelected ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
                  onClick={() => toggleUnit(unit._uid)}
                >
                  <td className="px-6 py-4 text-center">
                    <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${isSelected ? 'border-white' : 'border-black group-hover:bg-black group-hover:border-black'}`}>
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-xs font-black px-2 py-0.5 border ${isSelected ? 'border-white text-white' : 'border-black text-black'}`}>
                      {floorInfo.display}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-black text-base italic">{unit.hoNm}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black">{(Number(unit.area) * 0.3025).toFixed(1)}</span>
                      <span className="text-[10px] font-bold opacity-50 uppercase">Pyung</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-1 border ${isSelected ? 'border-white bg-white text-black' : 'border-black'}`}>
                      {unit.mainPurpsCdNm || 'GENERAL'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
