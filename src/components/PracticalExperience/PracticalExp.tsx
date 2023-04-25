import { useState } from 'react';
import PracticalExpForm from './PracticalExpForm';

interface Company {
  id: number;
  companyName: string;
  positionTitle: string;
  mainTasks: {
    id: number;
    data: string;
  }[];
  startDate: string;
  finishDate: string;
  ongoing: boolean;
}

export default function PracticalExp(props: { isDisplayMode: boolean }) {
  const [currentId, setCurrentId] = useState(1);
  const [companies, setCompanies] = useState<Company[]>([]);

  const setters = {
    setCompanyName: (id: number, companyName: string) => {
      const newCompanies = [...companies];
      newCompanies.find((company) => company.id === id)!.companyName =
        companyName;
      setCompanies(newCompanies);
    },
    setPositionTitle: (id: number, positionTitle: string) => {
      const newCompanies = [...companies];
      newCompanies.find((company) => company.id === id)!.positionTitle =
        positionTitle;
      setCompanies(newCompanies);
    },
    setStartDate: (id: number, startDate: string) => {
      const newCompanies = [...companies];
      newCompanies.find((company) => company.id === id)!.startDate = startDate;
      setCompanies(newCompanies);
    },
    setFinishDate: (id: number, finishDate: string) => {
      const newCompanies = [...companies];
      newCompanies.find((company) => company.id === id)!.finishDate =
        finishDate;
      setCompanies(newCompanies);
    },
    setOngoing: (id: number, ongoing: boolean) => {
      const newCompanies = [...companies];
      newCompanies.find((company) => company.id === id)!.ongoing = ongoing;
      setCompanies(newCompanies);
    },
    handleCompanyRemove: (id: number) => {
      const filtered = companies.filter((company) => company.id !== id);
      setCompanies(filtered);
    },
    handleMainTaskAdd: (companyId: number) => {
      const newCompanies = [...companies];
      newCompanies
        .find((company) => company.id === companyId)!
        .mainTasks.push({ id: currentId, data: '' });
      setCurrentId(currentId + 1);
      setCompanies(newCompanies);
      // FOCUS ON NEW TASk
    },
    setMainTask: (companyId: number, taskId: number, taskData: string) => {
      const newCompanies = [...companies];
      newCompanies
        .find((company) => company.id === companyId)!
        .mainTasks.find((task) => task.id === taskId)!.data = taskData;
      setCompanies(newCompanies);
    },
    handleMainTaskRemove: (companyId: number, taskId: number) => {
      const newCompanies = [...companies];
      const company = newCompanies.find((company) => company.id === companyId)!;
      company.mainTasks = company.mainTasks.filter(
        (task) => task.id !== taskId
      );
      setCompanies(newCompanies);
    },
  };

  function handleCompanyAdd() {
    setCompanies([
      ...companies,
      {
        id: currentId,
        companyName: '',
        positionTitle: '',
        mainTasks: [],
        startDate: '',
        finishDate: '',
        ongoing: false,
      },
    ]);
    setCurrentId(currentId + 1);
  }

  const shouldDisplay = !props.isDisplayMode || companies.length > 0;

  return (
    <>
      {shouldDisplay && (
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold underline decoration-cyan-500">
            Practical experience
          </h2>
          {companies.map((company) => (
            <PracticalExpForm
              key={company.id}
              company={company}
              setters={setters}
              isDisplayMode={props.isDisplayMode}
            />
          ))}
          {!props.isDisplayMode && (
            <button
              onClick={handleCompanyAdd}
              className="w-fit rounded bg-gray-700 px-8 py-1 text-cyan-500 hover:bg-gray-600"
            >
              + Add{companies.length > 0 && ' another'}
            </button>
          )}
        </section>
      )}
    </>
  );
}
