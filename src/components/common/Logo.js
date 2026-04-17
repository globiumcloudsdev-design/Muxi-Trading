import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ size = 'md', showText = true }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const imageSizes = {
    sm: '32px',
    md: '40px',
    lg: '64px',
    xl: '80px',
  };

  return (
    <Link href="/" className="flex items-center gap-3">
      <div className={`relative ${sizes[size]}`}>
        <Image
          src="/Muxi Trading Logo.png"  // Aapke logo ka naam yahan likhein
          alt="MUXI Trading Logo"
          fill
          sizes={imageSizes[size] ?? '40px'}
          className="object-contain"
          priority
        />
      </div>
      {showText && (
        <div>
          <h1 className="text-xl font-bold text-gray-800">MUXI Trading</h1>
          <p className="text-xs text-gray-500">Company</p>
        </div>
      )}
    </Link>
  );
}
