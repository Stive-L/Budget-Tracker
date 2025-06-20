package com.budget.backend.controller;

import com.budget.backend.model.Abonnement;
import com.budget.backend.repository.AbonnementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/abonnements")
public class AbonnementController {

    @Autowired
    private AbonnementRepository abonnementRepository;

    @GetMapping
    public List<Abonnement> getAll() {
        return abonnementRepository.findAll();
    }

    @PostMapping
    public Abonnement create(@RequestBody Abonnement abonnement) {
        return abonnementRepository.save(abonnement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Abonnement> update(@PathVariable Long id, @RequestBody Abonnement newAbonnement) {
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
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (abonnementRepository.existsById(id)) {
            abonnementRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // 204
        } else {
            return ResponseEntity.notFound().build(); // 404
        }
    }
}
