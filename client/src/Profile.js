import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    bio: '',
    currentPassword: ''
  });
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false); 

  const [emailData, setEmailData] = useState({
    currentEmail: '',
    newEmail: '',
    currentPassword: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });

  const [deleteData, setDeleteData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
  if (!token) {
    setMessage({ text: 'Please login first', type: 'error' });
    setLoading(false);  // stop loading because we won't fetch anything
    return;
  }

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/profile/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(res.data);
      setFormData({
        firstName: res.data.firstName || '',
        lastName: res.data.lastName || '',
        address: res.data.address || '',
        phone: res.data.phone || '',
        bio: res.data.bio || '',
        currentPassword: ''
      });
     setEmailData({
  currentEmail: res.data.user?.email || '',
  newEmail: '',
  currentPassword:''
});
    } catch (err) {
      console.error(err);
      setMessage({ text: 'Failed to load profile', type: 'error' });
    } finally {
      setLoading(false);  // finished loading regardless of success or error
    }
  };

  fetchProfile();
}, [token]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.currentPassword) {
    return setMessage({ text: 'Current password is required', type: 'error' });
  }

  setSubmitLoading(true);
  

    const data = new FormData();
  for (const key in formData) data.append(key, formData[key]);
  if (avatar) data.append('avatar', avatar);

  try {
    const res = await axios.put('/api/profile/update', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    setProfile(res.data);
    setMessage({ text: 'Profile updated successfully', type: 'success' });
  } catch (err) {
    console.error(err);
    setMessage({ text: err.response?.data?.msg || 'Failed to update', type: 'error' });
  } finally {
    setSubmitLoading(false); // ensure loading state is reset in both success and error
  }
};
  const handleEmailChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/profile/change-email', emailData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ text: 'Email updated successfully', type: 'success' });
    } catch (err) {
      setMessage({ text: err.response?.data?.msg || 'Failed to update email', type: 'error' });
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/profile/change-password', passwordData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ text: 'Password updated successfully', type: 'success' });
    } catch (err) {
      setMessage({ text: err.response?.data?.msg || 'Failed to update password', type: 'error' });
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      await axios.delete('/api/profile/delete', {
  headers: { Authorization: `Bearer ${token}` },
  data: deleteData  // send the email & password in the body this way
});
      setMessage({ text: 'Account deleted successfully', type: 'success' });
    } catch (err) {
      setMessage({ text: err.response?.data?.msg || 'Failed to delete account', type: 'error' });
    }
  };

 if (loading) {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p>Loading profile...</p>
    </div>
  );
}

  return (
    <div className={styles.profileContainer}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <Link to="/profile" className={styles.logoLink}>
          <div className={styles.logo}>Findora</div>
        </Link>
        <div className={styles.navLinks}>
          <Link to="/home" className={styles.navLink}>Home</Link>
          <Link to="/how-it-works" className={styles.navLink}>How It Works</Link>
          <Link to="/features" className={styles.navLink}>Features</Link>
          <Link to="/pricing" className={styles.navLink}>Pricing</Link>
          <Link to="/contact" className={styles.navLink}>Contact</Link>
        </div>
      </nav>

      <div className={styles.pageContainer}>
        <h2 className={styles.sectionTitle}>My Profile</h2>
        
        {message && (
          <div className={`${styles.message} ${styles[message.type]}`}>
            {message.text}
          </div>
        )}

       {/* Tab Navigation */}
<div className={styles.tabContainer}>
  <button 
    className={`${styles.tabButton} ${activeTab === 'profile' ? styles.activeTab : ''}`}
    onClick={() => setActiveTab('profile')}
  >
    {/* SVG and text */}
    Profile
  </button>
  <button 
    className={`${styles.tabButton} ${activeTab === 'email' ? styles.activeTab : ''}`}
    onClick={() => setActiveTab('email')}
  >
    {/* SVG and text */}
    Email
  </button>
  <button 
    className={`${styles.tabButton} ${activeTab === 'password' ? styles.activeTab : ''}`}
    onClick={() => setActiveTab('password')}
  >
    {/* SVG and text */}
    Password
  </button>
  <button 
    className={`${styles.tabButton} ${activeTab === 'delete' ? styles.activeTab : ''}`}
    onClick={() => setActiveTab('delete')}
  >
    {/* SVG and text */}
     Danger Zone
  </button>


</div>


        {/* Tab Content */}
        <div className={styles.tabContent}>
          {/* Profile Info Tab */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className={styles.formSection}>
              <h3>Profile Information</h3>
              
              <div className={styles.avatarContainer}>
                {profile?.avatar ? (
                  <img 
                     src={`http://localhost:5000/uploads/${profile.avatar}?t=${Date.now()}`} 
                    alt="Profile" 
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
                <label className={styles.fileInputLabel}>
                  Change Avatar
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className={styles.fileInput}
                  />
                </label>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>First Name</label>
                <input 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Last Name</label>
                <input 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Address</label>
                <input 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Phone</label>
                <input 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Bio</label>
                <textarea 
                  name="bio" 
                  value={formData.bio} 
                  onChange={handleChange} 
                  className={`${styles.inputField} ${styles.textarea}`}
                  rows="4"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Current Password</label>
                <input 
                  name="currentPassword" 
                  type="password" 
                  value={formData.currentPassword} 
                  onChange={handleChange} 
                  className={styles.inputField}
                  required 
                />
                <p className={styles.inputHint}>Required to save changes</p>
              </div>

              <button type="submit" className={styles.primaryButton}>
                Update Profile
              </button>
            </form>
          )}

          {/* Change Email Tab */}
          {activeTab === 'email' && (
            <form onSubmit={handleEmailChange} className={styles.formSection}>
              <h3>Change Email Address</h3>
              
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Current Email</label>
                <input 
                  type="email" 
                  value={emailData.currentEmail}
                  readOnly
                  className={`${styles.inputField} ${styles.disabledInput}`}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>New Email</label>
                <input 
                  type="email" 
                  placeholder="Enter new email"
                  value={emailData.newEmail}
                  onChange={(e) => setEmailData({ ...emailData, newEmail: e.target.value })}
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Current Password</label>
               <input 
  type="password" 
  placeholder="Enter your password"
  value={emailData.currentPassword}
  onChange={(e) => setEmailData({ ...emailData, currentPassword: e.target.value })}
  className={styles.inputField}
/>
                <p className={styles.inputHint}>Required to change email</p>
              </div>

              <button type="submit" className={styles.primaryButton}>
                Update Email
              </button>
            </form>
          )}

          {/* Change Password Tab */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordChange} className={styles.formSection}>
              <h3>Change Password</h3>
              
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Current Password</label>
                <input 
                  type="password" 
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>New Password</label>
                <input 
                  type="password" 
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className={styles.inputField}
                />
                <p className={styles.inputHint}>Minimum 8 characters</p>
              </div>

              <button type="submit" className={styles.primaryButton}>
                Update Password
              </button>
            </form>
          )}

          {/* Delete Account Tab */}
          {activeTab === 'delete' && (
            <form onSubmit={handleDeleteAccount} className={styles.formSection}>
              <h3>Delete Account</h3>
              <div className={styles.warningBox}>
                <svg className={styles.warningIcon} viewBox="0 0 24 24">
                  <path d="M12 2L1 21h22L12 2zm0 3.5L18.5 19h-13L12 5.5zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
                </svg>
                <p>This action cannot be undone. All your data will be permanently deleted.</p>
              </div>
              
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Email</label>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={deleteData.email}
                  onChange={(e) => setDeleteData({ ...deleteData, email: e.target.value })}
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  value={deleteData.password}
                  onChange={(e) => setDeleteData({ ...deleteData, password: e.target.value })}
                  className={styles.inputField}
                />
              </div>

              <button type="submit" className={styles.deleteButton}>
                Delete My Account
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <div className={styles.logo}>Findora</div>
            <p className={styles.footerTagline}>Do less. Achieve more.</p>
          </div>
          
          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>Product</h4>
              <Link to="/features" className={styles.footerLink}>Features</Link>
              <Link to="/pricing" className={styles.footerLink}>Pricing</Link>
              <Link to="/demo" className={styles.footerLink}>Demo</Link>
            </div>
            
            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>Company</h4>
              <Link to="/about" className={styles.footerLink}>About</Link>
              <Link to="/contact" className={styles.footerLink}>Contact</Link>
              <Link to="/faq" className={styles.footerLink}>FAQ</Link>
            </div>
    
            <div className={styles.footerColumn}>
              <h4 className={styles.footerHeading}>Legal</h4>
              <Link to="/privacy-policy" className={styles.footerLink}>Privacy Policy</Link>
              <Link to="/terms-of-service" className={styles.footerLink}>Terms of Service</Link>
              <Link to="/cookies-policy" className={styles.footerLink}>Cookies Policy</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} Findora. All rights reserved.</p>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink} aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4H20L14 10L21 20H15.5L11 13.5L6 20H2L8.5 12.5L2 4H8L12 10L16 4ZM15 18H16.5L5.5 6H4L15 18Z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" className={styles.socialLink} aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 9H2V21H6V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;