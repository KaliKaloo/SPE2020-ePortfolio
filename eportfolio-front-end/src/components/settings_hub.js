import React from 'react';
import {useHistory} from "react-router-dom";
import {Navigation} from 'react-minimal-side-navigation';
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import "./styles/settingsCSS.css"
import SettingsIcon from '@material-ui/icons/Settings';
import LockIcon from '@material-ui/icons/Lock';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

function SettingsHub() {
    const history = useHistory();
    
    return (
        <>
            <div className="setting_hub">
                <div className = "hub_container"> 
                    <h2 className="settings_title"> Settings </h2>

                    <Navigation
                    activeItemId={"props.location.pathname"}
                    onSelect={({itemId}) => {
                    history.push("/settings_" + itemId);
                    }}
                    items={[
                    {
                        title: 'General',
                        itemId: 'general',
                        elemBefore: () => <SettingsIcon/>,
                    },
                    {
                        title: 'Privacy',
                        itemId: 'privacy',
                        elemBefore: () => <LockIcon/>,
                    },
                    {
                        title: 'Additional Resources',
                        itemId: 'additional_res',
                        elemBefore: () => <LibraryBooksIcon/>,
                        
                    },
                    ]}/>
                </div>
            </div>
        </>

    );
}

export default SettingsHub;
