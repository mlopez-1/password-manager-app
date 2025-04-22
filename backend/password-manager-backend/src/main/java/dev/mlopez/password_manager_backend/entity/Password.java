package dev.mlopez.password_manager_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Password {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String accountName;
    private String username;
    private String encryptedPassword;
    private String notes;
    private LocalDateTime updatedAt;
    
    @ManyToOne
    private User user;
    
    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}