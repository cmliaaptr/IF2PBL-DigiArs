'use client'; // Gunakan directive ini karena ada state/interaktivitas seperti handleSubmit

import styles from './GlassmorphismLogin.module.css'; // Perhatikan perubahan path import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika Otentikasi Anda di sini
    alert('Tombol login diklik!');
  };

  return (
    <div className={styles.container}>
      {/* Background yang mirip dengan gambar */}
      <div className={styles.background}></div>

      {/* Kontainer Form Login dengan Efek Glassmorphism */}
      <div className={styles.loginCard}>
        <div className={styles.logo}>LOGO</div>
        <h2>Welcome Back</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Input Username */}
          <div className={styles.inputGroup}>
            {/* Ikon Pengguna */}
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
            <input type="text" placeholder="Username" required />
          </div>
          
          {/* Input Password */}
          <div className={styles.inputGroup}>
            {/* Ikon Kunci */}
            <FontAwesomeIcon icon={faLock} className={styles.icon} />
            <input type="password" placeholder="Password" required />
          </div>
          
          {/* Tombol Login */}
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}