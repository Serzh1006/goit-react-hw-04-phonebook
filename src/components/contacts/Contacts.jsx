import PropTypes from 'prop-types';
import css from './contacts.module.css';

const Contacts = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.contactsList}>
      {contacts.map(contact => {
        return (
          <li className={css.contactsItem} key={contact.id}>
            {contact.nameUser}: {contact.number}
            <button
              className={css.btnDelete}
              onClick={() => onDeleteContact(contact.id)}
              type="button"
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Contacts;

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nameUser: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func,
};
