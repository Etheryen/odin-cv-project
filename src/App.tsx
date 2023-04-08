import Header from './components/base/Header';
import GeneralInfo from './components/GeneralInfo';
import Education from './components/Education';
import PracticalExp from './components/PracticalExp';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-800 px-[20vw] text-white">
      <Header />
      <GeneralInfo />
      <Education />
      <PracticalExp />
    </div>
  );
}

export default App;
