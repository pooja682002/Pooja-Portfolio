package com.example.portfoliotask_backend.service;


import com.example.portfoliotask_backend.dto.ContactRequest;
import com.example.portfoliotask_backend.model.Contact;
import com.example.portfoliotask_backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    // Save a new contact
    public void saveContact(ContactRequest contactRequest) {
        Contact contact = new Contact();
        contact.setName(contactRequest.getName());
        contact.setEmail(contactRequest.getEmail());
        contact.setMessage(contactRequest.getMessage());
        contactRepository.save(contact);
    }

    // Retrieve all contacts
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    // Retrieve a contact by ID
    public Contact getContactById(Long id) {
        Optional<Contact> contact = contactRepository.findById(id);
        if (contact.isPresent()) {
            return contact.get();
        } else {
            throw new RuntimeException("Contact not found with id: " + id);
        }
    }

    // Delete a contact by ID
    public void deleteContactById(Long id) {
        if (contactRepository.existsById(id)) {
            contactRepository.deleteById(id);
        } else {
            throw new RuntimeException("Contact not found with id: " + id);
        }
    }

    // Update a contact by ID
    public void updateContact(Long id, ContactRequest contactRequest) {
        Optional<Contact> existingContact = contactRepository.findById(id);
        if (existingContact.isPresent()) {
            Contact contact = existingContact.get();
            contact.setName(contactRequest.getName());
            contact.setEmail(contactRequest.getEmail());
            contact.setMessage(contactRequest.getMessage());
            contactRepository.save(contact);
        } else {
            throw new RuntimeException("Contact not found with id: " + id);
        }
    }
}
