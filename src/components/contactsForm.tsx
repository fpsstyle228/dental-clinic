"use client";

import React from "react";

export type ContactsFormProps = {
  nameLabel: string;
  emailLabel: string;
  messageLabel: string;
  sendLabel: string;
};

export default function ContactsForm({
  nameLabel,
  emailLabel,
  messageLabel,
  sendLabel,
}: ContactsFormProps) {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // TODO: implement submission (e.g., send to API route). For now, just prevent reload.
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="grid gap-3">
        <input
          aria-label={nameLabel}
          placeholder={nameLabel}
          className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="email"
          aria-label={emailLabel}
          placeholder={emailLabel}
          className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <textarea
          aria-label={messageLabel}
          placeholder={messageLabel}
          rows={5}
          className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          className="inline-block bg-brand text-white rounded-md px-4 py-2 hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 shadow-sm transition"
          type="submit"
        >
          {sendLabel}
        </button>
      </div>
    </form>
  );
}
