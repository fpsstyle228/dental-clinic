"use client";

import React from "react";

export type ContactsFormProps = {
  nameLabel: string;
  bookLabel: string;
};

export default function ContactsForm({ nameLabel, bookLabel }: ContactsFormProps) {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // TODO: implement submission
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {/* Name field */}
      <div className="border-b border-gray-300 pb-1">
        <input
          aria-label={nameLabel}
          placeholder={nameLabel}
          className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
        />
      </div>

      {/* Phone field with flag + prefix */}
      <div className="border-b border-gray-300 pb-1 flex items-center gap-2">
        <span className="text-base leading-none select-none">🇺🇦</span>
        <span className="text-sm text-gray-500 flex-shrink-0">+380</span>
        <input
          type="tel"
          aria-label="Phone"
          placeholder="(00) 000-00-00"
          className="w-full bg-transparent text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="flex items-center justify-center gap-2 border border-black px-6 py-3 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        {bookLabel}
      </button>
    </form>
  );
}
