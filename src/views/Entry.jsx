import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEntries } from '../context/PlannerContext';
import { useForm } from '../hooks/useForm';

import styles from './Entry.css';

export default function Entry() {
  const { id } = useParams();
  const { entries, getEntry, updateEntry } = useEntries();
  const { formState, handleFormChange } = useForm();

  const [entry, setEntry] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setEntry(getEntry(id));
  }, [id, entries.length]);

  const handleSubmitEdit = () => {
    setEdit(true);
  };

  const handleSubmitSave = () => {
    setEdit(false);
    updateEntry(formState);
  };

  return (
    <>
      <Link to="/entries" className={styles.backButton}>
        &laquo; Back to Planner
      </Link>
      {edit ? (
        <article className={styles.entry}>
          <input
            type="text"
            name="title"
            placeholder="Plan something"
            value={entry?.title}
            onChange={handleFormChange}
            className={styles.input}
          />
          <p>Due: {entry?.date}</p>
          <textarea
            name="content"
            placeholder="A brief description of what you're planning"
            value={entry?.content}
            onChange={handleFormChange}
            className={styles.content}
          />
          <button onClick={handleSubmitSave}>Save</button>
        </article>
      ) : (
        <>
          <article className={styles.entry}>
            <h1>{entry?.title}</h1>
            <p>Due: {entry?.date}</p>
            <p>{entry?.content}</p>
          </article>
          <button className={styles.backButton} onClick={handleSubmitEdit}>
            Edit
          </button>
        </>
      )}
    </>
  );
}
