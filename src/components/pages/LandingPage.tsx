import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { Heart, Users, Shield, Globe, QrCode, Database } from 'lucide-react';
import LanguageSelector from '../common/LanguageSelector';

const LandingPage: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Kerala Migrant Health System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('auth.login')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Digital Health Records for Migrant Workers
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive, privacy-first health record management system ensuring 
            continuity of care and health surveillance for migrant workers in Kerala.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
            <button className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <QrCode className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Portable Identity</h3>
            <p className="text-gray-600">
              QR code-based unique identity system for seamless access to health records 
              across facilities and states.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Shield className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-gray-600">
              Consent-based data sharing with granular controls, encryption, and 
              audit trails for complete privacy protection.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Users className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multi-Stakeholder</h3>
            <p className="text-gray-600">
              Designed for field workers, clinicians, employers, and public health 
              officials with role-based access controls.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Globe className="h-12 w-12 text-orange-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Offline Capable</h3>
            <p className="text-gray-600">
              Works offline with automatic synchronization when connectivity is 
              restored, ensuring uninterrupted service.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Database className="h-12 w-12 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interoperable</h3>
            <p className="text-gray-600">
              Standards-compliant system with FHIR/HL7 support for integration 
              with existing health information systems.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <Heart className="h-12 w-12 text-pink-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">SDG Aligned</h3>
            <p className="text-gray-600">
              Supports UN Sustainable Development Goals for health equity, 
              reduced inequalities, and inclusive economic participation.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Impact by Numbers</h2>
            <p className="text-blue-100">Making healthcare accessible for all migrant workers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Registered Workers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Healthcare Facilities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">14</div>
              <div className="text-blue-100">Districts Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-blue-100">Languages Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <Heart className="h-6 w-6" />
              <span className="text-lg font-medium">Kerala Migrant Health System</span>
            </div>
            <p className="text-gray-400">
              Built for Smart India Hackathon 2025 - Empowering migrant workers through technology
            </p>
            <div className="mt-4 text-sm text-gray-500">
              © 2025 Kerala State Health Department. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;