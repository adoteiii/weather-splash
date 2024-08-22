'use client'

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import MainBento from "@/components/MainBento";
import BentoGrids from "@/components/BentoGrids";
import AlertsModal from "@/components/old/AlertsModal";
import TopBanner from "@/components/TopBanner";
import { useAppSelector } from "@/redux/store";



const Home: React.FC = () => {
  const [alerts] = useState<any[]>([]); // State to store alerts
  const [showAlertsModal, setShowAlertsModal] = useState(false); // State to control modal visibility
  const data = useAppSelector(state=>state.DataReducer.value)
  const [bgImg, setBgImg] = useState("")

  useEffect(()=>{
    console.log('f bg url')
    if (!data){
      setBgImg( " " )
      return
    }
    console.log(data.current.condition.text, 'bg url')
    if (data.current.condition.text==="Partly cloudy"){
      setBgImg( " dark:bg-[url('/assets/cloudy-bg.png')] bg-[url('/assets/cloudy-light-bg.png')] bg-cover bg-bottom " )
      
    }
    else if (data.current.condition.text==="Sunny"){
      setBgImg( " dark:bg-[url('/assets/sunny-bg.png')] bg-[url('/assets/sunny-bg.png')] bg-cover  " )
    }
    else {
      setBgImg( " " )
    }
  }, [data])

  return (
    <div className={"min-h-screen  "+bgImg}>
      <div className="w-full rounded-lg flex flex-col h-fit">
        {/* Navbar */}
        <div className="flex flex-col md:flex-row justify-between items-center p-12">
          <Navbar 
            alerts={alerts}
            onAlertIconClick={() => setShowAlertsModal(true)}
          />
        </div>

         {/* Summery */}
         <div className="flex flex-col md:flex-row justify-between items-center p-4">
          <TopBanner 

          />
        </div>
  
        {/* MainBento */}
        {/* <div className="flex justify-center mt-6">
          <MainBento />
        </div> */}

        {/* BentoGrids */}
        <div className="flex justify-center mt-6">
          <BentoGrids />
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
