"use client";

import { useState } from 'react';

export interface TimelineMonth {
  month: string;
  events: string[];
}

export interface TimelineYear {
  year: string;
  months: TimelineMonth[];
}

interface TimelineProps {
  title?: string;
  data: TimelineYear[];
  defaultExpanded?: boolean;
}

export default function Timeline({ 
  title = "주요 연혁", 
  data, 
  defaultExpanded = false 
}: TimelineProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="mx-auto max-w-7xl py-4 md:py-8 px-4 md:px-0">
      {/* Header with toggle button */}
      <div className="mb-8 md:mb-16">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between text-left group mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-brand">{title}</h2>
          <svg
            className={`w-6 h-6 text-gray-500 ml-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Timeline content */}
      {isExpanded && (
        <div className="animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-8">
            {data.map((yearData) => (
              <div key={yearData.year} className="relative">
                {/* Year header */}
                <div className="flex items-center mb-6">
                  <h3 className="text-lg md:text-2xl font-semibold text-brand">{yearData.year}</h3>
                  <div className="ml-4 flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Events table for this year */}
                <div className="ml-8">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8">
                    
                    {/* Data rows */}
                    {yearData.months.map((monthData, monthIndex) => (
                      <div key={monthIndex} className="contents">
                        {/* Month column */}
                        <div className="flex md:block items-start">
                          <span className="text-sm md:text-lg font-medium text-gray-600 bg-gray-100 md:bg-transparent px-2 py-1 md:p-0 rounded md:rounded-none">
                            {monthData.month || '-'}
                          </span>
                        </div>
                        
                        {/* Events column */}
                        <div className="col-span-5 space-y-2 mb-4 md:mb-2">
                          {monthData.events.map((event, eventIndex) => (
                            <div key={eventIndex} className="text-gray-900 leading-relaxed text-md md:text-lg">
                              {event.split('\n').map((line, lineIndex) => (
                                <div key={lineIndex} className={lineIndex > 0 ? 'mt-1 text-gray-600' : ''}>
                                  {line}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
