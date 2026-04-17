import Link from 'next/link';
import Container from '../layout/Container';
import Button from '../ui/Button';

export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <Container className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust MUXI Trading for their business needs.
        </p>
        <Link href="/website/contact">
          <Button variant="secondary" size="lg">
            Contact Us Today
          </Button>
        </Link>
      </Container>
    </section>
  );
}