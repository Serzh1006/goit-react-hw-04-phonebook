import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import Contacts from './contacts';
import PhoneBook from './phonebook';
import Filter from './filter';
import { save, load } from '../helpers/locale_storage';
import css from './app.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const getContact = load('newContact') || [];
    if (getContact.length === 0) {
      return;
    } else {
      this.setState({ contacts: getContact });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      save('newContact', this.state.contacts);
    }
  }

  filterByName = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = (nameUser, number) => {
    const findName = this.state.contacts.find(
      contact => contact.nameUser === nameUser
    );
    if (findName !== undefined) {
      alert(`${findName.nameUser} is already in contacts`);
      return;
    } else {
      const newContact = {
        id: nanoid(),
        nameUser,
        number,
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const normilizedFilter = filter.toLowerCase();
    const filterContacts = contacts.filter(contact =>
      contact.nameUser.toLowerCase().includes(normilizedFilter)
    );

    return (
      <div>
        <h2 className={css.phoneBook}>Phonebook</h2>
        <PhoneBook createContact={this.addContact} />
        <h2 className={css.contacts}>Contacts</h2>
        <Filter value={filter} onChangeFilter={this.filterByName} />
        {contacts.length !== 0 && (
          <Contacts
            contacts={filterContacts}
            onDeleteContact={this.deleteContact}
          />
        )}
      </div>
    );
  }
}
