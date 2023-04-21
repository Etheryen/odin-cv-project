import Header from './components/base/Header';
import GeneralInfo from './components/GeneralInfo';
import Education from './components/Education';
import PracticalExp from './components/PracticalExp';

function App() {
  return (
    <div className="min-h-screen bg-gray-800 px-[20vw] pb-10 text-white">
      <Header />
      <div className="flex flex-col gap-10">
        <GeneralInfo />
        <Education />
        <PracticalExp />
      </div>
    </div>
  );
}

export default App;
