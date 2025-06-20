package com.budget.backend.controller;

import com.budget.backend.model.Abonnement;
import com.budget.backend.repository.AbonnementRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
}
