// ELEVEN Artist Page JavaScript

// Token Comment Modal
function openTokenComment() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>トークンコミットメント</h2>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <p>ELEVENを応援するためのトークンコミットメント機能です。</p>
                <div class="token-options">
                    <div class="token-option">
                        <h3>ブロンズサポーター</h3>
                        <p>100 DAIM tokens</p>
                        <button class="token-btn bronze">コミット</button>
                    </div>
                    <div class="token-option">
                        <h3>シルバーサポーター</h3>
                        <p>500 DAIM tokens</p>
                        <button class="token-btn silver">コミット</button>
                    </div>
                    <div class="token-option">
                        <h3>ゴールドサポーター</h3>
                        <p>1000 DAIM tokens</p>
                        <button class="token-btn gold">コミット</button>
                    </div>
                </div>
                <div class="comment-section">
                    <h3>応援コメント</h3>
                    <textarea placeholder="ELEVENへの応援メッセージを入力してください..."></textarea>
                    <button class="submit-comment-btn">コメント送信</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// ELEVEN Shop Modal
function openElevenShop() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>イレブンショップ</h2>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="shop-grid">
                    <div class="shop-item">
                        <div class="item-image">
                            <div class="placeholder-image">T-Shirt</div>
                        </div>
                        <h3>ELEVEN オフィシャルTシャツ</h3>
                        <p class="price">¥3,500</p>
                        <button class="buy-btn">購入</button>
                    </div>
                    <div class="shop-item">
                        <div class="item-image">
                            <div class="placeholder-image">Cap</div>
                        </div>
                        <h3>ELEVEN キャップ</h3>
                        <p class="price">¥2,800</p>
                        <button class="buy-btn">購入</button>
                    </div>
                    <div class="shop-item">
                        <div class="item-image">
                            <div class="placeholder-image">Sticker</div>
                        </div>
                        <h3>ELEVEN ステッカーセット</h3>
                        <p class="price">¥800</p>
                        <button class="buy-btn">購入</button>
                    </div>
                    <div class="shop-item">
                        <div class="item-image">
                            <div class="placeholder-image">Album</div>
                        </div>
                        <h3>限定サイン入りアルバム</h3>
                        <p class="price">¥5,000</p>
                        <button class="buy-btn">購入</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// NFT Page Modal
function openNFTPage() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>ELEVEN NFT コレクション</h2>
                <button class="close-btn" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="nft-info">
                    <p>ELEVENの限定NFTコレクションをご覧ください。</p>
                    <div class="nft-stats">
                        <div class="stat">
                            <h3>総コレクション数</h3>
                            <p>1,111 NFTs</p>
                        </div>
                        <div class="stat">
                            <h3>フロア価格</h3>
                            <p>0.5 ETH</p>
                        </div>
                        <div class="stat">
                            <h3>所有者数</h3>
                            <p>756 owners</p>
                        </div>
                    </div>
                </div>
                <div class="nft-grid">
                    <div class="nft-item">
                        <div class="nft-image">
                            <div class="placeholder-nft">NFT #001</div>
                        </div>
                        <h3>ELEVEN Genesis #001</h3>
                        <p class="nft-price">1.2 ETH</p>
                        <button class="nft-btn">詳細を見る</button>
                    </div>
                    <div class="nft-item">
                        <div class="nft-image">
                            <div class="placeholder-nft">NFT #042</div>
                        </div>
                        <h3>ELEVEN Rare #042</h3>
                        <p class="nft-price">0.8 ETH</p>
                        <button class="nft-btn">詳細を見る</button>
                    </div>
                    <div class="nft-item">
                        <div class="nft-image">
                            <div class="placeholder-nft">NFT #123</div>
                        </div>
                        <h3>ELEVEN Common #123</h3>
                        <p class="nft-price">0.3 ETH</p>
                        <button class="nft-btn">詳細を見る</button>
                    </div>
                </div>
                <div class="nft-actions">
                    <button class="primary-btn">OpenSeaで全て見る</button>
                    <button class="secondary-btn">ミント情報</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
});

// Escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Gallery image lightbox
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openImageLightbox(img.src, img.alt);
            }
        });
    });
});

