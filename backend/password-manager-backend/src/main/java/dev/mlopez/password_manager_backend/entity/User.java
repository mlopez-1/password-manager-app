package dev.mlopez.password_manager_backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String username;
    private String masterPasswordHash;
    private byte[] salt;
    private byte[] verificationToken;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Password> passwords;
}