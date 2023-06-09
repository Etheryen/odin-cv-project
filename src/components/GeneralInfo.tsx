import { useState } from 'react';
import Input from './base/Input';
import Label from './base/Label';

export default function GeneralInfo(props: { isDisplayMode: boolean }) {
  const [isEdited, setIsEdited] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsEdited(false);
  }

  function handleEdit() {
    setIsEdited(true);
  }

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold underline decoration-cyan-500">
        General Information
      </h2>
      {isEdited ? (
        <>
          <form
            onSubmit={handleSave}
            id="infoEditForm"
            className="grid w-fit items-center gap-3 sm:grid-cols-[auto_1fr]"
          >
            <Label htmlFor="name">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
            />
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
            <Label htmlFor="phone">Phone number</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              id="phone"
            />
          </form>
          <button
            key={'saveInfo'}
            form="infoEditForm"
            className="w-fit rounded bg-gray-700 px-8 py-1 hover:bg-gray-600"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <div>
            {name && <div className="text-2xl font-bold italic">{name}</div>}
            {email && <div>{email}</div>}
            {phone && <div className="font-mono">{phone}</div>}
          </div>
          {!props.isDisplayMode && (
            <button
              key={'editInfo'}
              onClick={handleEdit}
              className="w-fit rounded bg-gray-700 px-8 py-1 hover:bg-gray-600"
            >
              Edit
            </button>
          )}
        </>
      )}
    </section>
  );
}
