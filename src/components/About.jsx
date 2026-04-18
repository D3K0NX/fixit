import React from 'react';
import { Link } from 'react-router-dom';

const values = [
  {
    title: 'Practical products',
    text: 'We focus on useful tools, workshop gear, and hardware that solve real repair and build jobs.',
  },
  {
    title: 'Fast buying flow',
    text: 'The storefront is designed to help customers move from discovery to M-Pesa checkout without confusion.',
  },
  {
    title: 'Local-first experience',
    text: 'Pricing, phone input, and payment expectations are shaped around how customers in Kenya actually buy.',
  },
];

const About = () => {
  const stored = localStorage.getItem('user');
  const userData = stored ? JSON.parse(stored) : null;
  const user = Array.isArray(userData) && userData.length > 0 ? userData[0] : userData;
  const isLoggedIn = !!user;

  return (
    <section className="py-4">
      <div className="container">
        <div className="hero-card mb-4">
          <span className="eyebrow">About Fixit</span>
          <div className="row g-4 align-items-center mt-1">
            <div className="col-lg-7">
              <h1 className="hero-title mb-3">
                Built for people who need
                <br />
                dependable tools fast.
              </h1>
              <p className="hero-copy mb-4">
                Fixit Kenya is a focused hardware storefront for technicians, workshop teams,
                builders, and everyday buyers who want clear product details, direct pricing,
                and a smoother checkout path.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link className="btn btn-primary px-4 py-3" to="/">
                  Browse products
                </Link>
                {!isLoggedIn && (
                  <Link className="btn btn-outline-dark px-4 py-3" to="/signup">
                    Create account
                  </Link>
                )}
              </div>
            </div>

            <div className="col-lg-5">
              <div className="hero-side glass-panel">
                <p className="section-kicker text-white-50 mb-2">What Fixit does</p>
                <h3 className="mb-3">A cleaner digital counter for hardware shopping</h3>
                <p className="mb-0 text-white-50">
                  Instead of a cluttered catalog, the platform keeps the journey simple:
                  discover a tool, review the essentials, and pay with M-Pesa.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-heading">
          <span className="section-kicker">Why it matters</span>
          <h2>The storefront is designed around clarity</h2>
          <p>
            The goal is straightforward: reduce friction for customers and make it easier to
            manage a modern hardware catalog online.
          </p>
        </div>

        <div className="feature-grid mb-4">
          {values.map((value) => (
            <div className="feature-card" key={value.title}>
              <span className="feature-icon">FX</span>
              <strong>{value.title}</strong>
              <p className="mb-0 text-muted">{value.text}</p>
            </div>
          ))}
        </div>

        <div className="glass-panel p-4">
          <div className="row g-4 align-items-center">
            <div className="col-lg-8">
              <span className="section-kicker">Why Choose Fixit</span>
              <h2 className="mt-2 mb-2">Your trusted hardware partner in Kenya</h2>
              <p className="mb-0 text-muted">
                We have served thousands of customers across Nairobi and beyond with quality tools,
                competitive pricing, and reliable delivery. Our team understands what builders and
                technicians need because we have been in the industry for over 10 years.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link className="btn btn-primary px-4 py-3" to="/">
                Start shopping
              </Link>
            </div>
          </div>
        </div>

        <div className="glass-panel p-4 mt-4">
          <div className="row g-4">
            <div className="col-lg-6">
              <span className="section-kicker">Contact Us</span>
              <h2 className="mt-2 mb-3">Get in touch</h2>
              <div className="d-flex flex-column gap-3">
                <div>
                  <strong>Location</strong>
                  <p className="mb-0 text-muted">Industrial Area, Nairobi</p>
                </div>
                <div>
                  <strong>Phone</strong>
                  <p className="mb-0 text-muted">+254 700 000 000</p>
                </div>
                <div>
                  <strong>Email</strong>
                  <p className="mb-0 text-muted">info@fixit.co.ke</p>
                </div>
                <div>
                  <strong>Working Hours</strong>
                  <p className="mb-0 text-muted">Mon - Sat: 8:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <span className="section-kicker">Our Stats</span>
              <h2 className="mt-2 mb-3">Numbers that speak</h2>
              <div className="hero-quickstats">
                <div className="stat-card">
                  <span className="stat-value">500+</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">24hr</span>
                  <span className="stat-label">Delivery</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">4.8</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
