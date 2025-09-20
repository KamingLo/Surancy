const historyContainer = document.getElementById('history-container');

async function fetchHistory() {
    try {
        const response = await fetch('./history.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching history:', error);
        return [];
    }
}

function renderHistory(history) {
    if(sessionStorage.getItem("HistoryPembelian")){
        const storedOrders = JSON.parse(sessionStorage.getItem("HistoryPembelian") || "[]");
        history = [...history, ...storedOrders];
    }
    
    history.reverse().forEach(item => {
        const card = document.createElement('div');
        card.classList.add('history-card');

        const header = document.createElement('div');
        header.classList.add('history-card-header');
        header.innerHTML = `<span>${item.orderId} - ${item.fullname}</span><span>&#9654;</span>`;

        const detail = document.createElement('div');
        detail.classList.add('history-card-detail');
        detail.innerHTML = `
            <p><strong>Jenis Asuransi:</strong> ${item.type}</p>
            <p><strong>Harga:</strong> Rp${item.harga.toLocaleString()}</p>
            <p><strong>Metode Pembayaran:</strong> ${item.metodePembayaran}</p>
        `;

        card.appendChild(header);
        card.appendChild(detail);
        historyContainer.appendChild(card);

        header.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });
}

fetchHistory().then(renderHistory);
