import React from 'react';

interface AlertsModalProps {
  alerts: any[];
  onClose: () => void;
}

const AlertsModal: React.FC<AlertsModalProps> = ({ alerts, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-red-500 w-full max-w-md m-auto flex-col flex rounded-lg">
        <span className="absolute top-0 right-0 p-4">
          <button onClick={onClose}>&times;</button>
        </span>
        <h1 className="mb-4">Severe Weather Alerts</h1>
        <ul>
          {alerts.map((alert, index) => (
            <li key={index} className="mb-2">
              <strong>{alert.headline}</strong>: {alert.desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlertsModal;
