const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const expenseList = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');
const searchInput = document.getElementById('search');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses(list = expenses) {
    expenseList.innerHTML = '';
    let total = 0;

    list.forEach(({ name, amount }) => {
        const li = document.createElement('li');
        li.textContent = `${name} - $${amount.toFixed(2)}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = 'Del';
        deleteBtn.style.marginLeft = '10px';

        deleteBtn.addEventListener('click', () => {
            const indexToDelete = expenses.findIndex(
                exp => exp.name === name && exp.amount === amount
            );
            if (indexToDelete > -1) {
                expenses.splice(indexToDelete, 1);
                localStorage.setItem('expenses', JSON.stringify(expenses));
                renderExpenses();
            }
        });

        const editBtn = document.createElement("button");
        editBtn.textContent = 'Edit';
        editBtn.style.marginLeft = '10px';

        editBtn.addEventListener('click', () => {
            const newName = prompt("Enter a new name:", name);
            const newAmount = parseFloat(prompt("Enter new amount:", amount));

            if (newName && !isNaN(newAmount)) {
                const indexToEdit = expenses.findIndex(
                    exp => exp.name === name && exp.amount === amount
                );
                if (indexToEdit > -1) {
                    expenses[indexToEdit] = {
                        name: newName.trim(),
                        amount: newAmount
                    };
                    localStorage.setItem('expenses', JSON.stringify(expenses));
                    renderExpenses();
                }
            } else {
                alert("Please enter valid name and amount");
            }
        });

        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        expenseList.appendChild(li);
        total += amount;
    });

    totalDisplay.textContent = total.toFixed(2);
}


renderExpenses();


form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (name === '' || isNaN(amount)) {
        alert('Please input valid name and amount');
        return;
    }

    expenses.push({ name, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();

    nameInput.value = '';
    amountInput.value = '';
});


searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    const filtered = expenses.filter(exp =>
        exp.name.toLowerCase().includes(query)
    );
    renderExpenses(filtered);
});
