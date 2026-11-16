// Shared JavaScript for SpineXpert Website

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });
  }

  // Condition Tabs (Home Page "Find how we treat it")
  const conditionTabs = document.querySelectorAll('.condition-tab-btn');
  const conditionPanels = document.querySelectorAll('.condition-tab-panel');

  if (conditionTabs.length > 0 && conditionPanels.length > 0) {
    conditionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        
        conditionTabs.forEach(t => t.classList.remove('active'));
        conditionPanels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const activePanel = document.getElementById(target);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  }

  // Clean URL Active Link Highlighter
  const currentPath = window.location.pathname.replace(/\/$/, '').split('/').pop() || '';
  document.querySelectorAll('.nav-link, .subnav-links a').forEach(link => {
    const href = (link.getAttribute('href') || '').replace(/\/$/, '').replace(/^\.\.\//, '').replace(/\.html$/, '');
    if ((currentPath === '' && (href === '' || href === '.' || href === 'index')) || (href !== '' && href === currentPath)) {
      link.classList.add('active');
    }
  });

  // Modal / Appointment Quick Booking
  const modal = document.getElementById('bookingModal');
  const openBtns = document.querySelectorAll('[data-open-booking]');
  const closeBtn = document.getElementById('closeModal');

  function openBookingModal() {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBookingModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modal) {
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openBookingModal();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeBookingModal();
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeBookingModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeBookingModal();
      }
    });

    // 10-Second Auto-Engagement Modal (Same mechanism as Revive Clinic)
    // Pops up after 10 seconds if not already dismissed in this session
    const hasTriggeredAutoModal = sessionStorage.getItem('spinexpert_modal_seen');
    if (!hasTriggeredAutoModal) {
      setTimeout(() => {
        // Only open if the user hasn't already opened it or interacted
        if (!modal.classList.contains('active')) {
          openBookingModal();
          sessionStorage.setItem('spinexpert_modal_seen', 'true');
        }
      }, 10000); // exactly 10 seconds
    }
  }

  // FAQ Accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length > 0) {
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-question');
      if (header) {
        header.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');
          // Close all others
          faqItems.forEach(other => other.classList.remove('active'));
          if (!isOpen) {
            item.classList.add('active');
          }
        });
      }
    });

    // FAQ Search & Filter
    const searchInput = document.getElementById('faqSearch');
    const filterPills = document.querySelectorAll('.filter-pill');

    function filterFaqs() {
      const query = (searchInput ? searchInput.value.toLowerCase().trim() : '');
      const activeFilter = document.querySelector('.filter-pill.active')?.getAttribute('data-filter') || 'all';

      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const category = item.getAttribute('data-category') || 'all';
        const matchesQuery = query === '' || text.includes(query);
        const matchesCategory = activeFilter === 'all' || category === activeFilter;

        if (matchesQuery && matchesCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', filterFaqs);
    }

    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        filterFaqs();
      });
    });
  }

  // Handle simple form submissions with user-friendly feedback
  const enquiryForms = document.querySelectorAll('.enquiry-form, #appointmentForm');
  enquiryForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      setTimeout(() => {
        submitBtn.textContent = 'Request Sent!';
        submitBtn.style.backgroundColor = '#056fa8';
        
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success-banner';
        successMsg.innerHTML = 'Thank you! We have received your details. Our clinical care team will call you back shortly.';
        form.prepend(successMsg);
        form.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          submitBtn.style.backgroundColor = '';
          if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
          }
        }, 3000);
      }, 700);
    });
  });

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      delay: 50
    });
  }
});

