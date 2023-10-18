import React from 'react'

const EmployeeSettings = () => {

  return (
    <div className='shadow-box'>
        <div className="employee-settings">
            <div className="employee-setting-header">
                <h1>Employés</h1>
            </div>
            <div className="employee-setting-content">
                <div className="employee-setting-content-item">
                    <div className="employee-settings-content-item-box">
                        <h3>Activer les employés</h3>
                        <label className="switch">
                            <input 
                                type="checkbox" 
                            />
                            <span className='slider rounded'></span>
                        </label>
                    </div>
                </div>
                <div className="employee-setting-content-item">
                    <div className="employee-settings-content-item-box">
                        <div className='employee-list'>
                            <h3>Liste d'employés</h3>
                            <p className="text-link">Voir les employés</p>
                        </div>
                        <button style={{ width: "150px" }} className="btn btn-outlined-blue">Ajouter un employé</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeSettings