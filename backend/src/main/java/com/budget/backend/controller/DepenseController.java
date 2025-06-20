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
}
