import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Contacts from './contacts';
import PhoneBook from './phonebook';
import Filter from './filter';
import { save, load } from '../helpers/locale_storage';
import css from './app.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const getContact = load('newContact') || [];
    if (getContact.length === 0) {
      return;
    } else {
      setContacts(getContact);
    }
  }, []);

  useEffect(() => {
    save('newContact', contacts);
  }, [contacts]);

  const filterByName = e => {
    setFilter(e.target.value);
  };

  const addContact = (nameUser, number) => {
    const findName = contacts.find(contact => contact.nameUser === nameUser);
    if (findName !== undefined) {
      alert(`${findName.nameUser} is already in contacts`);
      return;
    } else {
      const newContact = {
        id: nanoid(),
        nameUser,
        number,
      };
      setContacts(prevState => [...prevState, newContact]);
    }
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const normilizedFilter = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.nameUser.toLowerCase().includes(normilizedFilter)
  );

  return (
    <div>
      <h2 className={css.phoneBook}>Phonebook</h2>
      <PhoneBook createContact={addContact} />
      <h2 className={css.contacts}>Contacts</h2>
      <Filter value={filter} onChangeFilter={filterByName} />
      {contacts.length !== 0 && (
        <Contacts contacts={filterContacts} onDeleteContact={deleteContact} />
      )}
    </div>
  );
};
