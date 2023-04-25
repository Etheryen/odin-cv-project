import React, { useState } from 'react';
import Checkbox from '../base/Checkbox';
import Input from '../base/Input';
import Label from '../base/Label';
import MainTask from './MainTask';

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

interface Setters {
  setCompanyName: (id: number, companyName: string) => void;
  setPositionTitle: (id: number, positionTitle: string) => void;
  setStartDate: (id: number, startDate: string) => void;
  setFinishDate: (id: number, finishDate: string) => void;
  setOngoing: (id: number, ongoing: boolean) => void;
  handleCompanyRemove: (id: number) => void;
  handleMainTaskAdd: (companyId: number) => void;
  setMainTask: (companyId: number, taskId: number, taskData: string) => void;
  handleMainTaskRemove: (companyId: number, taskId: number) => void;
}

type Props = {
  company: Company;
  setters: Setters;
  isDisplayMode: boolean;
};

export default function PracticalExpForm({
  company,
  setters,
  isDisplayMode,
}: Props) {
  const [isEdited, setIsEdited] = useState(true);

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsEdited(false);

    const emptyTasksIds = [];
    for (const task of company.mainTasks) {
      if (task.data.trim() === '') emptyTasksIds.push(task.id);
    }
    for (const emptyTaskId of emptyTasksIds) {
      setters.handleMainTaskRemove(company.id, emptyTaskId);
    }
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
            id={'pExpEditForm' + company.id}
            className="grid w-fit items-center gap-3 sm:grid-cols-[auto_1fr]"
          >
            <Label htmlFor="companyName">Company name</Label>
            <Input
              value={company.companyName}
              onChange={(e) =>
                setters.setCompanyName(company.id, e.target.value)
              }
              type="text"
              id="companyName"
            />
            <Label htmlFor="positionTitle">Position title</Label>
            <Input
              value={company.positionTitle}
              onChange={(e) =>
                setters.setPositionTitle(company.id, e.target.value)
              }
              type="text"
              id="positionTitle"
            />
            <Label htmlFor="mainTasks">Main tasks</Label>
            {company.mainTasks.length > 0 && (
              <div className="hidden sm:block"></div>
            )}
            {company.mainTasks.map((task) => (
              <MainTask
                key={task.id}
                companyId={company.id}
                setMainTask={setters.setMainTask}
                handleMainTaskRemove={setters.handleMainTaskRemove}
                handleMainTaskAdd={setters.handleMainTaskAdd}
                task={task}
              />
            ))}
            <button
              type="button"
              onClick={() => setters.handleMainTaskAdd(company.id)}
              className={`w-fit rounded bg-gray-700 px-8 py-1 text-cyan-500 hover:bg-gray-600 ${
                company.mainTasks.length === 0 ? 'sm:mx-4' : ''
              }`}
            >
              + Add{company.mainTasks.length > 0 && ' another'}
            </button>
            {company.mainTasks.length > 0 && <div></div>}
            <Label htmlFor="startDate">Start date</Label>
            <Input
              required={!!company.finishDate}
              value={company.startDate}
              onChange={(e) => setters.setStartDate(company.id, e.target.value)}
              type="date"
              id="startDate"
            />
            <div className="mb-[-0.75rem] flex items-center gap-3 sm:mb-0 sm:gap-0">
              <Label htmlFor="ongoing">Ongoing</Label>
              <Checkbox
                checked={company.ongoing}
                onChange={(e) =>
                  setters.setOngoing(company.id, !company.ongoing)
                }
                id="ongoing"
              />
            </div>
            <div></div>
            {!company.ongoing && (
              <>
                <Label htmlFor="finishDate">Finish date</Label>
                <Input
                  required={!!company.startDate}
                  value={company.finishDate}
                  onChange={(e) =>
                    setters.setFinishDate(company.id, e.target.value)
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
            {company.positionTitle && (
              <div className="text-xl font-bold">{company.positionTitle}</div>
            )}
            {company.companyName && (
              <div className="italic">{company.companyName} </div>
            )}
            {company.startDate && company.ongoing && (
              <div className="text-sm">Ongoing - {company.startDate}</div>
            )}
            {company.startDate && !company.ongoing && (
              <div className="text-sm">
                {company.finishDate} - {company.startDate}
              </div>
            )}
            {company.mainTasks.length > 0 && (
              <ul>
                {company.mainTasks.map((task) => (
                  <li key={task.id} className="ml-4 list-disc text-xs">
                    {task.data}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        {isEdited ? (
          <button
            key={'savePExp' + company.id}
            form={'pExpEditForm' + company.id}
            className="w-fit rounded bg-gray-700 px-8 py-1 hover:bg-gray-600"
          >
            Save
          </button>
        ) : (
          <>
            {!isDisplayMode && (
              <button
                key={'editPExp' + company.id}
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
            type="button"
            onClick={() => setters.handleCompanyRemove(company.id)}
            className="w-fit rounded bg-gray-700 px-8 py-1 text-red-600 hover:bg-gray-600"
          >
            ✕ Delete
          </button>
        )}
      </div>
    </>
  );
}
