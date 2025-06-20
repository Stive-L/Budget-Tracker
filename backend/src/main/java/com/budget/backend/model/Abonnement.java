package com.budget.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Abonnement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private double montant;
    private LocalDate dateDebut;

    private String frequence; // "mensuel", "annuel", etc.

    public Abonnement() {}

    public Abonnement(String nom, double montant, LocalDate dateDebut, String frequence) {
        this.nom = nom;
        this.montant = montant;
        this.dateDebut = dateDebut;
        this.frequence = frequence;
    }

    // Getters et setters
    public Long getId() {
    return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public double getMontant() {
        return montant;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public String getFrequence() {
        return frequence;
    }

    public void setFrequence(String frequence) {
        this.frequence = frequence;
    }
}
