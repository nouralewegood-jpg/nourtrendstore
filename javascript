// Nourtrend AI - Main Application JavaScript

// Products Data
const products = [
    { id: 1, name: "عطر أفنان 9PM", wholesale: 45, price: 150, stock: 15, supplier: "AliExpress" },
    { id: 2, name: "شوكولاتة دبي الكنافة", wholesale: 25, price: 85, stock: 50, supplier: "Local" },
    { id: 3, name: "ماسك LED علاجي", wholesale: 35, price: 199, stock: 8, supplier: "CJ Dropshipping" },
    { id: 4, name: "مبخر ذكي", wholesale: 40, price: 199, stock: 12, supplier: "AliExpress" },
    { id: 5, name: "سماعات لاسلكية", wholesale: 15, price: 99, stock: 30, supplier: "Spocket" }
];

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show target section
    document.getElementById(sectionId).classList.remove('hidden');
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('bg-purple-600/20', 'text-purple-300', 'border', 'border-purple-500/30');
        btn.classList.add('text-gray-300');
    });
    
    // Highlight active button
    const activeBtn = event.currentTarget;
    activeBtn.classList.remove('text-gray-300');
    activeBtn.classList.add('bg-purple-600/20', 'text-purple-300', 'border', 'border-purple-500/30');
}

// Render Products Table
function renderProducts() {
    const tbody = document.getElementById('productsTable');
    if (!tbody) return;
    
    tbody.innerHTML = products.map(p => {
        const profit = p.price - p.wholesale;
        const margin = Math.round((profit / p.price) * 100);
        return `
            <tr class="border-b border-gray-800 hover:bg-gray-800/50">
                <td class="py-3 font-bold">${p.name}</td>
                <td class="py-3 text-gray-400">$${p.wholesale}</td>
                <td class="py-3">${p.price} درهم</td>
                <td class="py-3 text-green-400">${margin}%</td>
                <td class="py-3">
                    <span class="px-2 py-1 ${p.stock < 10 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'} rounded text-xs">
                        ${p.stock} قطع
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

// AI Content Generation
function generateDescription() {
    const name = document.getElementById('productNameInput')?.value;
    const features = document.getElementById('productFeatures')?.value;
    
    if (!name) {
        alert('أدخل اسم المنتج أولاً');
        return;
    }
    
    const templates = [
        `✨ ${name} - المنتج الأكثر رواجاً في الإمارات! ${features}. احصل عليه الآن بسعر حصري مع توصيل مجاني والدفع عند الاستلام.`,
        `🔥 لا يفوتك ${name}! ${features}. جرب الفرق بنفسك وانضم لآلاف العملاء الراضين.`,
        `💎 فخامة تليق بك مع ${name}. ${features}. منتج أصلي 100% بأفضل سعر في السوق.`
    ];
    
    const result = templates[Math.floor(Math.random() * templates.length)];
    const output = document.getElementById('descriptionText');
    const container = document.getElementById('generatedDescription');
    
    if (output && container) {
        output.textContent = result;
        container.classList.remove('hidden');
    }
}

function generateAd() {
    const platform = document.getElementById('adPlatform')?.value;
    const product = document.getElementById('adProduct')?.value || 'منتجنا الفاخر';
    
    const ads = {
        instagram: `📸 ${product}\n\n✨ جودة عالية\n🔥 عرض محدود\n🚚 توصيل مجاني\n\n#الإمارات #دبي #ترند2025`,
        tiktok: `🎵 ${product}\n\nفيديو 15 ثانية\nنص: "لازم تجرب هذا!"\n\n#fyp #dubai #viral`,
        whatsapp: `🚨 عرض 24 ساعة!\n\n${product}\n\n✅ توصيل مجاني\n✅ دفع عند الاستلام\n\n📞 0508423094`
    };
    
    const output = document.getElementById('adText');
    const container = document.getElementById('generatedAd');
    
    if (output && container) {
        output.textContent = ads[platform];
        container.classList.remove('hidden');
    }
}

function copyText(elementId) {
    const text = document.getElementById(elementId)?.textContent;
    if (text) {
        navigator.clipboard.writeText(text);
        alert('تم النسخ!');
    }
}

function addNewProduct() {
    alert('سيتم فتح نموذج إضافة منتج جديد');
}

function refreshData() {
    document.getElementById('lastUpdate').textContent = new Date().toLocaleTimeString('ar-AE');
    alert('تم تحديث البيانات!');
}

// Initialize Charts
function initCharts() {
    // Visitors Chart
    const visitorsCtx = document.getElementById('visitorsChart');
    if (visitorsCtx) {
        new Chart(visitorsCtx, {
            type: 'line',
            data: {
                labels: ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
                datasets: [{
                    label: 'الزوار',
                    data: [120, 190, 150, 250, 220, 300, 280],
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8' } },
                    x: { grid: { display: false }, ticks: { color: '#94a3b8' } }
                }
            }
        });
    }

    // Products Chart
    const productsCtx = document.getElementById('productsChart');
    if (productsCtx) {
        new Chart(productsCtx, {
            type: 'doughnut',
            data: {
                labels: ['عطر أفنان', 'شوكولاتة دبي', 'ماسك LED', 'مبخر ذكي', 'أخرى'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: '#94a3b8' }
                    }
                }
            }
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    initCharts();
});
