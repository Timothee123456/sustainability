import styles from '../styling/deviceID.module.css';
import { useState, useRef } from 'react';

export default function DeviceID({setView}) {
    const [showNotification, setShowNotification] = useState(false);
    const [hideNotification, setHideNotification] = useState(false);
    const timeoutRef = useRef(null);
    const [deviceId, setDeviceId] = useState('');
    
    function changeDeviceID() {
        if (deviceId.trim()) {
            localStorage.setItem('deviceId', deviceId);
            setView('screensaver');
        } else {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
                
            setShowNotification(true);
            setHideNotification(false);
            timeoutRef.current = setTimeout(() => {
            setHideNotification(true);
            setTimeout(() => setShowNotification(false), 500); // Wait for slideUp animation to complete
            }, 2000);
            return;
        }
    }
    return (
        <div className="container">
            {showNotification && (
                <div className={`notification error ${hideNotification ? 'hide' : ''}`}>
                Please entrer a valid Device ID before continuing, or press "Skip" to continue without entering a Device ID.
                </div>
            )}
            <h1>Please enter your Device ID</h1>
            <p>If you do not know your Device ID, please contact your system administrator or select “Skip” to continue.</p>
            <input
                type="text"
                placeholder="Device ID"
                className={styles.input}
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
            />
            <button className={styles.skip} onClick={() => setView('screensaver')}>
                Skip
            </button>
            <button className={styles.submit} onClick={changeDeviceID}>
                Continue
            </button>
        </div>
    )
  };