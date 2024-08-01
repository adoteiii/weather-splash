import React from 'react';
import { EnvelopeClosedIcon, LinkedInLogoIcon, TwitterLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">AI Job Matcher</h3>
            <p className="text-sm">Revolutionizing job search and recruitment with cutting-edge AI technology.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-imagine-blue transition-colors">
                <TwitterLogoIcon className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-imagine-blue transition-colors">
                <LinkedInLogoIcon className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-imagine-blue transition-colors">
                <GitHubLogoIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">For Job Seekers</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-imagine-blue transition-colors">Browse Jobs</a></li>
              <li><a href="#" className="hover:text-imagine-blue transition-colors">AI Resume Review</a></li>
              <li><a href="#" className="hover:text-imagine-blue transition-colors">Career Advice</a></li>
              <li><a href="#" className="hover:text-imagine-blue transition-colors">Salary Calculator</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">For Employers</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-imagine-blue transition-colors">Post a Job</a></li>
              <li><a href="#" className="hover:text-imagine-blue transition-colors">AI Talent Matching</a></li>
              <li><a href="#" className="hover:text-imagine-blue transition-colors">Recruiting Solutions</a></li>
              <li><a href="#" className="hover:text-imagine-blue transition-colors">Pricing Plans</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-imagine-blue transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-imagine-blue transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-imagine-blue transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-imagine-blue transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 AI Job Matcher. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm hover:text-imagine-blue transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-imagine-blue transition-colors">Terms of Service</a>
            <a href="#" className="text-sm hover:text-imagine-blue transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;