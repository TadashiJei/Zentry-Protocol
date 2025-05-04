"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IdentitySource {
  id: string;
  name: string;
  icon: React.ReactNode;
  verified: boolean;
}

export function IdentityVerificationCard() {
  // Sample identity sources - in a real app, these would come from an API
  const [identitySources, setIdentitySources] = useState<IdentitySource[]>([
    {
      id: "github",
      name: "GitHub",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
      verified: true,
    },
    {
      id: "twitter",
      name: "Twitter/X",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
      verified: true,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      verified: false,
    },
    {
      id: "stackoverflow",
      name: "StackOverflow",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      ),
      verified: false,
    },
  ]);

  const [selectedSource, setSelectedSource] = useState<IdentitySource | null>(null);
  const [verificationInput, setVerificationInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  // Handle verification process
  const handleVerify = () => {
    if (!selectedSource || !verificationInput) return;
    
    setIsVerifying(true);
    
    // Simulate verification process
    // In a real app, this would call an API to verify the identity
    setTimeout(() => {
      setIdentitySources(prev => 
        prev.map(source => 
          source.id === selectedSource.id 
            ? { ...source, verified: true } 
            : source
        )
      );
      setIsVerifying(false);
      setSelectedSource(null);
      setVerificationInput("");
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity Verification</CardTitle>
        <CardDescription>Linked accounts and verification status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {identitySources.map((source) => (
            <div key={source.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {source.icon}
                <span>{source.name}</span>
              </div>
              {source.verified ? (
                <span className="text-sm text-green-500">Verified</span>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedSource(source)}
                    >
                      Verify
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Verify {selectedSource?.name}</DialogTitle>
                      <DialogDescription>
                        Connect your {selectedSource?.name} account to enhance your reputation score.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="verification-input">
                          {selectedSource?.id === "github" && "GitHub Username"}
                          {selectedSource?.id === "twitter" && "Twitter/X Username"}
                          {selectedSource?.id === "linkedin" && "LinkedIn Profile URL"}
                          {selectedSource?.id === "stackoverflow" && "StackOverflow User ID"}
                        </Label>
                        <Input
                          id="verification-input"
                          placeholder={`Enter your ${selectedSource?.name} information`}
                          value={verificationInput}
                          onChange={(e) => setVerificationInput(e.target.value)}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {selectedSource?.id === "github" && 
                          "We'll ask you to create a special repository or gist to verify ownership."}
                        {selectedSource?.id === "twitter" && 
                          "You'll need to post a tweet with a verification code we provide."}
                        {selectedSource?.id === "linkedin" && 
                          "We'll verify through OAuth or by checking for a specific update on your profile."}
                        {selectedSource?.id === "stackoverflow" && 
                          "You'll need to add a specific code to your StackOverflow profile."}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button 
                        onClick={handleVerify} 
                        disabled={!verificationInput || isVerifying}
                      >
                        {isVerifying ? "Verifying..." : "Verify Account"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          ))}
          
          <div className="pt-4">
            <Button variant="outline" className="w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Add More Identities
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
