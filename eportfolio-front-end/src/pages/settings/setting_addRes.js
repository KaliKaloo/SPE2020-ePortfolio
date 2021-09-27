import React from 'react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import SettingsHub from '../../components/settings_hub';
import "../../styles/settingsPage.css"

function AdditionalRes() {
  return (
    <>
    <Navbar />
    <div className="settings_mainpage">
        <div className="settings">
            <SettingsHub/>
            <div className="settings_right_container">
                <h5>Additional Resources</h5>
                
            </div>
        </div>
    </div>
    <Footer />
    </>
    );
}
  
export default AdditionalRes;