import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../src/utils/auth';

const DonePage = () => {
  const user = getCurrentUser();
  const HISTORY_KEY = `history_${user.username}`;
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, [HISTORY_KEY]);

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">History</h1>
      {history.length === 0 ? (
        <p className="text-black dark:text-white">No history found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {history.map((item) => (
            <div key={item.id} className="border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] p-4 bg-white dark:bg-black break-words">
              <h3 className="text-xl font-bold text-black dark:text-white mb-2">{item.title}</h3>
              <p className="text-black dark:text-white mb-2">{item.content}</p>
              <p className="text-sm text-black dark:text-white mb-2">Priority: {item.priority}</p>
              <p className="text-sm text-black dark:text-white">Type: {item.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonePage;
