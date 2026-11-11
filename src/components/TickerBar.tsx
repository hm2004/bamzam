import React from 'react';

export const TickerBar: React.FC = () => {
  const items = [
    '✦ CISCO NETWORKING',
    '✱ LINUX SYSTEMS ADMIN',
    '✦ FRAUD & RISK ANALYST',
    '✱ DOCKER & KUBERNETES',
    '✦ QUALITY ASSURANCE COACH',
    '✱ ICCT COLLEGES BSIT',
    '✦ IOT & HARDWARE AUTOMATION',
    '✱ REAL-TIME LEAD SYNC',
    '✦ AVAILABLE FOR WORK',
    '✱ BAMZAM.LIVE',
  ];

  return (
    <div
      className="w-full overflow-hidden bg-[var(--neo-yellow)] text-black border-b-[var(--border-thick)] py-2 font-mono-code font-bold text-xs sm:text-sm tracking-wider select-none relative z-30"
      aria-label="Status ticker banner"
    >
      <div className="neo-ticker-track flex items-center">
        {items.map((item, i) => (
          <span key={`t1-${i}`} className="inline-flex items-center mx-3 sm:mx-4">
            {item}
          </span>
        ))}
        {items.map((item, i) => (
          <span key={`t2-${i}`} className="inline-flex items-center mx-3 sm:mx-4">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
