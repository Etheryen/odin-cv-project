import Input from '../base/Input';
import Label from '../base/Label';

interface MainTaskProps {
  companyId: number;
  task: {
    id: number;
    data: string;
  };
  setMainTask: (companyId: number, taskId: number, taskData: string) => void;
  handleMainTaskRemove: (companyId: number, taskId: number) => void;
  handleMainTaskAdd: (companyId: number) => void;
}

export default function MainTask({
  task,
  setMainTask,
  companyId,
  handleMainTaskRemove,
  handleMainTaskAdd,
}: MainTaskProps) {
  function handleInputKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleMainTaskAdd(companyId);
    }
  }

  return (
    <>
      <Input
        value={task.data}
        onChange={(e) => setMainTask(companyId, task.id, e.target.value)}
        type="text"
        id="mainTask"
        isTask={true}
        handleInputKeyPress={handleInputKeyPress}
      />
      <button
        type="button"
        onClick={() => handleMainTaskRemove(companyId, task.id)}
        className="w-fit rounded bg-gray-700 px-8 py-1 text-red-600 hover:bg-gray-600 sm:mx-4"
      >
        ✕ Delete
      </button>
    </>
  );
}
