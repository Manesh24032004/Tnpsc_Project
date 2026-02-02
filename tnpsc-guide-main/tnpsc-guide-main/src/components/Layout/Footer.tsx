import { Link } from 'react-router-dom';
import { GraduationCap, ExternalLink } from 'lucide-react';

const quickLinks = [
  { name: 'TNPSC', url: 'https://www.tnpsc.gov.in/' },
  { name: 'UPSC', url: 'https://www.upsc.gov.in/' },
  { name: 'RRB', url: 'https://www.rrbchennai.gov.in/' },
  { name: 'SSC', url: 'https://ssc.nic.in/' },
  { name: 'TNUSRB', url: 'https://www.tnusrb.tn.gov.in/' },
];

export const Footer = () => {
  return (
    <footer className="bg-gradient-primary text-primary-foreground border-t-4 border-secondary mt-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Brand Section - Left */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <GraduationCap className="h-6 w-6" />
              <h3 className="text-2xl font-bold">TNPSC Wizard</h3>
            </div>
            <p className="text-primary-foreground/90 mb-2">
              A Smart Digital Learning Platform
            </p>
            <p className="text-sm italic text-primary-foreground/80">
              "கல்வி கற்றால் கவலை தீரும்"
            </p>
            <Link to="/" className="inline-block mt-3 text-secondary hover:underline font-semibold">
              Home
            </Link>
          </div>

          {/* Quick Links - Right Side Aligned */}
          <div className="text-center md:text-right">
            <h4 className="font-bold text-lg mb-3 text-secondary">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-foreground/90 hover:text-secondary transition-colors justify-center md:justify-end"
                  >
                    <span>•</span>
                    {link.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/70">
            © 2025 TNPSC Wizard. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};