import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Button from '../ui/button';
import Form, { FormInput, FormTextarea } from '../ui/form';
import { getCurrentUser } from '../../src/utils/auth';

const NotesPage = () => {
  const user = getCurrentUser();
  const STORAGE_KEY = `notes_${user.username}`;

  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // Load notes dari localStorage saat pertama render
  useEffect(() => {
    const storedNotes = localStorage.getItem(STORAGE_KEY);
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, [STORAGE_KEY]);

  // Update localStorage setiap notes berubah
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes, STORAGE_KEY]);

  const handleAddNote = (e) => {
    e.preventDefault();
    const newNote = { id: Date.now(), title: noteTitle, content: noteContent };
    setNotes([...notes, newNote]);
    setNoteTitle('');
    setNoteContent('');
    setShowModal(false);
  };

  return (
    <div className="relative  bg-white dark:bg-black p-6 mt-1">
      {/* Notes List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] p-4 bg-white dark:bg-black transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none break-words"
          >
            <h3 className="text-xl font-bold text-black dark:text-white mb-2 break-words">{note.title}</h3>
            <p className="text-black dark:text-white whitespace-pre-wrap break-words">{note.content}</p>
          </div>
        ))}
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-6 right-6">
        <Button onClick={() => setShowModal(true)} icon={<Plus className="w-5 h-5" />} className="rounded-full p-4">
          Add
        </Button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Add New Note</h2>
            <Form onSubmit={handleAddNote}>
              <FormInput label="Title" type="text" name="title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} required />
              <FormTextarea label="Content" name="content" value={noteContent} onChange={(e) => setNoteContent(e.target.value)} required />
              <div className="flex justify-end gap-2 mt-4">
                <Button type="button" variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
