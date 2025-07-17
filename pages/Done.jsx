import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../src/utils/auth';
import { useNavigate } from 'react-router-dom';
import Button from '../component/ui/button';

const DonePage = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const DONE_KEY = `done_${user.username}`;
  const [doneList, setDoneList] = useState([]);

  /** Load done list on mount **/
  useEffect(() => {
    const stored = localStorage.getItem(DONE_KEY);
    if (stored) setDoneList(JSON.parse(stored));
  }, [DONE_KEY]);

  return (
    <div className="p-6 bg-white dark:bg-black min-h-screen">
      <Header onBack={() => navigate(-1)} />
      {doneList.length === 0 ? <EmptyDone /> : <DoneList doneList={doneList} />}
    </div>
  );
};

/** Subcomponents **/

const Header = ({ onBack }) => (
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-2xl font-bold text-black dark:text-white">Done</h1>
    <Button onClick={onBack}>Back</Button>
  </div>
);

const EmptyDone = () => <p className="text-black dark:text-white">No done items found.</p>;

const DoneList = ({ doneList }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {doneList.map((item) => (
      <DoneCard key={item.id} item={item} />
    ))}
  </div>
);

const DoneCard = ({ item }) => (
  <div
    className="border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] p-4 bg-white dark:bg-black break-words
    transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
  >
    <h3 className="text-xl font-bold text-black dark:text-white mb-2">{item.title}</h3>
    <p className="text-black dark:text-white mb-2">{item.content}</p>
    <p className="text-sm text-black dark:text-white mb-2">Priority: {item.priority}</p>
    <p className="text-sm text-black dark:text-white">Type: {item.type}</p>
  </div>
);

export default DonePage;
