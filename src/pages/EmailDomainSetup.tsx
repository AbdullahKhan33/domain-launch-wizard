
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Sidebar from '@/components/Sidebar';
import SetupWizard from '@/components/SetupWizard';
import VerificationPanel from '@/components/VerificationPanel';

const EmailDomainSetup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [setupData, setSetupData] = useState({
    domain: '',
    senderName: '',
    fromEmail: '',
    logo: null,
    accentColor: '#6366f1',
    customFooter: '',
    testSubject: '',
    testBody: '',
    dnsRecords: {
      spf: 'v=spf1 include:leadmasters.com ~all',
      dkim: 'v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC...',
      dmarc: 'v=DMARC1; p=quarantine; rua=mailto:dmarc@leadmasters.com'
    },
    verificationStatus: 'pending'
  });

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleDataUpdate = (data: any) => {
    setSetupData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-8 py-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Settings
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Email Domain Setup</h1>
              <p className="text-gray-600 mt-1">Connect your custom domain to send professional emails</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Setup Wizard */}
              <div className="space-y-6">
                <Card className="p-6">
                  <SetupWizard 
                    currentStep={currentStep}
                    onStepChange={handleStepChange}
                    data={setupData}
                    onDataUpdate={handleDataUpdate}
                  />
                </Card>
              </div>

              {/* Verification Panel */}
              <div className="space-y-6">
                <VerificationPanel 
                  data={setupData}
                  currentStep={currentStep}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDomainSetup;
