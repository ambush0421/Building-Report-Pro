'use client';

import { Building, Search } from 'lucide-react';

interface LandingHeroProps {
    addressInput: string;
    setAddressInput: (value: string) => void;
    onSearch: (query?: string) => void;
    showPostcode: boolean;
    postcodeRef: React.RefObject<HTMLDivElement | null>;
    onClosePostcode: () => void;
}

export function LandingHero({
    addressInput,
    setAddressInput,
    onSearch,
    showPostcode,
    postcodeRef,
    onClosePostcode,
}: LandingHeroProps) {
    return (
        <section className="relative min-h-[72vh] flex items-center justify-center overflow-hidden bg-[#F5F7FA]">
            <div className="pointer-events-none absolute inset-0 opacity-60">
                <div className="absolute -left-24 -top-16 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
                <div className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-cyan-100 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-56 w-96 -translate-x-1/2 rounded-full bg-indigo-100 blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-4xl px-4 py-16 text-center md:py-24">
                <div className="mb-6 flex justify-center">
                    <div className="rounded-2xl bg-blue-600 p-3 text-white shadow-lg">
                        <Building className="h-8 w-8" />
                    </div>
                </div>

                <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                    BuildingReportPro
                </h2>
                <p className="mb-10 text-lg text-slate-500">
                    매입 · 임차 견적 자동화 솔루션
                </p>

                <div className="relative mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center rounded-full border border-slate-200 bg-white p-2 shadow-2xl">
                        <div className="pl-4 pr-2 text-slate-400">
                            <Search className="h-5 w-5" />
                        </div>
                        <input
                            type="text"
                            value={addressInput}
                            onChange={(e) => setAddressInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onSearch(addressInput.trim());
                                }
                            }}
                            placeholder="주소나 건물명을 입력하세요 (예: 가산디지털1로 1)"
                            className="flex-1 bg-transparent p-3 text-base text-slate-800 outline-none placeholder:text-slate-400"
                            autoFocus
                        />
                        <button
                            onClick={() => onSearch(addressInput.trim())}
                            className="rounded-full bg-blue-600 px-8 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
                        >
                            검색
                        </button>
                    </div>

                    {showPostcode && (
                        <div className="mt-3 h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="flex items-center justify-between border-b bg-slate-50 px-3 py-2">
                                <span className="text-xs font-medium text-slate-600">주소를 선택해주세요</span>
                                <button
                                    onClick={onClosePostcode}
                                    className="rounded-md px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-200"
                                >
                                    닫기
                                </button>
                            </div>
                            <div ref={postcodeRef} className="w-full" style={{ height: 'calc(100% - 36px)' }} />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
