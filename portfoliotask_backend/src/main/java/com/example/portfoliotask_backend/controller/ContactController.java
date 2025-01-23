package com.example.portfoliotask_backend.controller;


import com.example.portfoliotask_backend.dto.ContactRequest;
import com.example.portfoliotask_backend.model.Contact;
import com.example.portfoliotask_backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactService contactService;

    // Create a new contact (POST)
    @PostMapping
    public ResponseEntity<String> saveContact(@RequestBody ContactRequest contactRequest) {
        contactService.saveContact(contactRequest);
        return ResponseEntity.ok("Contact saved successfully!");
    }

    // Retrieve all contacts (GET)
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = contactService.getAllContacts();
        return ResponseEntity.ok(contacts);
    }

    // Retrieve a contact by ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        Contact contact = contactService.getContactById(id);
        return ResponseEntity.ok(contact);
    }

    // Delete a contact by ID (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteContactById(@PathVariable Long id) {
        contactService.deleteContactById(id);
        return ResponseEntity.ok("Contact deleted successfully!");
    }

    // Update a contact by ID (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<String> updateContact(@PathVariable Long id, @RequestBody ContactRequest contactRequest) {
        contactService.updateContact(id, contactRequest);
        return ResponseEntity.ok("Contact updated successfully!");
    }
}

