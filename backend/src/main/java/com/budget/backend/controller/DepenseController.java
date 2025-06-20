package com.budget.backend.controller;

import com.budget.backend.model.Depense;
import com.budget.backend.repository.DepenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @DeleteMapping("/{id}")
    public void deleteDepense(@PathVariable Long id) {
        depenseRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Abonnement> updateAbonnement(@PathVariable Long id, @RequestBody Abonnement newAbonnement) {
    return abonnementRepository.findById(id)
        .map(abonnement -> {
            abonnement.setNom(newAbonnement.getNom());
            abonnement.setMontant(newAbonnement.getMontant());
            abonnement.setDateDebut(newAbonnement.getDateDebut());
            abonnement.setFrequence(newAbonnement.getFrequence());
            return ResponseEntity.ok(abonnementRepository.save(abonnement));
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAbonnement(@PathVariable Long id) {
    if (abonnementRepository.existsById(id)) {
        abonnementRepository.deleteById(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    } else {
        return ResponseEntity.notFound().build(); // 404
    }
    }
}
