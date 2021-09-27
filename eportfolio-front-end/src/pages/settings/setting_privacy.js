import React from 'react';
import { Link} from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import SettingsHub from '../../components/settings_hub';
import "../../styles/settingsPage.css"

function Privacy() {
  return (
    <>
    <Navbar />
    <div className="settings_mainpage">
        <div className="settings">
            <SettingsHub/>
            <div className="settings_right_container">
                <h5>Privacy</h5> 
                <div setting_options>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            Read the  <Link to="/terms_and_conditions" target="_blank">Terms and Conditions</Link> 
                        </div>
                        <div className="col-sm-10">
                             Read the <Link to="//www.gdprprivacynotice.com/live.php?token=Irz2pcARei9eBLUxEB85CZY6gJR9Eva4" target="_blank">
                                Privacy Policy
                            </Link>
                        </div>                          
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
    </>
    );
}
  
export default Privacy;