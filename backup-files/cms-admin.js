// DAIM CMS - Admin Interface JavaScript

class DAIMCms {
    constructor() {
        this.currentSection = 'music-registration';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupFormHandlers();
        this.setupFileUpload();
        this.setupDataTable();
        this.setupModalSystem();
        this.loadInitialData();
    }

    // Navigation System
    setupNavigation() {
        const menuLinks = document.querySelectorAll('.menu-link');
        const sections = document.querySelectorAll('.cms-section');

        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.switchSection(targetSection);
                
                // Update active states
                menuLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    switchSection(sectionId) {
        const sections = document.querySelectorAll('.cms-section');
        sections.forEach(section => section.classList.remove('active'));
        
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
            this.loadSectionData(sectionId);
        }
    }

    // Form Handlers
    setupFormHandlers() {
        // Music Form
        const musicForm = document.querySelector('.music-form');
        if (musicForm) {
            musicForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleMusicSubmission(new FormData(musicForm));
            });
        }

        // DJ Form
        const djForm = document.querySelector('.dj-form');
        if (djForm) {
            djForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleDJSubmission(new FormData(djForm));
            });
        }

        // Genre Tags
        const genreTags = document.querySelectorAll('.tag');
        genreTags.forEach(tag => {
            tag.addEventListener('click', () => {
                tag.classList.toggle('active');
            });
        });

        // Point Settings
        const pointInputs = document.querySelectorAll('.point-item input');
        pointInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.updatePointSettings(e.target);
            });
        });

        // Toggle Switches
        const toggles = document.querySelectorAll('.switch input');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => {
                this.updateDistributionSettings(e.target);
            });
        });
    }

    // File Upload System
    setupFileUpload() {
        const uploadZones = document.querySelectorAll('.upload-zone');
        
        uploadZones.forEach(zone => {
            // Drag and Drop
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.style.borderColor = 'var(--groove-primary)';
                zone.style.background = 'rgba(212, 175, 55, 0.1)';
            });

            zone.addEventListener('dragleave', (e) => {
                e.preventDefault();
                zone.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                zone.style.background = 'transparent';
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                zone.style.background = 'transparent';
                
                const files = Array.from(e.dataTransfer.files);
                this.handleFileUpload(files);
            });

            // Click to Upload
            const uploadBtn = zone.querySelector('.btn-luxury');
            if (uploadBtn) {
                uploadBtn.addEventListener('click', () => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.multiple = true;
                    input.accept = 'audio/*';
                    input.onchange = (e) => {
                        this.handleFileUpload(Array.from(e.target.files));
                    };
                    input.click();
                });
            }
        });
    }

    // Data Table Management
    setupDataTable() {
        const editBtns = document.querySelectorAll('.btn-small.edit');
        const deleteBtns = document.querySelectorAll('.btn-small.delete');

        editBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                this.editTableRow(row);
            });
        });

        deleteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const row = e.target.closest('tr');
                this.deleteTableRow(row);
            });
        });
    }

    // Modal System
    setupModalSystem() {
        // Create New buttons
        const createBtns = document.querySelectorAll('.btn-primary');
        createBtns.forEach(btn => {
            if (btn.textContent.includes('新規')) {
                btn.addEventListener('click', () => {
                    this.openCreateModal();
                });
            }
        });
    }

    // Data Management Methods
    async handleMusicSubmission(formData) {
        this.showLoading('音楽情報を保存中...');
        
        try {
            // Simulate API call
            await this.delay(1500);
            
            const musicData = {
                title: formData.get('title') || 'New Track',
                artist: formData.get('artist') || 'Unknown Artist',
                genre: formData.get('genre') || 'Electronic',
                price: formData.get('price') || '1000',
                status: 'active',
                plays: Math.floor(Math.random() * 10000),
                revenue: Math.floor(Math.random() * 50000)
            };

            this.addToMusicTable(musicData);
            this.showNotification('楽曲が正常に登録されました', 'success');
            this.clearForm('.music-form');
            
        } catch (error) {
            this.showNotification('エラーが発生しました', 'error');
        } finally {
            this.hideLoading();
        }
    }

    async handleDJSubmission(formData) {
        this.showLoading('DJ情報を保存中...');
        
        try {
            await this.delay(1500);
            
            const djData = {
                name: formData.get('name') || 'New DJ',
                genres: this.getSelectedGenres(),
                followers: Math.floor(Math.random() * 20000),
                bio: formData.get('bio') || 'DJ紹介文'
            };

            this.addToDJList(djData);
            this.showNotification('DJが正常に登録されました', 'success');
            this.clearForm('.dj-form');
            
        } catch (error) {
            this.showNotification('エラーが発生しました', 'error');
        } finally {
            this.hideLoading();
        }
    }

    async handleFileUpload(files) {
        const validFiles = files.filter(file => file.type.startsWith('audio/'));
        
        if (validFiles.length === 0) {
            this.showNotification('音楽ファイルを選択してください', 'error');
            return;
        }

        this.showLoading(`${validFiles.length}個のファイルをアップロード中...`);

        try {
            for (const file of validFiles) {
                await this.uploadFile(file);
            }
            this.showNotification('ファイルのアップロードが完了しました', 'success');
        } catch (error) {
            this.showNotification('アップロードエラーが発生しました', 'error');
        } finally {
            this.hideLoading();
        }
    }

    async uploadFile(file) {
        // Simulate file upload
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Uploaded: ${file.name}`);
                resolve();
            }, 1000);
        });
    }

    // Table Management
    addToMusicTable(data) {
        const tbody = document.querySelector('.data-table tbody');
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${data.title}</td>
            <td>${data.artist}</td>
            <td>${data.genre}</td>
            <td>${data.plays.toLocaleString()}</td>
            <td>¥${data.revenue.toLocaleString()}</td>
            <td><span class="status active">配信中</span></td>
            <td>
                <button class="btn-small edit">編集</button>
                <button class="btn-small delete">削除</button>
            </td>
        `;
        
        tbody.prepend(row);
        this.setupTableRowEvents(row);
    }

    addToDJList(data) {
        const djList = document.querySelector('.dj-list');
        const djItem = document.createElement('div');
        djItem.className = 'dj-item';
        
        djItem.innerHTML = `
            <div class="dj-avatar">👤</div>
            <div class="dj-info">
                <h4>${data.name}</h4>
                <p>${data.genres.join(', ')}</p>
                <p>フォロワー: ${data.followers.toLocaleString()}</p>
            </div>
            <div class="dj-actions">
                <button class="btn-small">編集</button>
                <button class="btn-small">詳細</button>
            </div>
        `;
        
        djList.prepend(djItem);
    }

    setupTableRowEvents(row) {
        const editBtn = row.querySelector('.edit');
        const deleteBtn = row.querySelector('.delete');
        
        if (editBtn) {
            editBtn.addEventListener('click', () => this.editTableRow(row));
        }
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => this.deleteTableRow(row));
        }
    }

    editTableRow(row) {
        const cells = row.querySelectorAll('td');
        const data = {
            title: cells[0].textContent,
            artist: cells[1].textContent,
            genre: cells[2].textContent,
            price: cells[4].textContent.replace(/[¥,]/g, '')
        };
        
        this.openEditModal(data);
    }

    deleteTableRow(row) {
        if (confirm('本当に削除しますか？')) {
            row.remove();
            this.showNotification('アイテムが削除されました', 'success');
        }
    }

    // Utility Methods
    getSelectedGenres() {
        const activeTags = document.querySelectorAll('.tag.active');
        return Array.from(activeTags).map(tag => tag.textContent);
    }

    clearForm(selector) {
        const form = document.querySelector(selector);
        if (form) {
            form.reset();
            // Clear active tags
            form.querySelectorAll('.tag.active').forEach(tag => {
                tag.classList.remove('active');
            });
        }
    }

    updatePointSettings(input) {
        const action = input.closest('.point-item').querySelector('label').textContent;
        const value = input.value;
        
        console.log(`Point setting updated: ${action} = ${value} points`);
        this.showNotification('ポイント設定が更新されました', 'success');
    }

    updateDistributionSettings(toggle) {
        const setting = toggle.closest('.setting-item').querySelector('span').textContent;
        const enabled = toggle.checked;
        
        console.log(`Distribution setting: ${setting} = ${enabled}`);
        this.showNotification('配信設定が更新されました', 'success');
    }

    // Load Section Data
    async loadSectionData(sectionId) {
        switch (sectionId) {
            case 'analytics':
                this.loadAnalytics();
                break;
            case 'music-player':
                this.loadPlayerData();
                break;
            default:
                break;
        }
    }

    loadAnalytics() {
        // Load analytics data
        const statsNumbers = document.querySelectorAll('.stat-number');
        statsNumbers.forEach(stat => {
            this.animateNumber(stat, parseInt(stat.textContent.replace(/,/g, '')));
        });
    }

    loadPlayerData() {
        // Update player statistics
        this.updatePlaylistStats();
    }

    animateNumber(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 30);
    }

    updatePlaylistStats() {
        // Update playlist information
        console.log('Playlist stats updated');
    }

    // Modal Methods
    openCreateModal() {
        const modalHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>新規作成</h2>
                        <button class="close-btn" onclick="this.closest('.modal-overlay').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>新しいコンテンツを作成します。</p>
                        <div class="modal-actions">
                            <button class="btn-luxury btn-primary">作成</button>
                            <button class="btn-luxury" onclick="this.closest('.modal-overlay').remove()">キャンセル</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    openEditModal(data) {
        const modalHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>編集</h2>
                        <button class="close-btn" onclick="this.closest('.modal-overlay').remove()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form class="edit-form">
                            <div class="form-group">
                                <label>タイトル</label>
                                <input type="text" class="form-input" value="${data.title}">
                            </div>
                            <div class="form-group">
                                <label>アーティスト</label>
                                <input type="text" class="form-input" value="${data.artist}">
                            </div>
                            <div class="form-group">
                                <label>ジャンル</label>
                                <input type="text" class="form-input" value="${data.genre}">
                            </div>
                        </form>
                        <div class="modal-actions">
                            <button class="btn-luxury btn-primary">保存</button>
                            <button class="btn-luxury" onclick="this.closest('.modal-overlay').remove()">キャンセル</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="close-notification">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
        
        // Manual close
        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.remove();
        });
    }

    // Loading System
    showLoading(message) {
        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(loader);
    }

    hideLoading() {
        const loader = document.querySelector('.loading-overlay');
        if (loader) {
            loader.remove();
        }
    }

    // Utility
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    loadInitialData() {
        // Load initial dashboard data
        console.log('DAIM CMS initialized');
        this.showNotification('DAIM CMSへようこそ', 'success');
    }
}

