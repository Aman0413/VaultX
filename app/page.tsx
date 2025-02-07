'use client';

import { Shield, Lock, Key, Smartphone, Server, RefreshCw, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative min-h-[90vh] flex items-center justify-center px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--primary-50),_transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--primary-50),_transparent_70%)]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-block animate-fade-in">
              <div className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6 hover:bg-primary/20 transition-colors cursor-pointer">
                🔒 Your security is our priority
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-primary mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 animate-fade-in-up">
              Vault-X
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100">
              The most secure way to manage your passwords with
              <span className="text-primary font-semibold"> military-grade encryption</span>
            </p>
            <div className="flex gap-4 justify-center items-center animate-fade-in-up delay-200">
              <Button size="lg" className="text-lg px-8 h-12 rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
                Get Started Free <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-12 rounded-full">
                See How It Works
              </Button>
            </div>
            <div className="flex justify-center gap-8 mt-12 text-muted-foreground animate-fade-in-up delay-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-32 px-6 lg:px-8 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary-50),_transparent_100%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Why Choose Vault-X?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the next generation of password management with our cutting-edge features
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="w-12 h-12" />}
              title="Military-Grade Encryption"
              description="Your data is protected with AES-256 encryption, the same standard used by governments worldwide."
            />
            <FeatureCard
              icon={<Lock className="w-12 h-12" />}
              title="Zero-Knowledge Security"
              description="We can't access your data - only you have the keys to your vault."
            />
            <FeatureCard
              icon={<Key className="w-12 h-12" />}
              title="Password Generator"
              description="Create strong, unique passwords with our advanced generator."
            />
            <FeatureCard
              icon={<Smartphone className="w-12 h-12" />}
              title="Cross-Platform Access"
              description="Access your passwords on any device, anytime, anywhere."
            />
            <FeatureCard
              icon={<Server className="w-12 h-12" />}
              title="Secure Sync"
              description="Automatic synchronization across all your devices with end-to-end encryption."
            />
            <FeatureCard
              icon={<RefreshCw className="w-12 h-12" />}
              title="Auto-Fill"
              description="Save time with secure automatic form filling on websites and apps."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--primary-50),_transparent_70%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Take Control of Your Digital Security
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            Join thousands of users who trust Vault-X to protect their digital identity.
            Start securing your passwords today with our risk-free trial.
          </p>
          <Button size="lg" className="text-lg px-8 h-12 rounded-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary">
            Start Your Free Trial <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-16 px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <h3 className="font-semibold mb-4 text-lg">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Enterprise</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Status</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-lg">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-center text-muted-foreground">
              © {new Date().getFullYear()} Vault-X. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode,
  title: string,
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="p-8 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-primary/10">
      <div className="text-primary mb-6">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
}