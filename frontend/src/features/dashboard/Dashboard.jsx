import React, { useState } from 'react'

import CategoryFilter from './CategoryFilter'
import DashboardProductList from './DashboardProductList'

import '../../pages/home/Home.css'

const Dashboard = ({ props }) => {

  return (
    <div className='dashboard'>
      <CategoryFilter props={props} />
      <DashboardProductList props={props} />
    </div>
  )
}

export default Dashboard