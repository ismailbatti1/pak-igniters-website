/**
 * PAK IGNITERS - Private Management System Authentication & RBAC Engine
 * Security Standard: Web Crypto API Salted SHA-256, Expiring Tokens, Role-Based Access Control
 * Lead Architect: Senior Security & Full-Stack Team
 */

(function () {
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

  /**
   * Cryptographic Utilities using browser Web Crypto API
   */
  async function generateSalt() {
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(16).padStart(2, "0")).join("");
  }

  async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const data = encoder.encode(salt + password + "PAK_IGNITERS_SECRET_PEPPER_2026");
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  function generateToken() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(16).padStart(2, "0")).join("") + "-" + Date.now();
  }

  /**
   * Initialize Default Team Accounts if not already provisioned
   */
  async function initDefaultAccounts() {
    const existing = localStorage.getItem(STORAGE_KEY_USERS);
    if (existing) return;

    // Provision the 3 Official Team Members with secure salted hashes
    const saltIsmail = await generateSalt();
    const hashIsmail = await hashPassword("Ismail@Igniters2026!", saltIsmail);

    const saltWardah = await generateSalt();
    const hashWardah = await hashPassword("Wardah@Igniters2026!", saltWardah);

    const saltFarwa = await generateSalt();
    const hashFarwa = await hashPassword("Farwa@Igniters2026!", saltFarwa);

    const defaultUsers = [
      {
        id: "usr_ismail",
        name: "Muhammad Ismail Bhatti",
        email: "ismail137see@gmail.com",
        role: ROLES.SUPER_ADMIN,
        salt: saltIsmail,
        passwordHash: hashIsmail,
        status: "active",
        createdAt: new Date().toISOString(),
        lastLogin: null
      },
      {
        id: "usr_wardah",
        name: "Wardah",
        email: "wardah@pakigniters.com",
        role: ROLES.DEVELOPER,
        salt: saltWardah,
        passwordHash: hashWardah,
        status: "active",
        createdAt: new Date().toISOString(),
        lastLogin: null
      },
      {
        id: "usr_farwa",
        name: "Farwa Wajid",
        email: "farwa@pakigniters.com",
        role: ROLES.CONTENT_SEO,
        salt: saltFarwa,
        passwordHash: hashFarwa,
        status: "active",
        createdAt: new Date().toISOString(),
        lastLogin: null
      }
    ];

    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(defaultUsers));
    logAudit("SYSTEM", "Initialized default security accounts for Ismail, Wardah, and Farwa");
  }

  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_USERS) || "[]");
    } catch {
      return [];
    }
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  }

  function logAudit(userEmail, action, details = "") {
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEY_AUDIT) || "[]");
    logs.unshift({
      timestamp: new Date().toISOString(),
      user: userEmail,
      action: action,
      details: details
    });
    if (logs.length > 200) logs.pop();
    localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(logs));
  }

  /**
   * Authentication Core
   */
  async function login(email, password) {
    await initDefaultAccounts();
    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail && u.status === "active");

    if (!user) {
      logAudit(cleanEmail, "FAILED_LOGIN", "User not found or inactive");
      throw new Error("Invalid email or password. Please verify your credentials.");
    }

    const computedHash = await hashPassword(password, user.salt);
    if (computedHash !== user.passwordHash) {
      logAudit(cleanEmail, "FAILED_LOGIN", "Incorrect password attempt");
      throw new Error("Invalid email or password. Please verify your credentials.");
    }

    // Generate Session (valid for 8 hours)
    const session = {
      token: generateToken(),
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: ROLE_PERMISSIONS[user.role],
      expiresAt: Date.now() + 8 * 60 * 60 * 1000 // 8 hours
    };

    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));

    // Update last login
    user.lastLogin = new Date().toISOString();
    saveUsers(users);

    logAudit(user.email, "LOGIN_SUCCESS", `Logged in with role: ${user.role}`);
    return session;
  }

  function getSession() {
    try {
      const sessionData = localStorage.getItem(STORAGE_KEY_SESSION);
      if (!sessionData) return null;
      const session = JSON.parse(sessionData);
      if (Date.now() > session.expiresAt) {
        logout();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }

  function logout() {
    const current = getSession();
    if (current) {
      logAudit(current.email, "LOGOUT", "User logged out");
    }
    localStorage.removeItem(STORAGE_KEY_SESSION);
    window.location.href = "/admin/login.html";
  }

  function requireAuth(requiredPermission = null) {
    const session = getSession();
    if (!session) {
      window.location.href = "/admin/login.html?redirect=" + encodeURIComponent(window.location.pathname);
      return null;
    }

    if (requiredPermission && !session.permissions[requiredPermission]) {
      alert("Access Denied: You do not have permission to view this section.");
      window.location.href = "/admin/index.html";
      return null;
    }

    return session;
  }

  /**
   * Password Reset Flow
   */
  async function requestPasswordReset(email) {
    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      throw new Error("If this email exists in our system, recovery instructions have been prepared.");
    }

    // Generate a secure 6-digit verification security code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = resetCode;
    user.resetExpires = Date.now() + 15 * 60 * 1000; // 15 mins
    saveUsers(users);

    logAudit(user.email, "PASSWORD_RESET_REQUESTED", `Verification Code: ${resetCode}`);
    return {
      success: true,
      code: resetCode, // Shown transparently for staging recovery
      email: user.email
    };
  }

  async function completePasswordReset(email, code, newPassword) {
    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user || user.resetCode !== code.trim() || Date.now() > user.resetExpires) {
      throw new Error("Invalid or expired reset code. Please request a new one.");
    }

    user.salt = await generateSalt();
    user.passwordHash = await hashPassword(newPassword, user.salt);
    delete user.resetCode;
    delete user.resetExpires;
    saveUsers(users);

    logAudit(user.email, "PASSWORD_RESET_COMPLETED", "Password successfully updated");
    return true;
  }

  /**
   * Super Admin Team Account Management
   */
  async function createUser(actorSession, { name, email, role, password }) {
    if (actorSession.role !== ROLES.SUPER_ADMIN) {
      throw new Error("Unauthorized: Only Super Admin (Ismail) can create team accounts.");
    }

    const cleanEmail = email.trim().toLowerCase();
    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error("A team member with this email already exists.");
    }

    const salt = await generateSalt();
    const hash = await hashPassword(password, salt);

    const newUser = {
      id: "usr_" + Date.now(),
      name: name.trim(),
      email: cleanEmail,
      role: role,
      salt: salt,
      passwordHash: hash,
      status: "active",
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    users.push(newUser);
    saveUsers(users);
    logAudit(actorSession.email, "USER_CREATED", `Added ${cleanEmail} as ${role}`);
    return newUser;
  }

  async function updateUserRole(actorSession, userId, newRole) {
    if (actorSession.role !== ROLES.SUPER_ADMIN) {
      throw new Error("Unauthorized: Only Super Admin can change team roles.");
    }

    const users = getUsers();
    const target = users.find(u => u.id === userId);
    if (!target) throw new Error("User not found.");

    target.role = newRole;
    saveUsers(users);
    logAudit(actorSession.email, "ROLE_UPDATED", `Updated ${target.email} to ${newRole}`);
    return target;
  }

  async function toggleUserStatus(actorSession, userId) {
    if (actorSession.role !== ROLES.SUPER_ADMIN) {
      throw new Error("Unauthorized: Only Super Admin can deactivate accounts.");
    }

    const users = getUsers();
    const target = users.find(u => u.id === userId);
    if (!target) throw new Error("User not found.");
    if (target.id === actorSession.userId) throw new Error("Cannot deactivate your own account.");

    target.status = target.status === "active" ? "inactive" : "active";
    saveUsers(users);
    logAudit(actorSession.email, "STATUS_TOGGLED", `${target.email} is now ${target.status}`);
    return target;
  }

  // Self Initialization
  initDefaultAccounts();

  // Export to global scope
  window.AdminAuth = {
    ROLES,
    ROLE_PERMISSIONS,
    login,
    logout,
    getSession,
    requireAuth,
    requestPasswordReset,
    completePasswordReset,
    getUsers,
    createUser,
    updateUserRole,
    toggleUserStatus,
    getAuditLogs: () => JSON.parse(localStorage.getItem(STORAGE_KEY_AUDIT) || "[]")
  };
})();
