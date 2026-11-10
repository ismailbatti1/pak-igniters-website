/**
 * PAK IGNITERS - Visual CMS Section Editor
 * Handles input synchronization, English/Urdu toggles, divisions management, and preview
 */

(function(window) {
  'use strict';

  var currentLang = 'en'; // 'en' or 'ur'

  var AdminEditor = {
    init: function() {
      this.bindInputs();
      this.bindLanguageSwitcher();
      this.renderDivisions();
      this.renderMediaLibrary();
      this.bindMediaDropzone();
      this.bindPreviewModal();
      this.populateFields();
      this.bindNavigationEditor();
    },

    /**
     * Bind all .editor-sync input elements to auto-update the CMS draft state
     */
    bindInputs: function() {
      var self = this;
      document.querySelectorAll('.editor-sync').forEach(function(input) {
        input.addEventListener('input', function() {
          var path = input.getAttribute('data-path');
          if (!path) return;
          var val = input.value;
          self.updateDraftValue(path, val);
          self.markUnsaved();
        });
      });
    },

    /**
     * Mark UI status badge as having unsaved draft changes
     */
    markUnsaved: function() {
      var badge = document.getElementById('syncStatusBadge');
      var text = document.getElementById('syncStatusText');
      if (badge && text) {
        badge.classList.add('unsaved');
        text.textContent = 'Unsaved Draft Changes';
      }
    },

    /**
     * Switch language between English and Urdu
     */
    bindLanguageSwitcher: function() {
      var self = this;
      var btnEn = document.getElementById('btnEditLangEn');
      var btnUr = document.getElementById('btnEditLangUr');

      if (btnEn && btnUr) {
        btnEn.addEventListener('click', function() {
          currentLang = 'en';
          btnEn.classList.add('active');
          btnUr.classList.remove('active');
          self.populateFields();
          self.renderDivisions();
        });

        btnUr.addEventListener('click', function() {
          currentLang = 'ur';
          btnUr.classList.add('active');
          btnEn.classList.remove('active');
          self.populateFields();
          self.renderDivisions();
        });
      }
    },

    /**
     * Populate standard fields based on current language
     */
    populateFields: function() {
      var draft = window.AdminStore ? window.AdminStore.getDraft() : {};
      var isUrdu = (currentLang === 'ur');

      document.querySelectorAll('.editor-sync').forEach(function(input) {
        var path = input.getAttribute('data-path');
        if (!path) return;

        var fullPath = isUrdu ? (path + '_ur') : path;
        var val = AdminEditor.getByPath(draft, fullPath);

        // Fallback to default if urdu is missing or vice-versa
        if (val === undefined && isUrdu) {
          val = AdminEditor.getByPath(draft, path) || '';
        }

        input.value = val !== undefined ? val : '';
        if (isUrdu) {
          input.setAttribute('dir', 'rtl');
          input.style.fontFamily = "'Noto Nastaliq Urdu', serif";
        } else {
          input.setAttribute('dir', 'ltr');
          input.style.fontFamily = '';
        }
      });
    },

    /**
     * Update draft value with support for English and Urdu paths
     */
    updateDraftValue: function(basePath, value) {
      if (!window.AdminStore) return;
      var targetPath = (currentLang === 'ur') ? (basePath + '_ur') : basePath;
      window.AdminStore.updateDraft(targetPath, value);
    },

    /**
     * Safely resolve nested path from object
     */
    getByPath: function(obj, path) {
      if (!obj || !path) return undefined;
      var parts = path.split('.');
      var curr = obj;
      for (var i = 0; i < parts.length; i++) {
        if (curr === null || curr === undefined) return undefined;
        curr = curr[parts[i]];
      }
      return curr;
    },

    /**
     * Render the 6 Strategic Divisions accordion editor
     */
    renderDivisions: function() {
      var container = document.getElementById('divisionsEditorContainer');
      if (!container || !window.AdminStore) return;

      var draft = window.AdminStore.getDraft();
      var divisions = draft.divisions || [];
      var isUrdu = (currentLang === 'ur');

      container.innerHTML = '';

      divisions.forEach(function(div, index) {
        var card = document.createElement('div');
        card.className = 'admin-card';

        var titleEn = div.title || ('Division ' + (index + 1));
        var titleUr = div.title_ur || titleEn;
        var displayTitle = isUrdu ? titleUr : titleEn;

        var html = '' +
          '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem;">' +
            '<div style="display: flex; align-items: center; gap: 0.75rem;">' +
              '<span class="metric-badge green" style="font-size: 0.75rem;">Division ' + (index + 1) + '</span>' +
              '<h4 style="color: #FFFFFF; font-size: 1.1rem; font-weight: 700;">' + displayTitle + '</h4>' +
            '</div>' +
            '<span class="role-badge developer" style="font-size: 0.7rem;">Active Unit</span>' +
          '</div>' +

          '<div class="editor-grid">' +
            '<div class="form-group">' +
              '<label class="form-label">Division Name (English)</label>' +
              '<input type="text" class="form-input div-field" data-index="' + index + '" data-prop="title" value="' + (div.title || '') + '">' +
            '</div>' +

            '<div class="form-group">' +
              '<label class="form-label">Division Name (اردو - Urdu)</label>' +
              '<input type="text" dir="rtl" style="font-family: \'Noto Nastaliq Urdu\', serif;" class="form-input div-field" data-index="' + index + '" data-prop="title_ur" value="' + (div.title_ur || '') + '">' +
            '</div>' +

            '<div class="form-group full-width">' +
              '<label class="form-label">Executive Description (English)</label>' +
              '<textarea rows="2" class="form-textarea div-field" data-index="' + index + '" data-prop="description">' + (div.description || '') + '</textarea>' +
            '</div>' +

            '<div class="form-group full-width">' +
              '<label class="form-label">Executive Description (اردو - Urdu)</label>' +
              '<textarea rows="2" dir="rtl" style="font-family: \'Noto Nastaliq Urdu\', serif;" class="form-textarea div-field" data-index="' + index + '" data-prop="description_ur">' + (div.description_ur || '') + '</textarea>' +
            '</div>' +

            '<div class="form-group full-width">' +
              '<label class="form-label">Key Capabilities &amp; Services (Comma Separated)</label>' +
              '<input type="text" class="form-input div-features" data-index="' + index + '" value="' + ((div.features || []).join(', ')) + '">' +
            '</div>' +
          '</div>';

        card.innerHTML = html;
        container.appendChild(card);
      });

      // Bind input events for division fields
      container.querySelectorAll('.div-field').forEach(function(input) {
        input.addEventListener('input', function() {
          var idx = parseInt(input.getAttribute('data-index'), 10);
          var prop = input.getAttribute('data-prop');
          if (divisions[idx]) {
            divisions[idx][prop] = input.value;
            window.AdminStore.updateDraft('divisions', divisions);
            AdminEditor.markUnsaved();
          }
        });
      });

      // Bind feature list
      container.querySelectorAll('.div-features').forEach(function(input) {
        input.addEventListener('input', function() {
          var idx = parseInt(input.getAttribute('data-index'), 10);
          var raw = input.value;
          var arr = raw.split(',').map(function(s) { return s.trim(); }).filter(Boolean);
          if (divisions[idx]) {
            divisions[idx].features = arr;
            window.AdminStore.updateDraft('divisions', divisions);
            AdminEditor.markUnsaved();
          }
        });
      });
    },

    /**
     * Render the Media Library Grid
     */
    renderMediaLibrary: function() {
      var grid = document.getElementById('mediaLibraryGrid');
      if (!grid || !window.AdminStore) return;

      var mediaItems = window.AdminStore.getMedia();
      grid.innerHTML = '';

      if (!mediaItems || mediaItems.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--text-dim); padding: 2rem;">No custom media uploaded yet. Use the dropzone above to add logos or banners.</div>';
        return;
      }

      mediaItems.forEach(function(item) {
        var card = document.createElement('div');
        card.className = 'media-card';
        card.innerHTML = '' +
          '<img src="' + item.dataUrl + '" alt="' + (item.alt || item.name) + '">' +
          '<div class="media-card-info">' +
            '<div class="media-card-name" title="' + item.name + '">' + item.name + '</div>' +
            '<div class="media-card-size">' + (item.size || 'Stored Asset') + '</div>' +
            '<div style="margin-top: 0.5rem; display: flex; gap: 0.4rem;">' +
              '<button type="button" class="admin-btn admin-btn-secondary btn-copy-media" data-url="' + item.dataUrl + '" style="font-size: 0.72rem; padding: 0.25rem 0.5rem; flex: 1;">Copy URL</button>' +
              '<button type="button" class="admin-btn admin-btn-danger btn-del-media" data-id="' + item.id + '" style="font-size: 0.72rem; padding: 0.25rem 0.5rem;">Delete</button>' +
            '</div>' +
          '</div>';

        grid.appendChild(card);
      });

      // Bind copy and delete
      grid.querySelectorAll('.btn-copy-media').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var url = btn.getAttribute('data-url');
          if (navigator.clipboard) {
            navigator.clipboard.writeText(url);
            btn.textContent = 'Copied!';
            setTimeout(function() { btn.textContent = 'Copy URL'; }, 1500);
          }
        });
      });

      grid.querySelectorAll('.btn-del-media').forEach(function(btn) {
        btn.addEventListener('click', function() {
          var id = btn.getAttribute('data-id');
          if (confirm('Delete this image from the CMS Media Library?')) {
            window.AdminStore.deleteMedia(id);
            AdminEditor.renderMediaLibrary();
          }
        });
      });
    },

    /**
     * File Dropzone Upload handler
     */
    bindMediaDropzone: function() {
      var self = this;
      var dropzone = document.getElementById('mediaDropzone');
      var fileInput = document.getElementById('mediaFileInput');
      if (!dropzone || !fileInput) return;

      dropzone.addEventListener('click', function() {
        fileInput.click();
      });

      dropzone.addEventListener('dragover', function(e) {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });

      dropzone.addEventListener('dragleave', function() {
        dropzone.classList.remove('dragover');
      });

      dropzone.addEventListener('drop', function(e) {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer && e.dataTransfer.files) {
          self.handleFiles(e.dataTransfer.files);
        }
      });

      fileInput.addEventListener('change', function() {
        if (fileInput.files) {
          self.handleFiles(fileInput.files);
        }
      });
    },

    handleFiles: function(files) {
      var self = this;
      Array.from(files).forEach(function(file) {
        if (!file.type.startsWith('image/')) {
          alert('Please upload image files only.');
          return;
        }

        var reader = new FileReader();
        reader.onload = function(e) {
          var dataUrl = e.target.result;
          var sizeKb = Math.round(file.size / 1024) + ' KB';
          var item = {
            id: 'img_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
            name: file.name,
            dataUrl: dataUrl,
            size: sizeKb,
            date: new Date().toLocaleDateString(),
            alt: file.name.replace(/\.[^/.]+$/, "")
          };

          if (window.AdminStore) {
            window.AdminStore.addMediaItem(item);
            self.renderMediaLibrary();
            self.markUnsaved();
          }
        };
        reader.readAsDataURL(file);
      });
    },

    /**
     * Live Preview Modal Controls
     */
    bindPreviewModal: function() {
      var modal = document.getElementById('previewModal');
      var openBtn = document.getElementById('openPreviewBtn');
      var closeBtn = document.getElementById('closePreviewBtn');
      var btnDesktop = document.getElementById('btnDeviceDesktop');
      var btnMobile = document.getElementById('btnDeviceMobile');
      var iframe = document.getElementById('previewIframe');
      var publishBtn = document.getElementById('previewPublishBtn');

      if (!modal) return;

      if (openBtn) {
        openBtn.addEventListener('click', function() {
          // Force draft preview mode in iframe
          if (iframe) {
            iframe.src = '../index.html?preview=draft&t=' + Date.now();
          }
          modal.classList.add('open');
        });
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          modal.classList.remove('open');
        });
      }

      if (btnDesktop && btnMobile && iframe) {
        btnDesktop.addEventListener('click', function() {
          btnDesktop.classList.add('active');
          btnMobile.classList.remove('active');
          iframe.classList.remove('mobile');
        });

        btnMobile.addEventListener('click', function() {
          btnMobile.classList.add('active');
          btnDesktop.classList.remove('active');
          iframe.classList.add('mobile');
        });
      }

      if (publishBtn && window.AdminStore) {
        publishBtn.addEventListener('click', function() {
          var user = window.AdminAuth ? window.AdminAuth.getCurrentUser() : null;
          var res = window.AdminStore.publishLive(user ? user.name : 'Super Admin');
          if (res.success) {
            alert('Live Website Updated Successfully!');
            modal.classList.remove('open');
            var syncText = document.getElementById('syncStatusText');
            var syncBadge = document.getElementById('syncStatusBadge');
            if (syncBadge && syncText) {
              syncBadge.classList.remove('unsaved');
              syncText.textContent = 'Synced with Live';
            }
          }
        });
      }
    },

    /**
     * Render Navigation Menu items
     */
    bindNavigationEditor: function() {
      var list = document.getElementById('navMenuItemsList');
      if (!list) return;

      var defaultLinks = [
        { label: 'Home', href: '#hero' },
        { label: 'About Us', href: '#about' },
        { label: '6 Divisions', href: '#divisions' },
        { label: 'WooCommerce', href: 'wordpress-prep/woocommerce-spec.md' },
        { label: 'Contact', href: '#contact' }
      ];

      list.innerHTML = '';
      defaultLinks.forEach(function(item, idx) {
        var row = document.createElement('div');
        row.style.display = 'flex';
        row.style.gap = '0.75rem';
        row.style.alignItems = 'center';
        row.innerHTML = '' +
          '<input type="text" class="form-input" style="flex: 1;" value="' + item.label + '">' +
          '<input type="text" class="form-input" style="flex: 2;" value="' + item.href + '">' +
          '<span class="metric-badge green" style="font-size: 0.72rem;">Header</span>';
        list.appendChild(row);
      });
    }
  };

  window.AdminEditor = AdminEditor;

})(window);
