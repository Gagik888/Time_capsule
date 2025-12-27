// script.js

// Global variables
let capsules = JSON.parse(localStorage.getItem('capsules')) || [];
let timers = {}; // Store active timers by capsule ID

const timeOptions = {
    oneMinute: 60000,
    oneMonth: 2592000000,
    sixMonths: 15552000000,
    oneYear: 31536000000,
    fiveYears: 157680000000,
    tenYears: 315360000000,
    twentyYears: 630720000000
};

// Mock financial data (simulated rates and prices)
function getMockFinancialData(baseCurrency, compCurrency, stockSymbol) {
    // Simulate exchange rates (base to comp)
    const rates = { EUR: { USD: 1.1, RUB: 90 }, USD: { EUR: 0.9, RUB: 80 }, RUB: { EUR: 0.011, USD: 0.0125 } };
    const exchangeRate = rates[baseCurrency][compCurrency] || 1;
    // Simulate stock price
    const stockPrice = Math.random() * 100 + 50; // Random price between 50-150
    return { exchangeRate, stockPrice };
}

// Save capsules to LocalStorage
function saveCapsules() {
    localStorage.setItem('capsules', JSON.stringify(capsules));
}

// Render capsules list
function renderCapsules() {
    const container = document.getElementById('capsulesContainer');
    container.innerHTML = '';
    capsules.forEach(capsule => {
        const div = document.createElement('div');
        div.className = `capsule ${capsule.opened ? 'open' : 'locked'}`;
        div.innerHTML = `
            <div>
                <h3>${capsule.title}</h3>
                <p>Opens: ${new Date(capsule.openAt).toLocaleString()}</p>
                ${capsule.opened ? '<p>Status: Opened</p>' : '<p>Status: Locked</p>'}
            </div>
            <div>
                ${capsule.opened ? `<button class="btn" onclick="openCapsule('${capsule.id}')">View</button>` : ''}
                <button class="btn small" onclick="deleteCapsule('${capsule.id}')">Delete</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Create capsule
document.getElementById('capsuleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const files = Array.from(document.getElementById('files').files);
    const note = document.getElementById('note').value;
    const gmail = document.getElementById('gmail').value;
    const duration = parseInt(document.getElementById('duration').value);
    const baseCurrency = document.getElementById('baseCurrency').value;
    const compCurrency = document.getElementById('compCurrency').value;
    const stockSymbol = document.getElementById('stockSymbol').value;

    // Mock financial data at creation
    const financialData = getMockFinancialData(baseCurrency, compCurrency, stockSymbol);

    // Convert files to base64
    const filePromises = files.map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve({ name: file.name, type: file.type, data: reader.result });
            reader.readAsDataURL(file);
        });
    });

    Promise.all(filePromises).then(fileData => {
        const capsule = {
            id: Date.now().toString(),
            title,
            files: fileData,
            note,
            gmail,
            createdAt: Date.now(),
            openAt: Date.now() + duration,
            financialData,
            baseCurrency,
            compCurrency,
            stockSymbol,
            opened: false
        };
        capsules.push(capsule);
        saveCapsules();

        // Set timer for notification
        timers[capsule.id] = setTimeout(() => {
            alert(`Time Capsule "${capsule.title}" is ready to open!`);
            capsule.opened = true;
            saveCapsules();
            renderCapsules();
        }, duration);

        renderCapsules();
        this.reset();
    });
});

// Delete capsule
function deleteCapsule(id) {
    capsules = capsules.filter(c => c.id !== id);
    if (timers[id]) clearTimeout(timers[id]);
    saveCapsules();
    renderCapsules();
}

// Open capsule in modal
function openCapsule(id) {
    const capsule = capsules.find(c => c.id === id);
    if (!capsule) return;

    // Get "current" financial data (mocked)
    const currentData = getMockFinancialData(capsule.baseCurrency, capsule.compCurrency, capsule.stockSymbol);

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <h2>${capsule.title}</h2>
        <p><strong>Created:</strong> ${new Date(capsule.createdAt).toLocaleString()}</p>
        <p><strong>Note:</strong> ${capsule.note}</p>
        ${capsule.gmail ? `<p><strong>Gmail:</strong> ${capsule.gmail}</p>` : ''}
        <h3>Files:</h3>
        <div>${capsule.files.map(f => f.type.startsWith('image/') ? `<img src="${f.data}" alt="${f.name}" style="max-width:100%;">` : `<video controls style="max-width:100%;"><source src="${f.data}" type="${f.type}"></video>`).join('')}</div>
        <h3>Financial Snapshot:</h3>
        <p><strong>Saved Exchange Rate (${capsule.baseCurrency} to ${capsule.compCurrency}):</strong> ${capsule.financialData.exchangeRate.toFixed(2)}</p>
        <p><strong>Current Exchange Rate:</strong> ${currentData.exchangeRate.toFixed(2)}</p>
        <p><strong>Saved Stock Price (${capsule.stockSymbol}):</strong> $${capsule.financialData.stockPrice.toFixed(2)}</p>
        <p><strong>Current Stock Price:</strong> $${currentData.stockPrice.toFixed(2)}</p>
    `;
    document.getElementById('modal').classList.remove('hidden');
}

// Close modal
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
});

// Delete 1-min test capsules
document.getElementById('clearTest').addEventListener('click', () => {
    capsules = capsules.filter(c => (c.openAt - c.createdAt) !== 60000);
    saveCapsules();
    renderCapsules();
});

// Initial render
renderCapsules();