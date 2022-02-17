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
    updateEntry(entry);
  };

  const handleChange = ({ target }) => {
    const { name } = target;
    setEntry({ ...entry, [name]: target.value });
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
            value={entry.title}
            onChange={handleChange}
            className={styles.input}
          />
          <p>Due: {entry?.date}</p>
          <textarea
            name="content"
            value={entry.content}
            onChange={handleChange}
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
