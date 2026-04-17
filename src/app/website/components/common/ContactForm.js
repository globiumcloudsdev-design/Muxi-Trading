'use client';

import { useState } from 'react';
import Button from '../ui/Button';

const initialState = {
  name: '',
  phone: '',
  businessName: '',
  message: '',
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData(initialState);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
      <h3 className="text-2xl font-semibold text-slate-900 mb-2">Send Business Inquiry</h3>
      <p className="text-sm text-slate-600 mb-6">
        Tell us your requirement and our wholesale team will connect quickly.
      </p>

      {submitted && (
        <div className="mb-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-700">
          Inquiry sent successfully. Our team will contact you soon.
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Name"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
          required
        />
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="Phone"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
          required
        />
        <input
          type="text"
          value={formData.businessName}
          onChange={(e) => onChange('businessName', e.target.value)}
          placeholder="Business Name"
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
          required
        />
        <textarea
          value={formData.message}
          onChange={(e) => onChange('message', e.target.value)}
          placeholder="Message"
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
          required
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <Button type="submit" className="sm:flex-1">Submit Inquiry</Button>
          <a
href="https://wa.me/923352778488?text=Hello%20MUXI%20Trading%2C%20I%20want%20to%20inquire%20about%20bulk%20products."
            target="_blank"
            rel="noreferrer"
            className="sm:flex-1"
          >
            <Button type="button" variant="outline" fullWidth>
              WhatsApp Inquiry
            </Button>
          </a>
        </div>
      </form>
    </div>
  );
}
