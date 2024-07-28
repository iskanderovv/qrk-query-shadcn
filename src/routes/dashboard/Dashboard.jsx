import Header from '@/components/Header'
import MainContent from '@/components/MainContent'
import SidebarComponent from '@/components/Sidebar'
import React, { useState } from 'react'

const Dashboard = () => {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="flex">
      <SidebarComponent collapse={collapse} />
      <div className="w-full">
        <Header collapse={collapse} setCollapse={setCollapse} />
        <MainContent />
      </div>
    </div>
  )
}

export default Dashboard
