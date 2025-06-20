package com.budget.backend.repository;

import com.budget.backend.model.Abonnement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface AbonnementRepository extends JpaRepository<Abonnement, Long> {
    List<Abonnement> findByDateDebutLessThanEqual(LocalDate date);

}