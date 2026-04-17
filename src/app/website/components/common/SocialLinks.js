import { Users, Image, MessageCircle } from 'lucide-react';

const socialLinks = [
  { icon: Users, href: 'https://www.facebook.com/globiumclouds/', label: 'Facebook' },
  { icon: Image, href: 'https://www.instagram.com/explore/locations/202412828462806/globium-clouds/', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://wa.me/923352778488', label: 'WhatsApp' },
];

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`flex gap-4 ${className}`}>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={social.label}
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
