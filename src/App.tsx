import Header from './components/base/Header';
import GeneralInfo from './components/GeneralInfo';
import Education from './components/Education/Education';
import PracticalExp from './components/PracticalExperience/PracticalExp';
import { useState } from 'react';

function App() {
  const [isDisplayMode, setIsDisplayMode] = useState(false);

  function toggleDisplayMode() {
    setIsDisplayMode(!isDisplayMode);
    console.log({ isDisplayMode: !isDisplayMode });
  }

  return (
    <div className="min-h-screen bg-gray-800 px-[20vw] pb-10 text-white">
      <Header />
      <div className="flex flex-col gap-10">
        <GeneralInfo isDisplayMode={isDisplayMode} />
        <Education isDisplayMode={isDisplayMode} />
        <PracticalExp isDisplayMode={isDisplayMode} />
        <button
          onClick={() => toggleDisplayMode()}
          className="w-fit rounded bg-gray-700 px-8 py-1 text-white hover:bg-gray-600"
        >
          Toggle Display Mode
        </button>
      </div>
    </div>
  );
}

export default App;
