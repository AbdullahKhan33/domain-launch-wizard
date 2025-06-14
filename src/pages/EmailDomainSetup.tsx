
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
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
        <div className="flex-1 flex">
          {/* Setup Wizard - Full width */}
          <div className="flex-1">
            <Card className="h-full rounded-none border-0 shadow-none">
              <SetupWizard 
                currentStep={currentStep}
                onStepChange={handleStepChange}
                data={setupData}
                onDataUpdate={handleDataUpdate}
              />
            </Card>
          </div>

          {/* Verification Panel - Right side */}
          {currentStep === 2 && (
            <div className="w-96 border-l border-gray-200 bg-white p-6">
              <VerificationPanel 
                data={setupData}
                currentStep={currentStep}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailDomainSetup;
