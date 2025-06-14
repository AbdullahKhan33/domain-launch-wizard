
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EmailDomainSetup from './EmailDomainSetup';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto p-8">
        <div className="mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-xl">LM</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LeadMasters CRM
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Professional email domain setup for your campaigns
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Email Domain Onboarding
          </h2>
          <p className="text-gray-600 mb-6">
            Set up your custom email domain to send professional newsletters and campaigns 
            directly from your brand (e.g., newsletter@yourbrand.com).
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-medium text-blue-900 mb-1">Domain Setup</div>
              <div className="text-blue-700">Configure DNS records</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="font-medium text-purple-900 mb-1">Brand Identity</div>
              <div className="text-purple-700">Logo & styling</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="font-medium text-green-900 mb-1">Test & Launch</div>
              <div className="text-green-700">Verify setup</div>
            </div>
          </div>

          <Link to="/email-domain-setup">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white gap-2">
              Start Email Setup
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-500">
          Part of the LeadMasters onboarding suite • Guided setup with real-time verification
        </p>
      </div>
    </div>
  );
};

export default Index;
