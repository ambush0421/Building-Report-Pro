'use client';

import React from 'react';
import { Building2 } from 'lucide-react';

interface DashboardShellProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  headerAction?: React.ReactNode;
  title: string;
  subTitle?: string;
  onLogoClick?: () => void;
  stepIndicator?: React.ReactNode;
}

export function DashboardShell({ children, sidebar, headerAction, title, subTitle, onLogoClick, stepIndicator }: DashboardShellProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Logo Bar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 print:hidden">
        <div className="px-4 py-2.5 flex items-center justify-between">
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Building2 className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-base font-bold text-gray-900 leading-tight">
                BuildingReportPro
              </h1>
              <p className="text-[10px] text-gray-400 -mt-0.5">매입 · 임차 견적 자동화</p>
            </div>
          </button>
          <div className="flex gap-2">{headerAction}</div>
        </div>
      </nav>

      {/* Step Indicator */}
      {stepIndicator}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Area */}
        <aside className="hidden w-64 border-r border-gray-200 bg-white md:block print:hidden">
          {sidebar}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Sub Header */}
          <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              {subTitle && <p className="text-sm text-gray-500">{subTitle}</p>}
            </div>
          </header>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
