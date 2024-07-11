'use client'

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import MainBento from "@/components/MainBento";
import BentoGrids from "@/components/BentoGrids";
import AlertsModal from "@/components/AlertsModal";


const Home: React.FC = () => {

  const [alerts, setAlerts] = useState<any[]>([]); // State to store alerts
  const [showAlertsModal, setShowAlertsModal] = useState(false); // State to control modal visibility

 
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (('key' in e && e.key === 'Enter') || e.type === 'click') {
      e.preventDefault();
      
    }
  };

  return (
    <div className="bg-auto h-full">
      <div className="w-full rounded-lg flex flex-col h-fit">
        {/* Navbar */}
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Navbar 
            alerts={alerts}
            onAlertIconClick={()=>setShowAlertsModal(true)}
          />
        </div>
        {/* MainBento */}
        <div className="flex justify-center mt-6">
          <MainBento 
            
          />
        </div>

        {/* BentoGrids */}
        <div className="flex justify-center mt-6">
          <BentoGrids 
            
          />
        </div>

        {/* Alerts Modal */}
        {showAlertsModal && (
          <AlertsModal 
            alerts={alerts} 
            onClose={() => setShowAlertsModal(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default Home;