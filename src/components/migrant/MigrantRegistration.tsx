import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { offlineService } from '../../services/offlineService';
import Layout from '../layout/Layout';
import QRCodeDisplay from '../common/QRCodeDisplay';
import { User, MapPin, Phone, Languages, Building2, ArrowRight } from 'lucide-react';

interface MigrantData {
  name: string;
  age: string;
  sex: 'Male' | 'Female' | 'Other';
  phone: string;
  origin_state: string;
  current_address: string;
  languages: string[];
  employer?: string;
}

const MigrantRegistration: React.FC = () => {
  const [step, setStep] = useState(1);
  const [migrantData, setMigrantData] = useState<MigrantData>({
    name: '',
    age: '',
    sex: 'Male',
    phone: '',
    origin_state: '',
    current_address: '',
    languages: [],
    employer: ''
  });
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string>('');

  const { t, addNotification } = useApp();
  const navigate = useNavigate();

  const states = [
    'Bihar', 'Uttar Pradesh', 'West Bengal', 'Odisha', 'Jharkhand', 'Assam'
  ];

  const languages = [
    'Hindi', 'Bengali', 'Odia', 'Nepali', 'Assamese', 'Malayalam', 'English'
  ];

  const handleInputChange = (field: keyof MigrantData, value: string) => {
    setMigrantData(prev => ({ ...prev, [field]: value }));
  };

  const handleLanguageToggle = (language: string) => {
    setMigrantData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(lang => lang !== language)
        : [...prev.languages, language]
    }));
  };

  const validateStep = (stepNumber: number): boolean => {
    switch (stepNumber) {
      case 1:
        return migrantData.name && migrantData.age && migrantData.sex;
      case 2:
        return migrantData.origin_state && migrantData.current_address;
      case 3:
        return migrantData.phone && migrantData.languages.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      addNotification({
        type: 'warning',
        message: 'Please fill in all required fields'
      });
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const generateQRCode = (): string => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 4);
    return `KL-MH-${timestamp}-${random}`.toUpperCase();
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      const newMigrant = {
        id: Math.random().toString(36).substr(2, 9),
        ...migrantData,
        qr_code: generateQRCode(),
        registration_date: new Date().toISOString(),
        consent_summary: {
          share_with_facility: false,
          share_for_surveillance: false,
          share_for_research: false
        }
      };

      await offlineService.storeMigrant(newMigrant);
      setQrCode(newMigrant.qr_code);
      setStep(5);

      addNotification({
        type: 'success',
        message: t('register.success')
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Registration failed. Please try again.'
      });
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-medium">Personal Information</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('register.name')} *
              </label>
              <input
                type="text"
                value={migrantData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('register.age')} *
                </label>
                <input
                  type="number"
                  value={migrantData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Age"
                  min="18"
                  max="65"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('register.sex')} *
                </label>
                <select
                  value={migrantData.sex}
                  onChange={(e) => handleInputChange('sex', e.target.value as 'Male' | 'Female' | 'Other')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-medium">Location Information</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('register.origin_state')} *
              </label>
              <select
                value={migrantData.origin_state}
                onChange={(e) => handleInputChange('origin_state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select origin state</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('register.current_address')} *
              </label>
              <textarea
                value={migrantData.current_address}
                onChange={(e) => handleInputChange('current_address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Current address in Kerala"
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <Phone className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-medium">Contact Information</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('register.phone')} *
              </label>
              <input
                type="tel"
                value={migrantData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="+91-XXXXXXXXXX"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('register.languages')} *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {languages.map(language => (
                  <label key={language} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={migrantData.languages.includes(language)}
                      onChange={() => handleLanguageToggle(language)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{language}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-6">
              <Building2 className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-medium">Employment Information</h3>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('register.employer')} (Optional)
              </label>
              <input
                type="text"
                value={migrantData.employer}
                onChange={(e) => handleInputChange('employer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Current employer name"
              />
            </div>
            
            {/* Review Section */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Review Information</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Name:</span> {migrantData.name}</div>
                <div><span className="font-medium">Age:</span> {migrantData.age}</div>
                <div><span className="font-medium">Sex:</span> {migrantData.sex}</div>
                <div><span className="font-medium">Origin State:</span> {migrantData.origin_state}</div>
                <div><span className="font-medium">Phone:</span> {migrantData.phone}</div>
                <div><span className="font-medium">Languages:</span> {migrantData.languages.join(', ')}</div>
                {migrantData.employer && (
                  <div><span className="font-medium">Employer:</span> {migrantData.employer}</div>
                )}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Registration Successful!
              </h3>
              <p className="text-gray-600">
                Migrant worker has been registered successfully.
              </p>
            </div>
            
            <QRCodeDisplay value={qrCode} />
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setMigrantData({
                    name: '',
                    age: '',
                    sex: 'Male',
                    phone: '',
                    origin_state: '',
                    current_address: '',
                    languages: [],
                    employer: ''
                  });
                  setQrCode('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Register Another
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {/* Progress Bar */}
          {step < 5 && (
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Step {step} of 4</span>
                <span>{Math.round((step / 4) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className="px-6 py-8">
            {step === 1 && (
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('register.title')}
                </h2>
                <p className="text-gray-600">
                  Fill in the migrant worker's information to create their digital health record
                </p>
              </div>
            )}
            
            {renderStep()}
            
            {/* Navigation Buttons */}
            {step < 5 && (
              <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={step === 1}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('common.previous')}
                </button>
                
                {step < 4 ? (
                  <button
                    onClick={handleNext}
                    disabled={!validateStep(step)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{t('common.next')}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? 'Registering...' : 'Complete Registration'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MigrantRegistration;