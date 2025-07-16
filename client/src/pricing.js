import React from 'react';
import { Link } from 'react-router-dom';

function Pricing() {
  return (
    <div style={styles.pageContainer}>
      {/* Background elements */}
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <Link to="/pricing" style={styles.logoLink}>
          <div style={styles.logo}>Findora</div>
        </Link>
        <div style={styles.navLinks}>
          <Link to="/home" style={styles.navLink}>Home</Link>
          <Link to="/how-it-works" style={styles.navLink}>How It Works</Link>
          <Link to="/features" style={styles.navLink}>Features</Link>
          <Link to="/about" style={styles.navLink}>About</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
        </div>
      </nav>

      {/* Pricing Section */}
      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>AI-Powered Product Search Plans</h2>
          <p style={styles.sectionSubtitle}>
            Choose a plan to let our AI find the best products online — complete with images, prices, descriptions, and more.
          </p>
        </div>

        <div style={styles.pricingGrid}>
          {/* Basic Plan */}
          <div style={styles.pricingCard}>
            <div style={styles.pricingHeader}>
              <h3 style={styles.pricingTitle}>Basic</h3>
              <p style={styles.pricingDescription}>Great for casual shoppers</p>
            </div>
            <div style={styles.pricingPrice}>
              <span style={styles.price}>$19</span>
              <span style={styles.perMonth}>/month</span>
            </div>
            <ul style={styles.featureList}>
              <li style={styles.featureItem}>✓ 100 product searches</li>
              <li style={styles.featureItem}>✓ Basic results (image, price, description)</li>
              <li style={styles.featureItem}>✓ Email support</li>
              <li style={styles.featureItem}>✗ AI ranking and comparisons</li>
            </ul>
            <Link to="/signup" style={styles.secondaryButton}>Get Started</Link>
          </div>

          {/* Pro Plan */}
          <div style={styles.pricingCard}>
            <div style={styles.pricingHeader}>
              <h3 style={styles.pricingTitle}>Pro</h3>
              <p style={styles.pricingDescription}>Ideal for frequent users</p>
              <div style={styles.popularBadge}>Most Popular</div>
            </div>
            <div style={styles.pricingPrice}>
              <span style={styles.price}>$49</span>
              <span style={styles.perMonth}>/month</span>
            </div>
            <ul style={styles.featureList}>
              <li style={styles.featureItem}>✓ 1,000 product searches</li>
              <li style={styles.featureItem}>✓ Full product details (image, price, rating, etc.)</li>
              <li style={styles.featureItem}>✓ AI-powered relevance and sorting</li>
              <li style={styles.featureItem}>✓ Basic AI features</li>
            </ul>
            <Link to="/signup" style={styles.primaryButton}>Get Started</Link>
          </div>

          {/* Ultra-Premium Plan */}
          <div style={styles.pricingCard}>
            <div style={styles.premiumHeader}>
              <h3 style={styles.premiumTitle}>Ultra-Premium</h3>
              <p style={styles.premiumDescription}>Advanced tools for power users</p>
              <div style={styles.premiumBadge}>Best Value</div>
            </div>
            <div style={styles.pricingPrice}>
              <span style={styles.price}>$149</span>
              <span style={styles.perMonth}>/month</span>
            </div>
            <ul style={styles.featureList}>
              <li style={styles.featureItem}>✓ Unlimited product searches</li>
              <li style={styles.featureItem}>✓ Complete product data (price, images, rating, availability)</li>
              <li style={styles.featureItem}>✓ 24/7 dedicated support</li>
              <li style={styles.featureItem}>✓ AI comparison and smart filtering</li>
              <li style={styles.featureItem}>✓ Custom integrations</li>
              <li style={styles.featureItem}>✓ Personal AI search assistant</li>
            </ul>
            <Link to="/contact" style={styles.premiumButton}>Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Need a custom AI search solution?</h2>
          <p style={styles.ctaText}>We build personalized plans for businesses that need high-volume product search with tailored insights</p>
          <div style={styles.ctaButtons}>
            <Link to="/contact" style={styles.ctaSecondaryButton}>Request Demo</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerLogo}>
            <div style={styles.logo}>Findora</div>
            <p style={styles.footerTagline}>Smart product discovery through AI</p>
          </div>
          <div style={styles.footerLinks}>
           <div style={styles.footerColumn}>
                         <h4 style={styles.footerHeading}>Product</h4>
                         <Link to="/features" style={styles.footerLink}>Features</Link>
                         <Link to="/pricing" style={styles.footerLink}>Pricing</Link>
                         <Link to="/demo" style={styles.footerLink}>Demo</Link>
                       </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Company</h4>
              <Link to="/about" style={styles.footerLink}>About</Link>
              <Link to="/contact" style={styles.footerLink}>Contact</Link>
              <Link to="/faq" style={styles.footerLink}>FAQ</Link>
            </div>

                     

                        
                <div style={styles.footerColumn}>
                          <h4 style={styles.footerHeading}>Legal</h4>
                          <Link to="/privacy-policy" style={styles.footerLink}>Privacy Policy</Link>
                          <Link to="/terms-of-service" style={styles.footerLink}>Terms of Service</Link>
                          <Link to="/cookies-policy" style={styles.footerLink}>Cookies Policy</Link>
            </div>



          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© {new Date().getFullYear()} Findora. All rights reserved.</p>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLink} aria-label="Twitter">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4H20L14 10L21 20H15.5L11 13.5L6 20H2L8.5 12.5L2 4H8L12 10L16 4ZM15 18H16.5L5.5 6H4L15 18Z" 
          stroke="#4B5563" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"/>
  </svg>
            </a>
            <a href="#" style={styles.socialLink} aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="#" style={styles.socialLink} aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 9H2V21H6V9Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}