// Initialize CMS when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.daimCms = new DAIMCms();
});

// Add CSS for notifications and loading
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 90px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    z-index: 10000;
    animation: slideInRight 0.3s ease-out;
    box-shadow: var(--shadow-luxury);
}

.notification.success {
    background: linear-gradient(135deg, #00ff64, #00cc51);
}

.notification.error {
    background: linear-gradient(135deg, #ff6464, #ff3333);
}

.notification.info {
    background: var(--gradient-gold);
    color: var(--primary-black);
}

.notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.close-notification {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
}

.close-notification:hover {
    opacity: 1;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(5px);
}

.loading-content {
    text-align: center;
    color: white;
    font-family: 'Montserrat', sans-serif;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(212, 175, 55, 0.3);
    border-top: 3px solid var(--groove-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(5px);
}

.modal-content {
    background: var(--deep-charcoal);
    border-radius: 12px;
    min-width: 500px;
    max-width: 90vw;
    max-height: 80vh;
    overflow-y: auto;
    border: 1px solid rgba(212, 175, 55, 0.3);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
}

.modal-header h2 {
    font-family: 'Montserrat', sans-serif;
    color: var(--groove-primary);
    margin: 0;
}

.close-btn {
    background: none;
    border: none;
    color: var(--text-secondary);
    font-size: 1.5rem;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-body {
    padding: 2rem;
}

.modal-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    justify-content: flex-end;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);