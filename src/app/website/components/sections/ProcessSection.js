import { PackageCheck, ReceiptText, Truck, Smile } from 'lucide-react';
import Container from '../layout/Container';

const steps = [
  {
    title: 'Choose Category',
    description: 'Find products by category and shortlist the items that match your needs.',
    icon: PackageCheck,
  },
  {
    title: 'Confirm Order',
    description: 'Get transparent pricing and finalize quantities with our support team.',
    icon: ReceiptText,
  },
  {
    title: 'Fast Dispatch',
    description: 'We process and dispatch your order quickly with quality checks in place.',
    icon: Truck,
  },
  {
    title: 'After-Sales Support',
    description: 'Our team stays available to help with replacements, feedback, and queries.',
    icon: Smile,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 to-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How We Work</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A smooth purchase flow focused on speed, quality, and support
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative bg-white rounded-2xl shadow-md p-6 border border-blue-100">
                <span className="absolute -top-3 -left-3 bg-blue-600 text-white text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                  {index + 1}
                </span>
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 mt-2">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
