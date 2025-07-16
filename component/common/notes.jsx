import React, { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, AlertCircle, Circle, Check, FileText, ListChecks, ClipboardList, Eye, Edit, Trash2, CheckCircle } from 'lucide-react';
import Button from '../ui/button';
import Form, { FormInput, FormTextarea } from '../ui/form';
import Dropdown from '../ui/dropdown';
import { getCurrentUser } from '../../src/utils/auth';

const NotesPage = () => {
  const user = getCurrentUser();
  const STORAGE_KEY = `notes_${user.username}`;
  const HISTORY_KEY = `history_${user.username}`;
  const NOTES_PER_PAGE = 6;

  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [priority, setPriority] = useState(null);
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailNote, setDetailNote] = useState(null);

  // Load notes
  useEffect(() => {
    const storedNotes = localStorage.getItem(STORAGE_KEY);
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, [STORAGE_KEY]);

  // Save notes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes, STORAGE_KEY]);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!priority || !type) return alert('Pilih Priority & Type!');
    const newNote = {
      id: Date.now(),
      title: noteTitle,
      content: noteContent,
      priority: priority.value,
      type: type.value,
    };
    setNotes([...notes, newNote]);
    setNoteTitle('');
    setNoteContent('');
    setPriority(null);
    setType(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Yakin hapus?')) {
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  const handleDone = (note) => {
    // Pindahkan ke history
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    const history = storedHistory ? JSON.parse(storedHistory) : [];
    localStorage.setItem(HISTORY_KEY, JSON.stringify([...history, note]));

    // Hapus dari notes
    setNotes(notes.filter((n) => n.id !== note.id));
  };

  const totalPages = Math.ceil(notes.length / NOTES_PER_PAGE);
  const indexOfLastNote = currentPage * NOTES_PER_PAGE;
  const indexOfFirstNote = indexOfLastNote - NOTES_PER_PAGE;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  return (
    <div className="relative bg-white dark:bg-black p-6 mt-1 min-h-screen">
      {/* Notes List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentNotes.map((note) => (
          <div
            key={note.id}
            className="border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] p-4 bg-white dark:bg-black transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none break-words"
          >
            <h3 className="text-xl font-bold text-black dark:text-white mb-2 break-words">{note.title}</h3>
            <p className="text-black dark:text-white mb-2 break-words">{note.content}</p>
            <p className="text-sm text-black dark:text-white mb-2">Priority: {note.priority}</p>
            <p className="text-sm text-black dark:text-white mb-4">Type: {note.type}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" icon={<Eye className="w-4 h-4" />} onClick={() => setDetailNote(note)}>
                Detail
              </Button>
              {note.type !== 'Note' && (
                <Button variant="secondary" icon={<CheckCircle className="w-4 h-4" />} onClick={() => handleDone(note)}>
                  Done
                </Button>
              )}
              <Button variant="secondary" icon={<Trash2 className="w-4 h-4" />} onClick={() => handleDelete(note.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-4">
          <Button onClick={handlePrevPage} disabled={currentPage === 1} icon={<ChevronLeft />} />
          <span className="font-bold text-black dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages} icon={<ChevronRight />} />
        </div>
      )}

      {/* Floating Add */}
      <div className="fixed bottom-10 right-6">
        <Button onClick={() => setShowModal(true)} icon={<Plus />} className="rounded-full p-4">
          Add
        </Button>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Add New Note</h2>
            <Form onSubmit={handleAddNote}>
              <FormInput label="Title" type="text" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} required />
              <FormTextarea label="Content" value={noteContent} onChange={(e) => setNoteContent(e.target.value)} required />

              <Dropdown
                label="Select Priority"
                options={[
                  { value: 'High', label: 'High', icon: <AlertCircle className="w-4 h-4" /> },
                  { value: 'Medium', label: 'Medium', icon: <Circle className="w-4 h-4" /> },
                  { value: 'Low', label: 'Low', icon: <Check className="w-4 h-4" /> },
                ]}
                onSelect={setPriority}
                className="w-30"
              />

              <Dropdown
                label="Select Type"
                options={[
                  { value: 'Note', label: 'Note', icon: <FileText className="w-4 h-4" /> },
                  { value: 'Todo', label: 'Todo', icon: <ListChecks className="w-4 h-4" /> },
                  { value: 'Task', label: 'Task', icon: <ClipboardList className="w-4 h-4" /> },
                ]}
                onSelect={setType}
                className="w-30"
              />

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

      {/* Detail Modal */}
      {detailNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Detail</h2>
            <p className="text-black dark:text-white mb-2 font-bold">Title: {detailNote.title}</p>
            <p className="text-black dark:text-white mb-2">Content: {detailNote.content}</p>
            <p className="text-black dark:text-white mb-2">Priority: {detailNote.priority}</p>
            <p className="text-black dark:text-white mb-4">Type: {detailNote.type}</p>
            <Button variant="secondary" onClick={() => setDetailNote(null)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
