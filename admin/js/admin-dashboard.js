/**
 * PAK IGNITERS - Executive Admin Dashboard Controller
 * Role-Based Access Control, Tab Routing, Metrics, Team & System Settings
 */

(function(window) {
  'use strict';

  // 1. Enforce Authentication
  var currentUser = window.AdminAuth ? window.AdminAuth.requireAuth() : null;
  if (!currentUser) return; // Will have redirected to login.html

  var AdminDashboard = {
    init: function() {
      this.setupUserProfile();
      this.enforceRBAC();
      this.setupNavigation();
      this.setupMobileMenu();
      this.renderAuditLogs();
      this.renderTeamTable();
      this.setupPublishAction();
      this.setupSettingsForm();
      this.setupBackupRestore();
      this.setupBlogModal();

      // Initialize Visual Editor
      if (window.AdminEditor) {
        window.AdminEditor.init();
      }
    },

    /**
     * Populate current user details in header & sidebar
     */
    setupUserProfile: function() {
      var nameEl = document.getElementById('sidebarUserName');
      var roleEl = document.getElementById('sidebarUserRole');
      var avatarEl = document.getElementById('sidebarUserAvatar');

      if (nameEl) nameEl.textContent = currentUser.name;
      if (avatarEl) avatarEl.textContent = currentUser.name.charAt(0).toUpperCase();

      if (roleEl) {
        var roleNames = {
          super_admin: 'Super Admin',
          developer: 'Developer',
          content_seo: 'Content & SEO'
        };
        roleEl.textContent = roleNames[currentUser.role] || currentUser.role;
        roleEl.className = 'role-badge ' + currentUser.role;
      }
    },

    /**
     * Role-Based Access Control (RBAC): Hide elements not permitted for current user
     */
    enforceRBAC: function() {
      var role = currentUser.role;

      document.querySelectorAll('[data-rbac-roles]').forEach(function(el) {
        var allowed = el.getAttribute('data-rbac-roles').split(',').map(function(s) { return s.trim(); });
        if (!allowed.includes(role)) {
          el.style.display = 'none';
        }
      });
    },

    /**
     * Sidebar tab navigation logic
     */
    setupNavigation: function() {
      var navItems = document.querySelectorAll('.sidebar-nav-item');
      var tabPanels = document.querySelectorAll('.tab-panel');
      var pageTitle = document.getElementById('pageTitle');
      var pageSubtitle = document.getElementById('pageSubtitle');

      var titles = {
        overview: { title: 'Overview Dashboard', sub: 'Real-time status of PAK IGNITERS portal' },
        editor: { title: 'Visual Section Editor', sub: 'Edit homepage sections, banners, and bilingual copy' },
        divisions: { title: '6 Strategic Divisions', sub: 'Manage titles, descriptions, services, and Urdu text' },
        pages: { title: 'Pages Directory', sub: 'Manage live and staging website routes' },
        media: { title: 'Media Library', sub: 'Upload and organize images, logos, and banners' },
        blogs: { title: 'Blog Articles & News', sub: 'Publish articles, announcements, and insights' },
        seo: { title: 'Search Engine Optimization', sub: 'Meta tags, social previews, and Google indexing' },
        nav: { title: 'Navigation & Footer', sub: 'Configure header menu and social links' },
        team: { title: 'Team Accounts & Roles', sub: 'Manage team credentials and system access permissions' },
        settings: { title: 'System & Chatbot Settings', sub: 'Configure form destinations, phone helpline, and AI bot' }
      };

      navItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          var tabId = item.getAttribute('data-tab');
          if (!tabId) return;

          navItems.forEach(function(n) { n.classList.remove('active'); });
          item.classList.add('active');

          tabPanels.forEach(function(p) { p.classList.remove('active'); });
          var activePanel = document.getElementById('tab-' + tabId);
          if (activePanel) activePanel.classList.add('active');

          if (titles[tabId]) {
            if (pageTitle) pageTitle.textContent = titles[tabId].title;
            if (pageSubtitle) pageSubtitle.textContent = titles[tabId].sub;
          }

          // Close mobile sidebar if open
          var sidebar = document.getElementById('adminSidebar');
          if (sidebar) sidebar.classList.remove('open');
        });
      });

      // Logout handler
      var logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
          if (confirm('Are you sure you want to sign out from the Admin Dashboard?')) {
            window.AdminAuth.logout();
          }
        });
      }
    },

    /**
     * Mobile hamburger menu
     */
    setupMobileMenu: function() {
      var mobileBtn = document.getElementById('mobileMenuBtn');
      var sidebar = document.getElementById('adminSidebar');
      if (mobileBtn && sidebar) {
        mobileBtn.addEventListener('click', function() {
          sidebar.classList.toggle('open');
        });
      }
    },

    /**
     * Render system audit logs
     */
    renderAuditLogs: function() {
      var container = document.getElementById('auditLogList');
      if (!container || !window.AdminAuth) return;

      var logs = window.AdminAuth.getAuditLogs();
      container.innerHTML = '';

      if (logs.length === 0) {
        container.innerHTML = '<div style="color: var(--text-dim); font-size: 0.85rem; padding: 0.5rem 0;">No recorded actions yet.</div>';
        return;
      }

      logs.slice(0, 10).forEach(function(entry) {
        var row = document.createElement('div');
        row.style.display = 'flex';
        row.style.justifyContent = 'space-between';
        row.style.alignItems = 'center';
        row.style.padding = '0.45rem 0.65rem';
        row.style.background = 'var(--admin-card-elevated)';
        row.style.borderRadius = 'var(--radius-sm)';
        row.style.fontSize = '0.8rem';

        row.innerHTML = '' +
          '<div style="display: flex; align-items: center; gap: 0.5rem;">' +
            '<span style="color: var(--color-primary-light); font-weight: 700;">' + entry.action + '</span>' +
            '<span style="color: var(--text-muted);">' + entry.details + '</span>' +
          '</div>' +
          '<div style="color: var(--text-dim); font-size: 0.72rem; white-space: nowrap;">' +
            (entry.user || 'System') + ' &bull; ' + new Date(entry.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
          '</div>';

        container.appendChild(row);
      });

      var clearBtn = document.getElementById('clearAuditBtn');
      if (clearBtn) {
        clearBtn.addEventListener('click', function() {
          localStorage.removeItem('pak_igniters_audit_log');
          AdminDashboard.renderAuditLogs();
        });
      }
    },

    /**
     * Render Team Accounts table (Super Admin only)
     */
    renderTeamTable: function() {
      var tbody = document.getElementById('teamTableBody');
      if (!tbody || !window.AdminAuth) return;

      var users = window.AdminAuth.getUsers();
      tbody.innerHTML = '';

      users.forEach(function(u) {
        var tr = document.createElement('tr');
        var roleNames = {
          super_admin: 'Super Admin',
          developer: 'Website Developer',
          content_seo: 'Content & SEO Manager'
        };

        tr.innerHTML = '' +
          '<td><strong>' + u.name + '</strong></td>' +
          '<td><code>' + u.email + '</code></td>' +
          '<td><span class="role-badge ' + u.role + '">' + (roleNames[u.role] || u.role) + '</span></td>' +
          '<td><span class="metric-badge green">Active</span></td>' +
          '<td>' +
            '<button type="button" class="admin-btn admin-btn-secondary btn-edit-user" data-id="' + u.id + '" style="font-size: 0.75rem; padding: 0.25rem 0.55rem;">Edit / Reset</button>' +
          '</td>';

        tbody.appendChild(tr);
      });

      // Bind edit member modal
      var userModal = document.getElementById('userModal');
      var userForm = document.getElementById('userForm');
      var closeUserBtn = document.getElementById('closeUserModalBtn');

      tbody.querySelectorAll('.btn-edit-user').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var id = btn.getAttribute('data-id');
          var user = users.find(function(x) { return x.id === id; });
          if (!user) return;

          document.getElementById('userModalTitle').textContent = 'Edit Member: ' + user.name;
          document.getElementById('userFormName').value = user.name;
          document.getElementById('userFormEmail').value = user.email;
          document.getElementById('userFormRole').value = user.role;
          document.getElementById('userFormPassword').value = '';
          userModal.setAttribute('data-target-id', id);
          userModal.classList.add('open');
        });
      });

      if (closeUserBtn && userModal) {
        closeUserBtn.addEventListener('click', function() { userModal.classList.remove('open'); });
      }

      if (userForm && userModal) {
        userForm.addEventListener('submit', function(e) {
          e.preventDefault();
          var id = userModal.getAttribute('data-target-id');
          var name = document.getElementById('userFormName').value.trim();
          var role = document.getElementById('userFormRole').value;
          var pass = document.getElementById('userFormPassword').value;

          var res = window.AdminAuth.updateUser(id, { name: name, role: role, newPassword: pass || undefined });
          if (res.success) {
            alert('Team member updated successfully!');
            userModal.classList.remove('open');
            AdminDashboard.renderTeamTable();
          } else {
            alert(res.error || 'Failed to update member.');
          }
        });
      }
    },

    /**
     * Publish Changes to Live Website
     */
    setupPublishAction: function() {
      var publishBtn = document.getElementById('publishLiveBtn');
      if (!publishBtn || !window.AdminStore) return;

      publishBtn.addEventListener('click', function() {
        if (confirm('Publish all draft edits to the live website now? All visitors will instantly see these changes.')) {
          publishBtn.disabled = true;
          publishBtn.innerHTML = '<span>Publishing...</span>';

          setTimeout(function() {
            var res = window.AdminStore.publishLive(currentUser.name);
            if (res.success) {
              alert('SUCCESS: Website published live!\n\nAll changes to sections, divisions, images, and contact routes are now active.');
              var syncBadge = document.getElementById('syncStatusBadge');
              var syncText = document.getElementById('syncStatusText');
              if (syncBadge && syncText) {
                syncBadge.classList.remove('unsaved');
                syncText.textContent = 'Synced with Live';
              }
              var metricBadge = document.getElementById('metricCmsBadge');
              var metricTime = document.getElementById('metricLastPublish');
              if (metricBadge && metricTime) {
                metricBadge.textContent = 'Live Published';
                metricBadge.className = 'metric-badge green';
                metricTime.textContent = 'Just Published';
              }
              AdminDashboard.renderAuditLogs();
            } else {
              alert('Error publishing changes: ' + (res.error || 'Unknown error'));
            }
            publishBtn.disabled = false;
            publishBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Publish Changes</span>';
          }, 400);
        }
      });
    },

    /**
     * System Settings Form
     */
    setupSettingsForm: function() {
      var saveBtn = document.getElementById('saveSettingsBtn');
      if (!saveBtn) return;

      saveBtn.addEventListener('click', function() {
        var inbox = document.getElementById('cfgInboxEmail').value.trim();
        var cc = document.getElementById('cfgCcEmail').value.trim();
        var phone = document.getElementById('cfgHelplinePhone').value.trim();
        var greetingEn = document.getElementById('cfgBotGreetingEn').value.trim();
        var greetingUr = document.getElementById('cfgBotGreetingUr').value.trim();
        var botWhatsApp = document.getElementById('cfgBotWhatsApp').value.trim();

        if (window.AdminStore) {
          window.AdminStore.updateDraft('contact.primaryQueryEmail', inbox);
          window.AdminStore.updateDraft('contact.publicEmail', cc);
          window.AdminStore.updateDraft('contact.phone', phone);
          window.AdminStore.updateDraft('chatbot.greeting_en', greetingEn);
          window.AdminStore.updateDraft('chatbot.greeting_ur', greetingUr);
          window.AdminStore.updateDraft('chatbot.whatsapp', botWhatsApp);

          alert('System & AI Chatbot settings saved to draft! Click "Publish Changes" to push live.');
          var syncBadge = document.getElementById('syncStatusBadge');
          var syncText = document.getElementById('syncStatusText');
          if (syncBadge && syncText) {
            syncBadge.classList.add('unsaved');
            syncText.textContent = 'Unsaved Draft Changes';
          }
        }
      });
    },

    /**
     * JSON Backup Export and Import
     */
    setupBackupRestore: function() {
      var exportBtn = document.getElementById('exportBackupBtn');
      var importBtn = document.getElementById('importBackupBtn');
      var fileInput = document.getElementById('importBackupFile');

      if (exportBtn && window.AdminStore) {
        exportBtn.addEventListener('click', function() {
          var data = window.AdminStore.exportBackupJSON();
          var blob = new Blob([data], { type: 'application/json' });
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'pak-igniters-cms-backup-' + new Date().toISOString().split('T')[0] + '.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        });
      }

      if (importBtn && fileInput) {
        importBtn.addEventListener('click', function() {
          fileInput.click();
        });

        fileInput.addEventListener('change', function() {
          if (!fileInput.files || !fileInput.files[0]) return;
          var reader = new FileReader();
          reader.onload = function(e) {
            try {
              var json = e.target.result;
              var res = window.AdminStore.importBackupJSON(json);
              if (res.success) {
                alert('CMS Backup restored successfully! Refreshing dashboard...');
                window.location.reload();
              } else {
                alert('Failed to restore backup: ' + res.error);
              }
            } catch (err) {
              alert('Invalid backup file.');
            }
          };
          reader.readAsText(fileInput.files[0]);
        });
      }
    },

    /**
     * Blog article management modal
     */
    setupBlogModal: function() {
      var newBtn = document.getElementById('openNewBlogBtn');
      var modal = document.getElementById('blogModal');
      var closeBtn = document.getElementById('closeBlogModalBtn');
      var form = document.getElementById('blogForm');
      var tbody = document.getElementById('blogsTableBody');

      if (!modal) return;

      var defaultArticles = [
        {
          id: 'art-1',
          title: 'PAK IGNITERS Launches 6 Strategic Divisions for Global Expansion',
          category: 'Company News',
          author: 'Farwa (Content Lead)',
          date: '2026-03-28',
          status: 'Published'
        },
        {
          id: 'art-2',
          title: 'How Pakistani Enterprises Are Revolutionizing Global BPO & Technology',
          category: 'Tech & BPO',
          author: 'Ismail (Super Admin)',
          date: '2026-03-25',
          status: 'Published'
        }
      ];

      function renderBlogs() {
        if (!tbody) return;
        tbody.innerHTML = '';
        defaultArticles.forEach(function(art) {
          var tr = document.createElement('tr');
          tr.innerHTML = '' +
            '<td><strong>' + art.title + '</strong></td>' +
            '<td><span class="role-badge developer">' + art.category + '</span></td>' +
            '<td>' + art.author + '</td>' +
            '<td>' + art.date + '</td>' +
            '<td><span class="metric-badge green">' + art.status + '</span></td>' +
            '<td><button type="button" class="admin-btn admin-btn-secondary" style="font-size: 0.72rem; padding: 0.25rem 0.5rem;">Edit</button></td>';
          tbody.appendChild(tr);
        });
      }

      renderBlogs();

      if (newBtn) {
        newBtn.addEventListener('click', function() {
          form.reset();
          document.getElementById('blogModalTitle').textContent = 'Add New Article';
          modal.classList.add('open');
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          modal.classList.remove('open');
        });
      }

      if (form) {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          var title = document.getElementById('blogFormTitle').value.trim();
          var category = document.getElementById('blogFormCategory').value.trim() || 'General';
          var author = document.getElementById('blogFormAuthor').value.trim() || currentUser.name;

          defaultArticles.unshift({
            id: 'art-' + Date.now(),
            title: title,
            category: category,
            author: author,
            date: new Date().toISOString().split('T')[0],
            status: 'Published'
          });

          renderBlogs();
          modal.classList.remove('open');
          alert('New article created successfully!');
        });
      }
    }
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { AdminDashboard.init(); });
  } else {
    AdminDashboard.init();
  }

  window.AdminDashboard = AdminDashboard;

})(window);
