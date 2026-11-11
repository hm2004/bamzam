import React from 'react';
import { Mail, Phone, Linkedin, Send, Calendar, Copy, Check, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData.ts';

interface ContactSectionProps {
  onOpenInquiry: () => void;
  onOpenBooking: () => void;
  onCopyText: (text: string, label: string) => void;
  copiedMap: Record<string, boolean>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenInquiry,
  onOpenBooking,
  onCopyText,
  copiedMap,
}) => {
  return (
    <section
      className="bg-[var(--surface)] border-[var(--border-thick)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] mb-8"
      id="contact"
    >
      {/* Dispatch Window Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--surface-alt)] border-b-[var(--border-thick)] font-mono-code text-xs font-bold select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black"></span>
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black"></span>
          <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black"></span>
        </div>
        <span className="text-[var(--text-muted)]">DISPATCH: /CONNECT</span>
      </div>

      <div className="p-4 sm:p-6 md:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Heading, description, and quick call-to-actions */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <span className="neo-badge bg-[var(--neo-yellow)] text-black mb-2">
              REACH OUT
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-black tracking-tight text-[var(--text)] leading-tight">
              Let's Connect & Collaborate!
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            {portfolioData.contactMessage}
          </p>

          <div className="inline-block p-3 bg-[var(--neo-green-light)] text-black border-[var(--border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-xs)] font-mono-code text-xs font-bold -rotate-1">
            <span>⚡ Fast responder via WhatsApp, Phone & Email</span>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="neo-btn px-4 sm:px-5 py-2.5 bg-[var(--neo-pink)] text-black text-xs font-extrabold"
            >
              <Send className="w-4 h-4" />
              <span>SEND INQUIRY (SHEET SYNC)</span>
            </button>

            <button
              type="button"
              onClick={onOpenBooking}
              className="neo-btn px-4 sm:px-5 py-2.5 bg-[var(--neo-yellow)] text-black text-xs font-extrabold"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK CALL (CALENDAR SYNC)</span>
            </button>
          </div>
        </div>

        {/* Right Column: Contact Cards */}
        <div className="lg:col-span-6 space-y-3">
          {portfolioData.contacts.map((contact, idx) => {
            const isCopied = !!copiedMap[contact.label];

            const iconComponent =
              contact.label === 'Email' ? (
                <Mail className="w-4 h-4" />
              ) : contact.label.includes('Phone') ? (
                <Phone className="w-4 h-4" />
              ) : (
                <Linkedin className="w-4 h-4" />
              );

            return (
              <div
                key={idx}
                className="p-4 bg-[var(--surface-alt)] border-[var(--border-thick)] rounded-[var(--radius-md)] shadow-[var(--shadow-sm)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 bg-[var(--neo-yellow)] text-black border-[var(--border)] rounded-[var(--radius-xs)] shadow-[var(--shadow-xs)] flex items-center justify-center flex-shrink-0">
                    {iconComponent}
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[10px] font-mono-code font-bold uppercase text-[var(--text-soft)] block tracking-wider">
                      {contact.label}
                    </span>
                    <a
                      href={contact.href}
                      target={contact.href.startsWith('http') ? '_blank' : undefined}
                      rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-xs sm:text-sm font-bold text-[var(--text)] hover:text-[var(--neo-pink)] truncate block"
                    >
                      {contact.value}
                    </a>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {contact.copyable ? (
                    <button
                      type="button"
                      onClick={() => onCopyText(contact.value, contact.label)}
                      className="w-full sm:w-auto neo-btn px-3 py-1.5 bg-[var(--neo-pink)] text-black text-xs font-bold"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-900" />
                          <span>COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{contact.btnText}</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto neo-btn px-3 py-1.5 bg-[var(--neo-cyan)] text-black text-xs font-bold"
                    >
                      <span>{contact.btnText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