function openImageLightbox(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
            <img src="${src}" alt="${alt}">
            <div class="lightbox-caption">${alt}</div>
        </div>
    `;
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox-overlay');
    if (lightbox) {
        lightbox.remove();
        document.body.style.overflow = 'auto';
    }
}

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add styles for modals and lightbox
const modalStyles = `
    <style>
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border-radius: 20px;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            border: 1px solid #6a5acd;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 30px;
            border-bottom: 1px solid rgba(106, 90, 205, 0.3);
        }
        
        .modal-header h2 {
            color: #6a5acd;
            margin: 0;
            font-size: 1.8rem;
        }
        
        .close-btn {
            background: none;
            border: none;
            color: #ff6b6b;
            font-size: 2rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        
        .close-btn:hover {
            background: rgba(255, 107, 107, 0.2);
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .token-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .token-option {
            background: rgba(0, 0, 0, 0.3);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            border: 1px solid rgba(106, 90, 205, 0.3);
        }
        
        .token-option h3 {
            color: #ff6b6b;
            margin-bottom: 10px;
        }
        
        .token-option p {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 15px;
        }
        
        .token-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        
        .token-btn.bronze {
            background: linear-gradient(45deg, #cd7f32, #b8860b);
            color: white;
        }
        
        .token-btn.silver {
            background: linear-gradient(45deg, #c0c0c0, #a8a8a8);
            color: white;
        }
        
        .token-btn.gold {
            background: linear-gradient(45deg, #ffd700, #ffb347);
            color: black;
        }
        
        .comment-section {
            background: rgba(0, 0, 0, 0.3);
            padding: 20px;
            border-radius: 15px;
            border: 1px solid rgba(106, 90, 205, 0.3);
        }
        
        .comment-section h3 {
            color: #6a5acd;
            margin-bottom: 15px;
        }
        
        .comment-section textarea {
            width: 100%;
            height: 100px;
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid #6a5acd;
            border-radius: 10px;
            padding: 15px;
            color: white;
            resize: vertical;
            font-family: inherit;
        }
        
        .submit-comment-btn {
            background: linear-gradient(45deg, #6a5acd, #8a2be2);
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 20px;
            cursor: pointer;
            margin-top: 15px;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        
        .shop-grid, .nft-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
        }
        
        .shop-item, .nft-item {
            background: rgba(0, 0, 0, 0.3);
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            border: 1px solid rgba(106, 90, 205, 0.3);
        }
        
        .item-image, .nft-image {
            height: 150px;
            border-radius: 10px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #6a5acd, #8a2be2);
        }
        
        .placeholder-image, .placeholder-nft {
            color: white;
            font-weight: bold;
        }
        
        .shop-item h3, .nft-item h3 {
            color: #ff6b6b;
            margin-bottom: 10px;
            font-size: 1rem;
        }
        
        .price, .nft-price {
            color: #6a5acd;
            font-weight: bold;
            font-size: 1.2rem;
            margin-bottom: 15px;
        }
        
        .buy-btn, .nft-btn {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        
        .nft-info {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .nft-info p {
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 20px;
        }
        
        .nft-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .stat {
            background: rgba(0, 0, 0, 0.3);
            padding: 15px;
            border-radius: 10px;
            border: 1px solid rgba(106, 90, 205, 0.3);
        }
        
        .stat h3 {
            color: #6a5acd;
            font-size: 0.9rem;
            margin-bottom: 5px;
        }
        
        .stat p {
            color: #ff6b6b;
            font-weight: bold;
            font-size: 1.1rem;
            margin: 0;
        }
        
        .nft-actions {
            text-align: center;
            margin-top: 30px;
        }
        
        .primary-btn, .secondary-btn {
            padding: 12px 25px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            margin: 0 10px;
            transition: all 0.3s ease;
        }
        
        .primary-btn {
            background: linear-gradient(45deg, #6a5acd, #8a2be2);
            color: white;
        }
        
        .secondary-btn {
            background: transparent;
            border: 2px solid #6a5acd;
            color: #6a5acd;
        }
        
        .lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 10px;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: -40px;
            background: rgba(255, 107, 107, 0.8);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
        }
        
        .lightbox-caption {
            text-align: center;
            color: white;
            margin-top: 15px;
            font-size: 1.1rem;
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles);