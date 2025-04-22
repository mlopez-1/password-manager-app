package dev.mlopez.password_manager_backend.repository;

import dev.mlopez.password_manager_backend.entity.Password;
import dev.mlopez.password_manager_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PasswordRepository extends JpaRepository<Password, Long> {
    List<Password> findByUser(User user);
}