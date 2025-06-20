package com.budget.backend.controller;

import com.budget.backend.model.Depense;
import com.budget.backend.repository.DepenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/depenses")
public class DepenseController {

    @Autowired
    private DepenseRepository depenseRepository;

    // GET /api/depenses
    @GetMapping
    public List<Depense> getAll() {
        return depenseRepository.findAll();
    }

    // POST /api/depenses
    @PostMapping
    public Depense createDepense(@RequestBody Depense depense) {
        return depenseRepository.save(depense);
    }

    // PUT /api/depenses/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Depense> updateDepense(@PathVariable Long id, @RequestBody Depense newDepense) {
        return depenseRepository.findById(id)
            .map(depense -> {
                depense.setCategorie(newDepense.getCategorie());
                depense.setMontant(newDepense.getMontant());
                depense.setDate(newDepense.getDate());
                return ResponseEntity.ok(depenseRepository.save(depense));
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /api/depenses/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepense(@PathVariable Long id) {
        if (depenseRepository.existsById(id)) {
            depenseRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
