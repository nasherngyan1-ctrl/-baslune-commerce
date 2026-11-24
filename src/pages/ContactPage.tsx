import React, { useState } from 'react';
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { t, settings } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (name.trim().length < 2 || !validEmail || message.trim().length < 8) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="border-b border-[#39291F]/10 pb-8 mb-10">
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#25211D]">
          {t.contact.title}
        </h1>
        <p className="text-sm sm:text-base text-[#25211D]/70 mt-2 max-w-2xl">
          {t.contact.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Studio Details */}
        <aside className="lg:col-span-5 bg-[#39291F] text-[#F7F3EB] rounded-2xl p-8 space-y-6">
          <h2 className="font-editorial text-2xl font-semibold">
            {t.contact.infoTitle}
          </h2>

          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C6A77B] mt-1 shrink-0" />
              <div>
                <p className="text-xs text-[#C6A77B]">{t.contact.showroomLabel}</p>
                <p className="mt-0.5 text-[#E8DFD1]">{t.contact.showroomValue}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#C6A77B] mt-1 shrink-0" />
              <div>
                <p className="text-xs text-[#C6A77B]">{t.contact.hoursLabel}</p>
                <p className="mt-0.5 text-[#E8DFD1]">{t.contact.hoursValue}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#C6A77B] mt-1 shrink-0" />
              <div>
                <p className="text-xs text-[#C6A77B]">{t.contact.emailLabel}</p>
                <p className="mt-0.5 text-[#E8DFD1]" dir="ltr">
                  {settings.supportEmail}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#C6A77B] mt-1 shrink-0" />
              <div>
                <p className="text-xs text-[#C6A77B]">{t.contact.phoneLabel}</p>
                <p className="mt-0.5 text-[#E8DFD1] tabular-nums" dir="ltr">
                  {settings.supportPhone}
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Form */}
        <div className="lg:col-span-7 bg-white border border-[#39291F]/10 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-[#25211D] mb-6">
            {t.contact.formTitle}
          </h2>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#25211D] mb-1.5">
                  {t.contact.nameLabel} *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm focus:outline-none focus:border-[#39291F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#25211D] mb-1.5">
                  {t.contact.emailFieldLabel} *
                </label>
                <input
                  type="email"
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm focus:outline-none focus:border-[#39291F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#25211D] mb-1.5">
                {t.contact.subjectLabel}
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm focus:outline-none focus:border-[#39291F]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#25211D] mb-1.5">
                {t.contact.messageLabel} *
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F7F3EB]/40 border border-[#39291F]/20 rounded-md text-sm focus:outline-none focus:border-[#39291F]"
              />
            </div>

            {status === 'error' && (
              <p className="text-xs text-red-700">{t.contact.validationError}</p>
            )}
            {status === 'success' && (
              <p className="text-xs font-medium text-[#39291F] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C6A77B]" />
                {t.contact.successMessage}
              </p>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#39291F] text-[#F7F3EB] text-sm font-medium rounded-md hover:bg-[#25211D] transition-colors cursor-pointer"
            >
              {t.contact.submitCta}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
