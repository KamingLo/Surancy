const filePath = './orders.json';
const container = document.getElementById('order-accordion-container');
const paymentMethods = ["BCA Transfer", "OVO", "GoPay", "Dana", "Credit Card"];

async function fetchOrders() {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let orders = await response.json();
        console.log('Data berhasil diambil:', orders);
        return orders;
    } catch (error) {
        console.error('Ada masalah dengan operasi fetch:', error);
        return [];
    }
}

function renderOrders(orders) {

    if(sessionStorage.getItem("orders")){
        const storedOrders = JSON.parse(sessionStorage.getItem("orders") || "[]");
        orders = [...orders, ...storedOrders];
    }
    
    orders.reverse().forEach(order => {
        const card = document.createElement('div');
        card.classList.add('order-card');

        const header = document.createElement('div');
        header.classList.add('order-card-header');
        header.innerHTML = `<h3>${order.fullname} - Rp${order.harga.toLocaleString()}</h3><span class="order-arrow">&#9654;</span>`;

        const subHeader = document.createElement('div');
        subHeader.innerHTML = `<p id="errorMsg-${order.orderId}" class="error-msg" style="display:none;color:red;margin:0.5rem 0;"></p>`;

        const detail = document.createElement('div');
        detail.classList.add('order-card-detail');
        detail.innerHTML = `
            <p><strong>Order ID:</strong> ${order.orderId}</p>
            <p><strong>Jenis Asuransi:</strong> ${order.type}</p>
            <p><strong>Harga:</strong> Rp${order.harga.toLocaleString()}</p>
        `;

        const form = document.createElement('form');
        form.style.maxHeight = '120px';
        form.style.overflowY = 'auto';
        form.style.display = 'flex';
        form.style.flexDirection = 'column';

        paymentMethods.forEach((method) => {
            const label = document.createElement('label');
            label.classList.add('order-radio');
            label.innerHTML = `<input type="radio" name="payment-${order.orderId}" value="${method}"> ${method}`;
            form.appendChild(label);
        });

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn-buy';
        button.style= 'margin:0.5rem 1rem';
        button.textContent = 'Bayar';

        button.addEventListener('click', () => {
            let errorMsg = document.getElementById(`errorMsg-${order.orderId}`);
            errorMsg.style = "margin-left:1rem;";
            const selected = form.querySelector(`input[name="payment-${order.orderId}"]:checked`);


            function addHistory(order) {
                let history = JSON.parse(sessionStorage.getItem("HistoryPembelian")) || [];
                const newEntry = {
                    orderId: order.orderId,
                    fullname: order.fullname,
                    type: order.type,
                    harga: order.harga,
                    metodePembayaran: order.metodePembayaran
                };

                history.push(newEntry);
                sessionStorage.setItem("HistoryPembelian", JSON.stringify(history));
            }

            if(selected) {
                const history = { 
                    orderId: order.orderId,
                    fullname: order.fullname,
                    type: order.type,
                    metodePembayaran: selected.value,
                    harga: order.harga,
                };
                console.log(history);
                addHistory(history);
                alert(`Order ${order.orderId} akan dibayar menggunakan ${selected.value}`);
                errorMsg.style.display = 'none';
            } else {
                errorMsg.textContent = "Pilih metode pembayaran terlebih dahulu";
                errorMsg.style.display = "block";
            }
        });

        detail.appendChild(form);
        card.appendChild(header);
        card.appendChild(subHeader);
        card.appendChild(detail);
        card.appendChild(button);
        container.appendChild(card);

        header.addEventListener('click', () => {
            document.querySelectorAll('.order-card').forEach(c => {
                if(c !== card) c.classList.remove('active');
            });
            card.classList.toggle('active');
        });
    });
}

fetchOrders().then(data => {
    renderOrders(data);
});
