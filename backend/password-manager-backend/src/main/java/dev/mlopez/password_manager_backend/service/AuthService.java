package dev.mlopez.password_manager_backend.service;

import dev.mlopez.password_manager_backend.entity.User;
import dev.mlopez.password_manager_backend.repository.UserRepository;
import dev.mlopez.password_manager_backend.util.EncryptionUtil;
import lombok.RequiredArgsConstructor;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecureRandom random = new SecureRandom();

    @EventListener(ApplicationReadyEvent.class)
        public void createTestUser() {
            if (userRepository.count() == 0) {
                try {
                    byte[] salt = new byte[16];
                    random.nextBytes(salt);
                    
                    String testUsername = "test";
                    String testPassword = "test123";
                    
                    SecretKey key = EncryptionUtil.deriveKey(testPassword, salt);
                    Mac mac = Mac.getInstance("HmacSHA256");
                    mac.init(new SecretKeySpec(key.getEncoded(), "HmacSHA256"));
                    byte[] token = mac.doFinal("verification".getBytes());
                    
                    User testUser = new User();
                    testUser.setUsername(testUsername);
                    testUser.setSalt(salt);
                    testUser.setVerificationToken(token);
                    testUser.setMasterPasswordHash(passwordEncoder.encode(testPassword));
                    
                    userRepository.save(testUser);
                    System.out.println("Created test user: username=test, password=test123");
                } catch (Exception e) {
                    System.err.println("Failed to create test user: " + e.getMessage());
                }
            }
        }

    public User register(String username, String masterPassword) {
        byte[] salt = new byte[16];
        random.nextBytes(salt);

        try {
            SecretKey key = EncryptionUtil.deriveKey(masterPassword, salt);
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(key.getEncoded(), "HmacSHA256"));
            byte[] token = mac.doFinal("verification".getBytes());
            
            User user = new User();
            user.setUsername(username);
            user.setSalt(salt);
            user.setVerificationToken(token);
            user.setMasterPasswordHash(passwordEncoder.encode(masterPassword));
            
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Registration failed", e);
        }
    }
}