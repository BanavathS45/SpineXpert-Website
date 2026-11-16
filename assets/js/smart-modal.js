/* Smart Engagement Modal Script for SpineXpert */

(function () {
  const smartModal = document.getElementById("smartEngagementModal");
  if (!smartModal) return;

  const closeBtn = document.getElementById("smartModalClose");
  const tabBtnBooking = document.getElementById("tabBtnBooking");
  const tabBtnCallback = document.getElementById("tabBtnCallback");
  const bookingTab = document.getElementById("bookingTab");
  const callbackTab = document.getElementById("callbackTab");
  const callbackForm = document.getElementById("smartCallbackForm");

  // Tab switching
  if (tabBtnBooking && tabBtnCallback) {
    tabBtnBooking.addEventListener("click", () => {
      tabBtnBooking.classList.add("active");
      tabBtnCallback.classList.remove("active");
      if (bookingTab) bookingTab.classList.add("active");
      if (callbackTab) callbackTab.classList.remove("active");
    });

    tabBtnCallback.addEventListener("click", () => {
      tabBtnCallback.classList.add("active");
      tabBtnBooking.classList.remove("active");
      if (callbackTab) callbackTab.classList.add("active");
      if (bookingTab) bookingTab.classList.remove("active");
    });
  }

  function openSmartModal() {
    if (smartModal) {
      smartModal.classList.add("is-open");
      smartModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeSmartModal() {
    if (smartModal) {
      smartModal.classList.remove("is-open");
      smartModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  window.openSmartModal = openSmartModal;
  window.closeSmartModal = closeSmartModal;

  // Close handlers
  if (closeBtn) closeBtn.addEventListener("click", closeSmartModal);

  smartModal.addEventListener("click", (e) => {
    if (e.target === smartModal) closeSmartModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && smartModal.classList.contains("is-open")) {
      closeSmartModal();
    }
  });

  // Request Callback via WhatsApp Submit
  if (callbackForm) {
    callbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = (document.getElementById("smartCallbackName").value || "").trim();
      const phone = (document.getElementById("smartCallbackPhone").value || "").trim();

      const msgLines = [
        "*Appointment / Callback Request - SpineXpert Habsiguda*",
        "",
        `👤 *Patient Name:* ${name || "Patient"}`,
        `📞 *Phone Number:* ${phone || "Not provided"}`,
        "",
        "Please call me back regarding spine care, physiotherapy, or osteopathy consultation."
      ];

      // Format WhatsApp query
      const waUrl = `https://wa.me/?text=${encodeURIComponent(msgLines.join("\n"))}`;
      window.open(waUrl, "_blank");
      closeSmartModal();
    });
  }

  // 10-Second Smart Timer triggered after page load OR after clicking any navigation link
  let smartTimer = null;
  function scheduleSmartModal() {
    if (smartTimer) clearTimeout(smartTimer);
    smartTimer = setTimeout(() => {
      // Check if modal is already open
      if (!smartModal.classList.contains("is-open")) {
        openSmartModal();
      }
    }, 10000); // exactly 10 seconds
  }

  // Bind clicks on navigation bar links to trigger modal 10 seconds later
  function attachNavTriggers() {
    const navLinks = document.querySelectorAll(".nav-link, .nav-links a, a.nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        scheduleSmartModal();
      });
    });
  }

  // Also bind all [data-open-booking] buttons to directly open the smart modal
  const openBookingBtns = document.querySelectorAll("[data-open-booking]");
  openBookingBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openSmartModal();
    });
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      attachNavTriggers();
      scheduleSmartModal();
    });
  } else {
    attachNavTriggers();
    scheduleSmartModal();
  }
})();

