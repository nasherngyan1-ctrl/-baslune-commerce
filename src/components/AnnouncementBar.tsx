import React from 'react';
import { X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { t, settings, announcementDismissed, dismissAnnouncement, navigate } = useStore();

  if (!settings.showAnnouncement || announcementDismissed) {
    return null;
  }

  return (
    <div className="bg-[#39291F] text-[#F7F3EB] text-xs h-9 px-4 flex items-center justify-between border-b border-[#C6A77B]/20">
      <div className="w-6 hidden sm:block" aria-hidden="true" />
      <div className="flex items-center justify-center gap-3 truncate">
        <span className="truncate">{t.announcement.text}</span>
        <button
          type="button"
          onClick={() => navigate('/shop')}
          className="underline underline-offset-4 text-[#C6A77B] hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {t.announcement.cta}
        </button>
      </div>
      <button
        type="button"
        onClick={dismissAnnouncement}
        aria-label={t.nav.close}
        className="p-1 text-[#E8DFD1]/70 hover:text-white transition-colors shrink-0 cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
