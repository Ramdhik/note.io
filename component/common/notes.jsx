import React, { useState, useEffect } from 'react';
import { Plus, ChevronLeft, ChevronRight, AlertCircle, Circle, Check, FileText, ListChecks, ClipboardList, Eye, Trash2, CheckCircle } from 'lucide-react';
import Button from '../ui/button';
import Form, { FormInput, FormTextarea } from '../ui/form';
import Dropdown from '../ui/dropdown';
import { getCurrentUser } from '../../src/utils/auth';
import SearchBar from '../common/search';
import { useNavigate, useSearchParams } from 'react-router-dom';

const NotesPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const user = getCurrentUser();
  const STORAGE_KEY = `notes_${user.username}`;
  const DONE_KEY = `done_${user.username}`;
  const NOTES_PER_PAGE = 6;

  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [detailNote, setDetailNote] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterOption, setFilterOption] = useState('all');

  // Form states
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [priority, setPriority] = useState(null);
  const [type, setType] = useState(null);

  /** Load state from query string on first render **/
  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    const keyword = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || 'all';

    setCurrentPage(page);
    setSearchInput(keyword);
    setSearchKeyword(keyword);
    setFilterOption(filter);
  }, []); // run once on mount

  // Load notes from localStorage
  useEffect(() => {
    const storedNotes = localStorage.getItem(STORAGE_KEY);
    if (storedNotes) setNotes(JSON.parse(storedNotes));
  }, [STORAGE_KEY]);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes, STORAGE_KEY]);

  /** Sync state ➔ URL **/
  useEffect(() => {
    setSearchParams({
      page: currentPage,
      search: searchKeyword,
      filter: filterOption,
    });
  }, [currentPage, searchKeyword, filterOption, setSearchParams]);

  /** Handlers **/
  const addNote = (e) => {
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
    resetForm();
    setShowModal(false);
  };

  const deleteNote = (id, skipConfirm = false) => {
    if (skipConfirm || confirm('Yakin hapus?')) {
      setNotes(notes.filter((n) => n.id !== id));
    }
  };

  const markAsDone = (note) => {
    const storedDone = localStorage.getItem(DONE_KEY);
    const done = storedDone ? JSON.parse(storedDone) : [];
    localStorage.setItem(DONE_KEY, JSON.stringify([...done, note]));
    deleteNote(note.id, true);
  };

  const resetForm = () => {
    setNoteTitle('');
    setNoteContent('');
    setPriority(null);
    setType(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchKeyword(searchInput);
  };

  /** Filtering & Pagination **/
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchKeyword.toLowerCase()) || note.content.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesFilter = filterOption === 'all' || note.priority.toLowerCase() === filterOption || note.type.toLowerCase() === filterOption.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredNotes.length / NOTES_PER_PAGE);
  const indexOfLastNote = currentPage * NOTES_PER_PAGE;
  const indexOfFirstNote = indexOfLastNote - NOTES_PER_PAGE;
  const currentNotes = filteredNotes.slice(indexOfFirstNote, indexOfLastNote);

  /** Render **/
  return (
    <div className="relative bg-white dark:bg-black p-6 mt-1 min-h-screen">
      <div className="flex justify-between items-center">
        <SearchBar value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onSubmit={handleSearchSubmit} placeholder="Search notes..." onFilterSelect={(option) => setFilterOption(option.value)} />

        <div className="hidden md:block">
          <Button icon={<CheckCircle className="w-4 h-4" />} onClick={() => navigate('/done')} className="ml-4">
            Done
          </Button>
        </div>
      </div>

      <div className="mt-4 md:hidden">
        <Button onClick={() => setShowModal(true)} icon={<Plus />} className="w-full">
          Add
        </Button>
      </div>

      <NotesList notes={currentNotes} onDetail={setDetailNote} onDone={markAsDone} onDelete={deleteNote} />

      <Pagination currentPage={currentPage} totalPages={totalPages} onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))} onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} />

      <div className="hidden md:block fixed bottom-10 right-6">
        <Button onClick={() => setShowModal(true)} icon={<Plus />} className="rounded-full p-4">
          Add
        </Button>
      </div>

      {showModal && (
        <AddModal
          onClose={() => setShowModal(false)}
          onSubmit={addNote}
          noteTitle={noteTitle}
          setNoteTitle={setNoteTitle}
          noteContent={noteContent}
          setNoteContent={setNoteContent}
          priority={priority}
          setPriority={setPriority}
          type={type}
          setType={setType}
        />
      )}

      {detailNote && <DetailModal note={detailNote} onClose={() => setDetailNote(null)} />}
    </div>
  );
};

/** Sub Components **/
const NotesList = ({ notes, onDetail, onDone, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    {notes.map((note) => (
      <NoteCard key={note.id} note={note} onDetail={() => onDetail(note)} onDone={() => onDone(note)} onDelete={() => onDelete(note.id)} />
    ))}
  </div>
);

const NoteCard = ({ note, onDetail, onDone, onDelete }) => (
  <div className="border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] p-4 bg-white dark:bg-black transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none break-words">
    <h3 className="text-xl font-bold text-black dark:text-white mb-2 break-words">{note.title}</h3>
    <p className="text-black dark:text-white mb-2 break-words">{note.content}</p>
    <p className="text-sm text-black dark:text-white mb-2">Priority: {note.priority}</p>
    <p className="text-sm text-black dark:text-white mb-4">Type: {note.type}</p>
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" icon={<Eye className="w-4 h-4" />} onClick={onDetail}>
        Detail
      </Button>
      {note.type !== 'Note' && (
        <Button variant="secondary" icon={<CheckCircle className="w-4 h-4" />} onClick={onDone}>
          Done
        </Button>
      )}
      <Button variant="secondary" icon={<Trash2 className="w-4 h-4" />} onClick={onDelete}>
        Delete
      </Button>
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-4">
      <Button onClick={onPrev} disabled={currentPage === 1} icon={<ChevronLeft />} />
      <span className="font-bold text-black dark:text-white">
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={onNext} disabled={currentPage === totalPages} icon={<ChevronRight />} />
    </div>
  );
};

const AddModal = ({ onClose, onSubmit, noteTitle, setNoteTitle, noteContent, setNoteContent, setPriority, setType }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Add New Note</h2>
      <Form onSubmit={onSubmit}>
        <FormInput label="Title" type="text" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} required />
        <FormTextarea label="Content" value={noteContent} onChange={(e) => setNoteContent(e.target.value)} required />

        <Dropdown
          label="Select Priority"
          options={[
            { value: 'high', label: 'High', icon: <AlertCircle className="w-4 h-4" /> },
            { value: 'medium', label: 'Medium', icon: <Circle className="w-4 h-4" /> },
            { value: 'low', label: 'Low', icon: <Check className="w-4 h-4" /> },
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
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </div>
  </div>
);

const DetailModal = ({ note, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-black border-2 border-black dark:border-white rounded-xl shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff] p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Detail</h2>
      <p className="text-black dark:text-white mb-2 font-bold">Title: {note.title}</p>
      <p className="text-black dark:text-white mb-2">Content: {note.content}</p>
      <p className="text-black dark:text-white mb-2">Priority: {note.priority}</p>
      <p className="text-black dark:text-white mb-4">Type: {note.type}</p>
      <Button variant="secondary" onClick={onClose}>
        Close
      </Button>
    </div>
  </div>
);

export default NotesPage;
