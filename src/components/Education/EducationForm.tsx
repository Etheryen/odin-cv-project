import { useState } from 'react';
import Checkbox from '../base/Checkbox';
import Input from '../base/Input';
import Label from '../base/Label';

interface School {
  id: number;
  schoolName: string;
  titleOfStudy: string;
  startDate: string;
  finishDate: string;
  ongoing: boolean;
}

interface Setters {
  setSchoolName: (id: number, schoolName: string) => void;
  setTitleOfStudy: (id: number, titleOfStudy: string) => void;
  setStartDate: (id: number, startDate: string) => void;
  setFinishDate: (id: number, finishDate: string) => void;
  setOngoing: (id: number, ongoing: boolean) => void;
  handleSchoolRemove: (id: number) => void;
}

type Props = {
  school: School;
  setters: Setters;
  isDisplayMode: boolean;
};

export default function EducationForm({
  school,
  setters,
  isDisplayMode,
}: Props) {
  const [isEdited, setIsEdited] = useState(true);

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsEdited(false);
  }

  function handleEdit() {
    setIsEdited(true);
  }

  return (
    <>
      {isEdited ? (
        <>
          <form
            onSubmit={handleSave}
            id={'eduEditForm' + school.id}
            className="grid w-fit items-center gap-3 sm:grid-cols-[auto_1fr]"
          >
            <Label htmlFor="schoolName">School name</Label>
            <Input
              value={school.schoolName}
              onChange={(e) => setters.setSchoolName(school.id, e.target.value)}
              type="text"
              id="schoolName"
            />
            <Label htmlFor="titleOfStudy">Title of study</Label>
            <Input
              value={school.titleOfStudy}
              onChange={(e) =>
                setters.setTitleOfStudy(school.id, e.target.value)
              }
              type="text"
              id="titleOfStudy"
            />
            <Label htmlFor="startDate">Start date</Label>
            <Input
              required={!!school.finishDate}
              value={school.startDate}
              onChange={(e) => setters.setStartDate(school.id, e.target.value)}
              type="date"
              id="startDate"
            />
            <div className="mb-[-0.75rem] flex items-center gap-3 sm:mb-0 sm:gap-0">
              <Label htmlFor="ongoing">Ongoing</Label>
              <Checkbox
                checked={school.ongoing}
                onChange={(e) => setters.setOngoing(school.id, !school.ongoing)}
                id="ongoing"
              />
            </div>
            <div></div>
            {!school.ongoing && (
              <>
                <Label htmlFor="finishDate">Finish date</Label>
                <Input
                  required={!!school.startDate}
                  value={school.finishDate}
                  onChange={(e) =>
                    setters.setFinishDate(school.id, e.target.value)
                  }
                  type="date"
                  id="finishDate"
                />
              </>
            )}
          </form>
        </>
      ) : (
        <>
          <div>
            <div className="text-lg">
              {school.schoolName && (
                <span className="font-bold">{school.schoolName} </span>
              )}
              {school.titleOfStudy && (
                <span className="italic">({school.titleOfStudy})</span>
              )}
            </div>
            {school.startDate && school.ongoing && (
              <div className="text-sm">Ongoing - {school.startDate}</div>
            )}
            {school.startDate && !school.ongoing && (
              <div className="text-sm">
                {school.finishDate} - {school.startDate}
              </div>
            )}
          </div>
        </>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        {isEdited ? (
          <button
            key={'saveEdu' + school.id}
            form={'eduEditForm' + school.id}
            className="w-fit rounded bg-gray-700 px-8 py-1 hover:bg-gray-600"
          >
            Save
          </button>
        ) : (
          <>
            {!isDisplayMode && (
              <button
                key={'editEdu' + school.id}
                onClick={handleEdit}
                className="w-fit rounded bg-gray-700 px-8 py-1 hover:bg-gray-600"
              >
                Edit
              </button>
            )}
          </>
        )}
        {!isDisplayMode && (
          <button
            onClick={() => setters.handleSchoolRemove(school.id)}
            className="w-fit rounded bg-gray-700 px-8 py-1 text-red-600 hover:bg-gray-600"
          >
            ✕ Delete
          </button>
        )}
      </div>
    </>
  );
}
