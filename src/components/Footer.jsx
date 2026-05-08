import { Globe, Send, Share2 } from "lucide-react";
import { footerLinks } from "../data/moventData";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="px-4 sm:px-8 lg:px-20 py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-[#004d4d] font-['Syne']">
              Movent
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Redefining the event landscape with architectural precision and
              curatorial soul.
            </p>
            <div className="flex items-center gap-4 text-gray-400">
              <button className="hover:text-[#004d4d] transition-colors">
                <Globe size={20} />
              </button>
              <button className="hover:text-[#004d4d] transition-colors">
                <Share2 size={20} />
              </button>
              <button className="hover:text-[#004d4d] transition-colors">
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">
                {title}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-500 text-sm hover:text-[#00c9a0] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400 font-medium">
            © 2026 Movent. The Architectural Curator of Events.
          </p>

          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2 text-gray-500">
              <span>ENG / USD</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              System Status: Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
