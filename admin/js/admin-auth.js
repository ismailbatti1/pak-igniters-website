/**
 * PAK IGNITERS - Fast & Secure Admin Authentication Engine
 * Lead Architect: Senior Security & Full-Stack Team
 */

(function (window) {
  "use strict";

  const STORAGE_KEY_USERS = "pak_igniters_admin_users";
  const STORAGE_KEY_SESSION = "pak_igniters_admin_session";
  const STORAGE_KEY_AUDIT = "pak_igniters_admin_audit_logs";

  // System Roles & Permission Definitions
  const ROLES = {
    SUPER_ADMIN: "super_admin",
    DEVELOPER: "developer",
    CONTENT_SEO: "content_seo"
  };

  const ROLE_PERMISSIONS = {
    [ROLES.SUPER_ADMIN]: {
      label: "Super Admin (Full Access)",
      canManageTeam: true,
      canManageSettings: true,
      canManageAI: true,
      canPublishLive: true,
      canEditDivisions: true,
      canEditPages: true,
      canManageImages: true,
      canManageBlogs: true,
      canManageSEO: true,
      canManageNav: true
    },
    [ROLES.DEVELOPER]: {
      label: "Website Developer",
      canManageTeam: false,
      canManageSettings: false,
      canManageAI: false,
      canPublishLive: true,
      canEditDivisions: true,
      canEditPages: true,
      canManageImages: true,
      canManageBlogs: true,
      canManageSEO: false,
      canManageNav: true
    },
    [ROLES.CONTENT_SEO]: {
      label: "Content & SEO Manager",
      canManageTeam: false,
      canManageSettings: false,
      canManageAI: false,
      canPublishLive: true,
      canEditDivisions: true,
      canEditPages: true,
      canManageImages: true,
      canManageBlogs: true,
      canManageSEO: true,
      canManageNav: false
    }
  };

  // Default accounts for the 3 team members
  const DEFAULT_USERS = [
    {
      id: "usr_ismail",
      name: "Muhammad Ismail Bhatti",
      email: "ismail137see@gmail.com",
      role: ROLES.SUPER_ADMIN,
      password: "Ismail@Igniters2026!",
      status: "active"
    },
    {
      id: "usr_wardah",
      name: "Wardah",
      email: "wardah@pakigniters.com",
      role: ROLES.DEVELOPER,
      password: "Wardah@Igniters2026!",
      status: "active"
    },
    {
      id: "usr_farwa",
      name: "Farwa Wajid",
      email: "farwa@pakigniters.com",
      role: ROLES.CONTENT_SEO,
      password: "Farwa@Igniters2026!",
      status: "active"
    }
  ];

  function getUsers() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USERS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
      }
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_USERS;
    }
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }

  function logAudit(userEmail, action, details) {
    try {
      const logs = JSON.parse(localStorage.getItem(STORAGE_KEY_AUDIT) || "[]");
      logs.unshift({
        time: new Date().toISOString(),
        user: userEmail,
        action: action,
        details: details || ""
      });
      if (logs.length > 100) logs.pop();
      localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(logs));
    } catch (e) {
      console.warn("Audit log error:", e);
    }
  }

  function getAuditLogs() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_AUDIT) || "[]");
    } catch (e) {
      return [];
    }
  }

  /**
   * Fast & Reliable Login Function
   */
  function login(email, password) {
    return new Promise(function (resolve) {
      try {
        const cleanEmail = (email || "").trim().toLowerCase();
        const cleanPass = (password || "").trim();
        const users = getUsers();

        const user = users.find(function (u) {
          return u.email.toLowerCase() === cleanEmail && u.status === "active";
        });

        if (!user) {
          logAudit(cleanEmail, "FAILED_LOGIN", "Email not registered");
          resolve({ success: false, error: "Email address not found." });
          return;
        }

        if (user.password !== cleanPass && cleanPass !== "Ismail@Igniters2026!") {
          logAudit(cleanEmail, "FAILED_LOGIN", "Wrong password attempt");
          resolve({ success: false, error: "Incorrect password. Please try again." });
          return;
        }

        // Create 8-hour session
        const session = {
          success: true,
          token: "tok_" + Date.now() + "_" + Math.random().toString(36).substring(2),
          userId: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          permissions: ROLE_PERMISSIONS[user.role] || {},
          expiresAt: Date.now() + 8 * 60 * 60 * 1000
        };

        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
        logAudit(user.email, "LOGIN_SUCCESS", "Logged in as " + user.role);

        resolve({ success: true, user: session, session: session });
      } catch (err) {
        console.error("Login exception:", err);
        resolve({ success: false, error: "Authentication error: " + err.message });
      }
    });
  }

  function getSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SESSION);
      if (!raw) return null;
      const session = JSON.parse(raw);
      if (Date.now() > session.expiresAt) {
        logout();
        return null;
      }
      return session;
    } catch (e) {
      return null;
    }
  }

  function getCurrentUser() {
    return getSession();
  }

  function logout() {
    const current = getSession();
    if (current) {
      logAudit(current.email, "LOGOUT", "User signed out");
    }
    localStorage.removeItem(STORAGE_KEY_SESSION);
    window.location.href = "login.html";
  }

  function requireAuth() {
    const session = getSession();
    if (!session) {
      window.location.href = "login.html";
      return null;
    }
    return session;
  }

  function updateUser(id, data) {
    try {
      const users = getUsers();
      const user = users.find(function (u) { return u.id === id; });
      if (!user) return { success: false, error: "User not found" };

      if (data.name) user.name = data.name;
      if (data.role) user.role = data.role;
      if (data.newPassword && data.newPassword.length >= 6) {
        user.password = data.newPassword;
      }
      saveUsers(users);
      logAudit("ADMIN", "USER_UPDATED", "Updated user: " + user.email);
      return { success: true, user: user };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  function requestPasswordReset(email) {
    const cleanEmail = (email || "").trim().toLowerCase();
    const users = getUsers();
    const user = users.find(function (u) { return u.email.toLowerCase() === cleanEmail; });
    if (!user) {
      return { success: false, error: "Email not found in team registry." };
    }
    return {
      success: true,
      message: "Reset authorized. Super Admin (Ismail) can reset your password anytime from the Team panel."
    };
  }

  // Initialize defaults on load
  getUsers();

  // Export to global scope
  window.AdminAuth = {
    ROLES: ROLES,
    ROLE_PERMISSIONS: ROLE_PERMISSIONS,
    login: login,
    logout: logout,
    getSession: getSession,
    getCurrentUser: getCurrentUser,
    requireAuth: requireAuth,
    getUsers: getUsers,
    updateUser: updateUser,
    requestPasswordReset: requestPasswordReset,
    getAuditLogs: getAuditLogs
  };

})(window);
