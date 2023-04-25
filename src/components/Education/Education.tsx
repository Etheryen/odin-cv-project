import { useState } from 'react';
import EducationForm from './EducationForm';

interface School {
  id: number;
  schoolName: string;
  titleOfStudy: string;
  startDate: string;
  finishDate: string;
  ongoing: boolean;
}

export default function Education(props: { isDisplayMode: boolean }) {
  const [currentId, setCurrentId] = useState(1);
  const [schools, setSchools] = useState<School[]>([]);

  const setters = {
    setSchoolName: (id: number, schoolName: string) => {
      const newSchools = [...schools];
      newSchools.find((school) => school.id === id)!.schoolName = schoolName;
      setSchools(newSchools);
    },
    setTitleOfStudy: (id: number, titleOfStudy: string) => {
      const newSchools = [...schools];
      newSchools.find((school) => school.id === id)!.titleOfStudy =
        titleOfStudy;
      setSchools(newSchools);
    },
    setStartDate: (id: number, startDate: string) => {
      const newSchools = [...schools];
      newSchools.find((school) => school.id === id)!.startDate = startDate;
      setSchools(newSchools);
    },
    setFinishDate: (id: number, finishDate: string) => {
      const newSchools = [...schools];
      newSchools.find((school) => school.id === id)!.finishDate = finishDate;
      setSchools(newSchools);
    },
    setOngoing: (id: number, ongoing: boolean) => {
      const newSchools = [...schools];
      newSchools.find((school) => school.id === id)!.ongoing = ongoing;
      setSchools(newSchools);
    },
    handleSchoolRemove: (id: number) => {
      const filtered = schools.filter((school) => school.id !== id);
      setSchools(filtered);
    },
  };

  function handleSchoolAdd() {
    setSchools([
      ...schools,
      {
        id: currentId,
        schoolName: '',
        titleOfStudy: '',
        startDate: '',
        finishDate: '',
        ongoing: false,
      },
    ]);
    setCurrentId(currentId + 1);
  }

  const shouldDisplay = !props.isDisplayMode || schools.length > 0;

  return (
    <>
      {shouldDisplay && (
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold underline decoration-cyan-500">
            Education
          </h2>
          {schools.map((school) => (
            <EducationForm
              key={school.id}
              school={school}
              setters={setters}
              isDisplayMode={props.isDisplayMode}
            />
          ))}
          {!props.isDisplayMode && (
            <button
              onClick={handleSchoolAdd}
              className="w-fit rounded bg-gray-700 px-8 py-1 text-cyan-500 hover:bg-gray-600"
            >
              + Add{schools.length > 0 && ' another'}
            </button>
          )}
        </section>
      )}
    </>
  );
}
