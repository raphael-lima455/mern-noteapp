import React from 'react'
import Navbar from '../components/Navbar';
import NoteModal from '../components/NoteModal'
import { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react';
import NoteCard from '../components/NoteCard';
import { toast } from 'react-toastify'


const Home = () => {

  const [isModelOpen, setModelOpen] = useState(false)
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(null)

  const [query, setQuery] = useState('')
  const [filteredNotes, setFilteredNotes] = useState(false)

  useEffect(() => {
    fetchNotes()
  }, [])


  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );


  }, [query, notes])

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('/api/note', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setNotes(data.note)
    } catch (error) {
      console.log(error)
    }
  }


  const closeModal = () => {
    setModelOpen(false)
  }

  const onEdit = (note) => {
    setCurrentNote(note)
    setModelOpen(true)
  }

  const addNote = async (title, description) => {

    try {
      const res = await axios.post('api/note/add', { title, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

      if (res.data.success) {
        toast.success('Note created!')
        fetchNotes()
        closeModal()
      }


    } catch (error) {
      console.log(error)
    }
  }

  const editNote = async (id, title, description) => {
    try {
      const res = await axios.put(`api/note/${id}`, { title, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

      if (res.data.success) {
        toast.success('Note updated!')
        fetchNotes()
        closeModal()
      }


    } catch (error) {
      console.log(error)
    }
  }

  const deleteNote = async (id) => {
    try {
      const res = await axios.delete(`api/note/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })

      if (res.data.success) {
        toast.success('Note deleted.')
        fetchNotes()

      }


    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar setQuery={setQuery} />

      <div className='px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
        {filteredNotes.length > 0 ? filteredNotes.map((note) => (
          <NoteCard
            key={note._id || note.id}
            note={note}
            onEdit={onEdit}
            deleteNote={deleteNote}
          />
        )) : <p>No notes</p>}
      </div>


      <button
        onClick={() => {
          setModelOpen(true);
          setCurrentNote(false)
        }}
        className='text-2xl fixed right-4 bottom-4 bg-teal-500 text-white font-bold p-4 rounded-full '>+</button>


      {isModelOpen && <NoteModal
        closeModal={closeModal}
        addNote={addNote}
        currentNote={currentNote}
        editNote={editNote}
      />}

    </div>



  )
}

export default Home;