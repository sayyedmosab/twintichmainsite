import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { NavLink as NavLinkType } from '../types';
import {
  Menu,
  X,
  User,
  LogOut,
  Building2,
  Search,
  Sparkles,
  Play,
  Eye,
  Home,
  BookOpen,
  PenTool,
  Wand2,
  Cloud,
  Target,
  MessageSquare
} from "lucide-react";

const navLinks: NavLinkType[] = [
  { id: 1, text: 'Home', href: '/', icon: Home },
  { id: 4, text: 'TwinScience', href: '/twinscience', icon: MessageSquare },
  { id: 3, text: 'TwinStudio', href: '/roadmap', icon: Target },
  { id: 5, text: 'TwinFactory', href: '/twinfactory', icon: Wand2 },
  { id: 2, text: 'About', href: '/about', icon: BookOpen },
];

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const isRTL = i18n.language === 'ar';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isJosoorPage = pathname.startsWith('/josoor');
  const isSketchAppPage = pathname.startsWith('/sketchapp');
  const isAuraPage = pathname.startsWith('/aura');
  const isWeatherMapPage = pathname.startsWith('/weathermap');

  let logoSrc = '/images/aittlogo.png';
  let logoAlt = 'AI Twin Tech';

  if (isJosoorPage) {
    logoSrc = '/images/josoorlogo.png';
    logoAlt = 'Josoor';
  } else if (isSketchAppPage) {
    logoSrc = '/images/sketchapplogo.png';
    logoAlt = 'SketchApp';
  } else if (isAuraPage) {
    logoSrc = '/images/auralogonotext.png';
    logoAlt = 'Aura';
  } else if (isWeatherMapPage) {
    logoSrc = '/images/josoorlogo.png';
    logoAlt = 'Weather Map';
  }

  return (
    <header className="shadow-md sticky top-0 z-50 text-white" style={{ backgroundColor: '#00122d', fontFamily: 'Calibri, Arial, sans-serif' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-20">
          <div className="flex items-center justify-start">
            <Link to="/" className="flex items-center gap-4">
              <div className="relative">
                <img src={logoSrc} alt={logoAlt} className="h-12 w-auto" />
                {/* twinScience special title removed - unified header */}
              </div>
              {/* unified header: no TwinScience-only title */}
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <nav className="flex items-center gap-x-8" dir={isRTL ? 'rtl' : 'ltr'}>
              {navLinks.map((link) => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                const IconComponent = link.icon;
                return (
                  <div key={link.id} className="relative group">
                    <Link
                      to={link.href}
                      className={`py-1 px-3 flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'} whitespace-nowrap transition-colors duration-300 ${
                        isActive ? 'text-electric-blue-400 font-semibold' : 'text-gray-300 hover:text-electric-blue-400'
                      }`}
                    >
                      {IconComponent && (
                        <span className="flex-shrink-0 inline-flex items-center justify-center" style={{ order: isRTL ? 2 : 1 }}>
                          <IconComponent size={20} />
                        </span>
                      )}
                      <span className={`${isRTL ? 'text-right' : 'text-left'} inline-block ${isRTL ? 'mr-2' : 'ml-2'}`} style={{ order: isRTL ? 1 : 2 }}>
                        {link.id === 1 ? t('nav.home') : link.id === 2 ? t('nav.about') : link.id === 3 ? t('nav.twinStudio') : link.id === 4 ? t('nav.twinScience') : link.id === 5 ? t('nav.twinFactory') : link.text}
                      </span>
                    </Link>
                    {link.subLinks && (
                      <div className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} pt-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300`}>
                        <div className="bg-gray-700 rounded-md shadow-lg p-2 w-max">
                          {link.subLinks.map((subLink) => {
                            const SubIconComponent = subLink.icon;
                            return (
                              <Link key={subLink.id} to={subLink.href} className={`flex items-center gap-2 px-4 py-2 whitespace-nowrap text-sm ${isRTL ? 'text-right' : 'text-left'} text-gray-200 hover:bg-gray-600 rounded-md transition-colors`}>
                                {SubIconComponent && <SubIconComponent size={12} />}
                                {subLink.text}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <button onClick={toggleLanguage} className="group flex items-center gap-1 p-0 bg-transparent rounded-md transition-transform duration-150" title={i18n.language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'} aria-label={i18n.language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}>
              <img src={i18n.language === 'ar' ? '/images/en.png' : '/images/ar.png'} alt={i18n.language === 'ar' ? 'English' : 'العربية'} className="h-12 w-12 object-contain block rounded transform transition-transform duration-150 group-hover:scale-110" style={{ display: 'block' }} />
            </button>

            <button onClick={user ? handleLogout : () => navigate('/login')} className="flex items-center gap-2 p-0 bg-transparent rounded-md transition-transform duration-150 hover:scale-110" title={user ? t('header.logout') : t('header.login')} aria-label={user ? t('header.logout') : t('header.login')}>
              <img src={user ? '/dist/icons/logged-in-icon.svg' : '/dist/icons/register-icon.svg'} alt={user ? t('header.logout') : t('header.login')} className="h-12 w-12 object-contain block rounded" style={{ display: 'block' }} />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden pb-4" style={{ backgroundColor: '#00122d' }}>
          <nav id="mobile-navigation" className="flex flex-col items-center space-y-4" dir={isRTL ? 'rtl' : 'ltr'}>
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <React.Fragment key={link.id}>
                  <Link to={link.href} onClick={() => !link.subLinks && setIsOpen(false)} className={`flex items-center gap-2 text-gray-300 hover:text-electric-blue-400 transition-colors duration-300 font-medium text-lg whitespace-nowrap ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    {IconComponent && <span style={{ order: isRTL ? 2 : 1 }}><IconComponent size={20} /></span>}
                    {link.id === 1 ? t('nav.home') : link.id === 2 ? t('nav.about') : link.id === 3 ? t('nav.twinStudio') : link.id === 4 ? t('nav.twinScience') : link.id === 5 ? t('nav.twinFactory') : link.text}
                  </Link>
                  {link.subLinks && (
                    <div className="pl-4 flex flex-col items-center space-y-3 pt-1 pb-2">
                      {link.subLinks.map(subLink => {
                        const SubIconComponent = subLink.icon;
                        return (
                          <Link key={subLink.id} to={subLink.href} onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-gray-400 hover:text-electric-blue-500 transition-colors duration-300">
                            {SubIconComponent && <SubIconComponent size={16} />}
                            {subLink.text}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </nav>
          <div className="flex flex-col items-center space-y-4 mt-6">
            <button onClick={toggleLanguage} className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-600 transition-all duration-300">
              <img src={i18n.language === 'ar' ? '/dist/icons/en.png' : '/dist/icons/ar.png'} alt={i18n.language === 'ar' ? 'English' : 'العربية'} className="h-12 w-12 object-contain block rounded transform transition-transform duration-150 hover:scale-110" />
              <span>{i18n.language === 'ar' ? 'English' : 'العربية'}</span>
            </button>
            {user && (
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="flex items-center gap-2 w-3/4 px-4 py-2 bg-electric-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-electric-blue-700 transition-all duration-300">
                <img src="/dist/icons/logged-in-icon.svg" alt={t('header.logout')} className="h-12 w-12 object-contain" />
                <span>{t('header.logout')}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
