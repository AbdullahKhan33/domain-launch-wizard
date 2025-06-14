
import React from 'react';
import { Check, Copy, Upload, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SetupWizardProps {
  currentStep: number;
  onStepChange: (step: number) => void;
  data: any;
  onDataUpdate: (data: any) => void;
}

const steps = [
  { number: 1, title: 'Domain Name', description: 'Enter your email domain' },
  { number: 2, title: 'DNS Records', description: 'Configure authentication' },
  { number: 3, title: 'Sender Profile', description: 'Set sender details' },
  { number: 4, title: 'Branding', description: 'Customize appearance' },
  { number: 5, title: 'Test Email', description: 'Send a test' },
  { number: 6, title: 'Finish', description: 'You\'re all set!' },
];

const SetupWizard: React.FC<SetupWizardProps> = ({ 
  currentStep, 
  onStepChange, 
  data, 
  onDataUpdate 
}) => {
  const handleNext = () => {
    if (currentStep < 6) {
      onStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="domain">Email Domain</Label>
              <Input
                id="domain"
                placeholder="newsletter.yourdomain.com"
                value={data.domain}
                onChange={(e) => onDataUpdate({ domain: e.target.value })}
                className="mt-1"
              />
              <p className="text-sm text-gray-500 mt-2">
                We'll help you authenticate this domain for email sending.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">DNS Records to Add</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="font-medium">SPF Record</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(data.dnsRecords.spf)}
                      className="gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                  <code className="text-sm bg-white p-2 rounded border block">
                    {data.dnsRecords.spf}
                  </code>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="font-medium">DKIM Record</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(data.dnsRecords.dkim)}
                      className="gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                  <code className="text-sm bg-white p-2 rounded border block">
                    {data.dnsRecords.dkim}
                  </code>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <Label className="font-medium">DMARC Record</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(data.dnsRecords.dmarc)}
                      className="gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                  <code className="text-sm bg-white p-2 rounded border block">
                    {data.dnsRecords.dmarc}
                  </code>
                </div>
              </div>
              <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                Check DNS Configuration
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="senderName">Sender Name</Label>
              <Input
                id="senderName"
                placeholder="Your Company"
                value={data.senderName}
                onChange={(e) => onDataUpdate({ senderName: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="fromEmail">Default 'From' Email</Label>
              <Input
                id="fromEmail"
                placeholder="newsletter@yourdomain.com"
                value={data.fromEmail}
                onChange={(e) => onDataUpdate({ fromEmail: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label>Company Logo</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Drop your logo here or click to upload</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="accentColor">Email Accent Color</Label>
              <div className="flex gap-3 mt-2">
                <input
                  type="color"
                  id="accentColor"
                  value={data.accentColor}
                  onChange={(e) => onDataUpdate({ accentColor: e.target.value })}
                  className="w-12 h-12 rounded-lg border border-gray-300"
                />
                <Input
                  value={data.accentColor}
                  onChange={(e) => onDataUpdate({ accentColor: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="customFooter">Custom Unsubscribe Footer (Optional)</Label>
              <Textarea
                id="customFooter"
                placeholder="You're receiving this because you signed up for our newsletter..."
                value={data.customFooter}
                onChange={(e) => onDataUpdate({ customFooter: e.target.value })}
                className="mt-1"
                rows={3}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="testSubject">Test Email Subject</Label>
              <Input
                id="testSubject"
                placeholder="Welcome to our newsletter!"
                value={data.testSubject}
                onChange={(e) => onDataUpdate({ testSubject: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="testBody">Test Email Body</Label>
              <Textarea
                id="testBody"
                placeholder="Hi there! This is a test email to verify your domain setup..."
                value={data.testBody}
                onChange={(e) => onDataUpdate({ testBody: e.target.value })}
                className="mt-1"
                rows={4}
              />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 gap-2">
              <Send className="w-4 h-4" />
              Send Test Email
            </Button>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                ✅ Test email sent successfully! Check your inbox.
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                You're ready to launch your first campaign!
              </h3>
              <p className="text-gray-600">
                Your domain is verified and configured. Start sending professional emails with your custom domain.
              </p>
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Create First Campaign
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  currentStep >= step.number
                    ? "bg-blue-600 text-white"
                    : currentStep === step.number - 1
                    ? "bg-blue-100 text-blue-600 border-2 border-blue-600"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {currentStep > step.number ? (
                  <Check className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-12 h-0.5 mx-2",
                    currentStep > step.number ? "bg-blue-600" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {steps[currentStep - 1]?.title}
          </h2>
          <p className="text-sm text-gray-600">
            {steps[currentStep - 1]?.description}
          </p>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentStep === 6}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {currentStep === 6 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default SetupWizard;
