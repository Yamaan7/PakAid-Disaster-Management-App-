import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateProgress, formatCurrency } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";

interface DonationProgressProps {
  current: number;
  target: number;
  onDonate?: (amount: number) => void;
}

const DonationProgress = ({ current, target, onDonate }: DonationProgressProps) => {
  const { isAuthenticated } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showCustomField, setShowCustomField] = useState(false);
  
  const progress = calculateProgress(current, target);
  const isDonationComplete = progress >= 100;
  
  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setShowCustomField(false);
  };
  
  const handleCustomSelect = () => {
    setSelectedAmount(null);
    setShowCustomField(true);
  };
  
  const handleDonate = () => {
    if (!isAuthenticated) return;
    
    const amount = selectedAmount || parseInt(customAmount, 10);
    if (amount && amount > 0 && onDonate) {
      onDonate(amount);
      setSelectedAmount(null);
      setCustomAmount("");
    }
  };
  
  return (
    <div className="bg-neutral-light p-6 rounded-lg mb-8">
      <h3 className="text-xl font-bold font-heading text-neutral-dark mb-4">Support Relief Efforts</h3>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Donation Progress</span>
          <span className="font-semibold">
            {formatCurrency(current)} of {formatCurrency(target)}
          </span>
        </div>
        <Progress 
          value={progress} 
          className="h-4" 
          indicatorColor={progress >= 100 ? "bg-success" : undefined}
        />
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {[1000, 5000, 10000].map((amount) => (
          <Button
            key={amount}
            type="button"
            variant={selectedAmount === amount ? "secondary" : "outline"}
            onClick={() => handleAmountSelect(amount)}
            className={`${
              selectedAmount === amount 
                ? "bg-secondary text-white" 
                : "bg-white border-2 border-secondary text-secondary"
            }`}
          >
            ₨{amount.toLocaleString()}
          </Button>
        ))}
        <Button
          type="button"
          variant={showCustomField ? "secondary" : "outline"}
          onClick={handleCustomSelect}
          className={`${
            showCustomField 
              ? "bg-secondary text-white" 
              : "bg-white border-2 border-secondary text-secondary"
          }`}
        >
          Custom Amount
        </Button>
      </div>
      
      {showCustomField && (
        <div className="mb-6">
          <Label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Enter custom amount (₨)
          </Label>
          <Input 
            id="customAmount" 
            type="number" 
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter amount"
            min="100"
            className="w-full"
          />
        </div>
      )}
      
      <Button
        onClick={handleDonate}
        disabled={(!selectedAmount && !customAmount) || !isAuthenticated || isDonationComplete}
        className="w-full"
        variant={isDonationComplete ? "outline" : "destructive"}
      >
        {isDonationComplete ? (
          "Donation Target Reached"
        ) : isAuthenticated ? (
          "Donate Now"
        ) : (
          <>
            <Lock className="mr-2" size={16} />
            Login to Donate
          </>
        )}
      </Button>
      
      <div className="mt-4 text-sm text-center text-gray-600 flex justify-center items-center">
        <ShieldCheck className="mr-1" size={14} /> 
        All donations are secure and encrypted
      </div>
    </div>
  );
};

export default DonationProgress;
