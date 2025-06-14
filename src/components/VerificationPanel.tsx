
import React from 'react';
import { CheckCircle, Clock, AlertCircle, Mail } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
        <Card className="p-8 shadow-lg border-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Domain Verification</h3>
              <p className="text-gray-600">{data.domain || 'No domain set'}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-3">
                {getStatusIcon('pending')}
                <span className="font-medium">SPF Record</span>
              </div>
              {getStatusBadge('pending')}
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-3">
                {getStatusIcon('pending')}
                <span className="font-medium">DKIM Record</span>
              </div>
              {getStatusBadge('pending')}
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-3">
                {getStatusIcon('pending')}
                <span className="font-medium">DMARC Record</span>
              </div>
              {getStatusBadge('pending')}
            </div>
          </div>

          <Button variant="outline" className="w-full mt-6 h-12 text-lg">
            Refresh Status
          </Button>

          <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-blue-900">Need Help?</span>
            </div>
            <p className="text-blue-800 mb-3">
              Our team can help you configure DNS records if needed.
            </p>
            <Button variant="outline" size="sm" className="text-blue-700 border-blue-300 hover:bg-blue-100">
              Contact Support
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VerificationPanel;