const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Inter', sans-serif"
  },
  backgroundCircle1: {
    position: 'absolute',
    width: '800px',
    height: '800px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(156,163,175,0.1) 0%, rgba(156,163,175,0) 70%)',
    top: '-400px',
    right: '-400px',
    zIndex: 0
  },
  backgroundCircle2: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(156,163,175,0.1) 0%, rgba(156,163,175,0) 70%)',
    bottom: '-300px',
    left: '-300px',
    zIndex: 0
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
  },
  logoLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  logo: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1F2937',
    background: 'linear-gradient(90deg, #4B5563, #1F2937)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  navLink: {
    color: '#4B5563',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '15px',
    transition: 'color 0.2s'
  },
  section: {
    padding: '80px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '60px',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  sectionTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '16px'
  },
  sectionSubtitle: {
    fontSize: '18px',
    color: '#6B7280',
    lineHeight: '1.6'
  },
  pricingGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    maxWidth: '1100px',
    margin: '0 auto'
  },
  pricingCard: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-10px)'
    }
  },
  pricingHeader: {
    marginBottom: '20px',
    position: 'relative'
  },
  premiumHeader: {
    marginBottom: '20px',
    position: 'relative',
    backgroundColor: '#4B5563',
    color: 'white',
    padding: '20px',
    margin: '-40px -40px 20px -40px',
    borderRadius: '12px 12px 0 0'
  },
  pricingTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px'
  },
  premiumTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '8px'
  },
  pricingDescription: {
    fontSize: '16px',
    color: '#6B7280',
    marginBottom: '16px'
  },
  premiumDescription: {
    fontSize: '16px',
    color: '#E5E7EB',
    marginBottom: '16px'
  },
  pricingPrice: {
    marginBottom: '30px'
  },
  price: {
    fontSize: '48px',
    fontWeight: '800',
    color: '#111827'
  },
  perMonth: {
    fontSize: '16px',
    color: '#6B7280'
  },
  featureList: {
    flex: 1,
    marginBottom: '30px',
    padding: 0,
    listStyle: 'none'
  },
  featureItem: {
    padding: '12px 0',
    borderBottom: '1px solid #E5E7EB',
    color: '#4B5563',
    fontSize: '16px'
  },
   socialLinks: {
    display: 'flex',
    gap: '16px'
  },
  socialLink: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#F3F4F6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  },
  popularBadge: {
    position: 'absolute',
    top: '-15px',
    right: '0',
    backgroundColor: '#4B5563',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  premiumBadge: {
    position: 'absolute',
    top: '-15px',
    right: '20px',
    backgroundColor: '#f59e0b',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  primaryButton: {
    backgroundColor: '#4B5563',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    display: 'inline-block',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#374151'
    }
  },
  secondaryButton: {
    backgroundColor: 'white',
    color: '#4B5563',
    padding: '14px 28px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    border: '1px solid #E5E7EB',
    display: 'inline-block',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#F3F4F6'
    }
  },
  premiumButton: {
    backgroundColor: '#f59e0b',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.2s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#d97706'
    }
  },
  ctaSection: {
    backgroundColor: '#4B5563',
    padding: '80px 40px',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1
  },
  ctaContent: {
    maxWidth: '700px',
    margin: '0 auto'
  },
  ctaTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '16px'
  },
  ctaText: {
    fontSize: '18px',
    color: '#E5E7EB',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px'
  },
  ctaSecondaryButton: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'all 0.2s',
    border: '1px solid #9CA3AF',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)'
    }
  },
  footer: {
    backgroundColor: 'white',
    padding: '60px 40px 0',
    borderTop: '1px solid #E5E7EB'
  },
  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
    paddingBottom: '60px'
  },
  footerLogo: {
    flex: 1,
    minWidth: '200px'
  },
  footerTagline: {
    fontSize: '14px',
    color: '#6B7280',
    marginTop: '12px'
  },
  footerLinks: {
    display: 'flex',
    gap: '60px',
    flexWrap: 'wrap'
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    minWidth: '150px'
  },
  footerHeading: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px'
  },
  footerLink: {
    fontSize: '14px',
    color: '#6B7280',
    textDecoration: 'none',
    transition: 'color 0.2s',
    '&:hover': {
      color: '#4B5563'
    }
  },
  footerBottom: {
    borderTop: '1px solid #E5E7EB',
    padding: '24px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  copyright: {
    fontSize: '14px',
    color: '#6B7280'
  }
};

export default Pricing;