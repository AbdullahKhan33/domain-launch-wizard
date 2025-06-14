
import React from 'react';
import { CheckCircle, Clock, AlertCircle, Mail, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface VerificationPanelProps {
  data: any;
  currentStep: number;
}

const VerificationPanel: React.FC<VerificationPanelProps> = ({ data, currentStep }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Domain Verification Status - Only show in step 2 */}
      {currentStep === 2 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Domain Verification</h3>
              <p className="text-sm text-gray-600">{data.domain || 'No domain set'}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon('pending')}
                <span className="text-sm font-medium">SPF Record</span>
              </div>
              {getStatusBadge('pending')}
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon('pending')}
                <span className="text-sm font-medium">DKIM Record</span>
              </div>
              {getStatusBadge('pending')}
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {getStatusIcon('pending')}
                <span className="text-sm font-medium">DMARC Record</span>
              </div>
              {getStatusBadge('pending')}
            </div>
          </div>

          <Button variant="outline" className="w-full mt-4">
            Refresh Status
          </Button>
        </Card>
      )}

      {/* Email Preview - Show from step 3 onwards */}
      {currentStep >= 3 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email Preview</h3>
              <p className="text-sm text-gray-600">How your emails will appear</p>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            {/* Email Header */}
            <div className="bg-gray-50 p-4 border-b">
              <div className="flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">
                    {data.senderName || 'Your Company'} &lt;{data.fromEmail || 'newsletter@yourdomain.com'}&gt;
                  </div>
                  <div className="text-gray-600 mt-1">
                    To: subscriber@example.com
                  </div>
                </div>
                <div className="text-gray-500">
                  Just now
                </div>
              </div>
            </div>

            {/* Email Content */}
            <div className="p-4 bg-white">
              <div 
                className="w-full h-2 rounded-full mb-4"
                style={{ backgroundColor: data.accentColor }}
              ></div>
              
              <h2 className="text-lg font-semibold mb-3">
                {data.testSubject || 'Your Email Subject Here'}
              </h2>
              
              <div className="text-gray-700 leading-relaxed mb-4">
                {data.testBody || 'Your email content will appear here. This is a preview of how your emails will look to recipients.'}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  {data.customFooter || 'You\'re receiving this email because you subscribed to our newsletter. Unsubscribe anytime.'}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Setup Progress - Always show with accurate tracking */}
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Setup Progress</h3>
        <div className="space-y-3">
          <div className={cn(
            "flex items-center gap-3 p-2 rounded-lg",
            currentStep > 1 ? "bg-green-50" : currentStep === 1 ? "bg-blue-50" : "bg-gray-50"
          )}>
            {currentStep > 1 ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : currentStep === 1 ? (
              <Clock className="w-5 h-5 text-blue-500" />
            ) : (
              <Clock className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-sm">Domain configured</span>
          </div>

          <div className={cn(
            "flex items-center gap-3 p-2 rounded-lg",
            currentStep > 2 ? "bg-green-50" : currentStep === 2 ? "bg-blue-50" : "bg-gray-50"
          )}>
            {currentStep > 2 ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : currentStep === 2 ? (
              <Clock className="w-5 h-5 text-blue-500" />
            ) : (
              <Clock className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-sm">DNS records added</span>
          </div>

          <div className={cn(
            "flex items-center gap-3 p-2 rounded-lg",
            currentStep > 3 ? "bg-green-50" : currentStep === 3 ? "bg-blue-50" : "bg-gray-50"
          )}>
            {currentStep > 3 ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : currentStep === 3 ? (
              <Clock className="w-5 h-5 text-blue-500" />
            ) : (
              <Clock className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-sm">Sender profile set</span>
          </div>

          <div className={cn(
            "flex items-center gap-3 p-2 rounded-lg",
            currentStep > 4 ? "bg-green-50" : currentStep === 4 ? "bg-blue-50" : "bg-gray-50"
          )}>
            {currentStep > 4 ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : currentStep === 4 ? (
              <Clock className="w-5 h-5 text-blue-500" />
            ) : (
              <Clock className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-sm">Branding customized</span>
          </div>

          <div className={cn(
            "flex items-center gap-3 p-2 rounded-lg",
            currentStep > 5 ? "bg-green-50" : currentStep === 5 ? "bg-blue-50" : "bg-gray-50"
          )}>
            {currentStep > 5 ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : currentStep === 5 ? (
              <Clock className="w-5 h-5 text-blue-500" />
            ) : (
              <Clock className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-sm">Test email sent</span>
          </div>

          <div className={cn(
            "flex items-center gap-3 p-2 rounded-lg",
            currentStep === 6 ? "bg-green-50" : "bg-gray-50"
          )}>
            {currentStep === 6 ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Clock className="w-5 h-5 text-gray-400" />
            )}
            <span className="text-sm">Setup complete</span>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-900">Need Help?</span>
          </div>
          <p className="text-sm text-blue-800 mb-2">
            Our team can help you configure DNS records if needed.
          </p>
          <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100">
            Contact Support
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default VerificationPanel;
