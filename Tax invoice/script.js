

// Add a new product row to the table
function addNewItem() {
    const table = document.getElementById ('productTableBody');

    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td></td> <!-- Serial number will be updated later -->
        <td><input type="text" class="product-description" required></td>
        <td><input type="number" class="hsnCode" step="1" min="1" ></td>
        <td><input type="number" class="quantity" step="1" min="1" name="quantity" ></td>
        <td><input type="number" class="rate" step="1" min="1" name="rate" ></td>
        <td><input type="number" class="amount" step="0.01" min="0" name="amount"></td>
        <td><button type="button" class="remove-button" onclick="removeRow(this)">Remove</button></td>
    `;

    // Update serial numbers after adding a row
    updateRowNumbers();
}

// Remove a product row   
function removeRow(button) {
    const row = button.closest('tr');
    row.remove();
    
    // Update serial numbers after removing a row
    updateRowNumbers();
}

// Update the serial numbers in the table
function updateRowNumbers() {
    const table = document.getElementById('productTableBody');
    Array.from(table.rows).forEach((row, index) => {
        row.cells[0].textContent = index + 1; // Serial number starts from 1
    });
}

//Total amount calculation
document.addEventListener('input',function(e){
    if(e.target.name === 'quantity' || e.target.name === 'rate') {
        const row = e.target.closest('tr');
        const qty = parseFloat(row.querySelector('[name="quantity"]').value) || 0;
        const rateNO = parseFloat(row.querySelector('[name="rate"]').value) || 0;
        const amount = qty * rateNO;
        row.querySelector('[name="amount"]').value = amount.toFixed(2);
    }
});

// Initialize form submission and data collection
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('invoiceForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        // Save form data to localStorage
        localStorage.setItem('invoiceData', JSON.stringify(data));

        // Collect product table data
        const productRows = Array.from(document.querySelectorAll('#productTableBody tr'));
        const products = productRows.map(row => {
            const description = row.querySelector('.product-description').value;
            const hsnCode = row.querySelector('.hsnCode').value;
            const quantity = row.querySelector('.quantity').value;
            const rate = row.querySelector('.quantity').value;
            const amount = row.querySelector('.amount').value;

            return {
                description,
                hsnCode,
                quantity,
                rate,
                amount
            };
        });

        // Save product data to localStorage
        localStorage.setItem('productData', JSON.stringify(products));

        // Redirect to the invoice template page
        window.location.href = 'invoice-template.html';
    });
});
