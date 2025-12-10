// Image Preview App - TikTok Style
class ImagePreviewApp {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        this.container = document.getElementById('imageContainer');
        this.fileInput = document.getElementById('fileInput');
        this.addImageBtn = document.getElementById('addImageBtn');
        this.currentIndexEl = document.getElementById('currentIndex');
        this.totalCountEl = document.getElementById('totalCount');
        
        this.init();
    }

    init() {
        // Load saved images from localStorage
        this.loadFromStorage();
        
        // Event listeners
        this.addImageBtn.addEventListener('click', () => {
            this.fileInput.click();
        });

        this.fileInput.addEventListener('change', (e) => {
            this.handleFileSelect(e);
        });

        this.container.addEventListener('scroll', () => {
            this.updateCurrentIndex();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                this.scrollToIndex(Math.max(0, this.currentIndex - 1));
            } else if (e.key === 'ArrowDown') {
                this.scrollToIndex(Math.min(this.images.length - 1, this.currentIndex + 1));
            }
        });

        // Render initial state
        this.render();
    }

    async handleFileSelect(event) {
        const files = Array.from(event.target.files);
        
        for (const file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    const imageData = {
                        id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                        url: e.target.result,
                        name: file.name,
                        size: this.formatFileSize(file.size),
                        date: new Date().toLocaleDateString('zh-CN')
                    };
                    
                    this.images.push(imageData);
                    this.saveToStorage();
                    this.render();
                };
                
                reader.readAsDataURL(file);
            }
        }
        
        // Reset file input
        this.fileInput.value = '';
    }

    formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    render() {
        this.container.innerHTML = '';

        if (this.images.length === 0) {
            this.renderEmptyState();
            this.totalCountEl.textContent = '0';
            return;
        }

        this.images.forEach((image, index) => {
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
            imageItem.dataset.index = index;

            const img = document.createElement('img');
            img.src = image.url;
            img.alt = image.name;
            img.loading = 'lazy';

            const info = document.createElement('div');
            info.className = 'image-info';
            info.innerHTML = `
                <h3>${image.name}</h3>
                <p>${image.size} • ${image.date}</p>
            `;

            imageItem.appendChild(img);
            imageItem.appendChild(info);
            this.container.appendChild(imageItem);
        });

        this.totalCountEl.textContent = this.images.length;
        this.updateCurrentIndex();
    }

    renderEmptyState() {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
            </svg>
            <h2>欢迎使用图片浏览器</h2>
            <p>点击下方按钮添加图片<br>像抖音一样滑动浏览</p>
            <button onclick="document.getElementById('fileInput').click()">添加图片</button>
        `;
        this.container.appendChild(emptyState);
    }

    updateCurrentIndex() {
        if (this.images.length === 0) return;

        const scrollTop = this.container.scrollTop;
        const viewportHeight = window.innerHeight;
        const newIndex = Math.round(scrollTop / viewportHeight);
        
        this.currentIndex = Math.max(0, Math.min(newIndex, this.images.length - 1));
        this.currentIndexEl.textContent = this.currentIndex + 1;
    }

    scrollToIndex(index) {
        const viewportHeight = window.innerHeight;
        this.container.scrollTo({
            top: index * viewportHeight,
            behavior: 'smooth'
        });
    }

    saveToStorage() {
        try {
            localStorage.setItem('imagePreviewApp_images', JSON.stringify(this.images));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('imagePreviewApp_images');
            if (saved) {
                this.images = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Failed to load from localStorage:', e);
            this.images = [];
        }
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ImagePreviewApp();
    });
} else {
    new ImagePreviewApp();
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
