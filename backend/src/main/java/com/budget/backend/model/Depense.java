package com.budget.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Depense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String categorie;
    private String description;
    private double montant;

    private LocalDate date;

    public Depense() {}

    public Depense(String categorie, double montant, LocalDate date, String description) {
        this.categorie = categorie;
        this.montant = montant;

        this.date = date;
        this.description = description;
    }

    // Getters et setters

    public Long getId() {
        return id;
    }

    public String getCategorie() {
        return categorie;
    }

    public void setCategorie(String categorie) {
        this.categorie = categorie;
    }

    public double getMontant() {
        return montant;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setDescription(String description){
        this.description = description;
    }

    public String getDescription(){
        return description;
    }
}
