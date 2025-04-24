const form = document.getElementById('expense-form');
const nameinput = document.getElementById('expense-name');
const amountinput = document.getElementById('expense-amount');
const expenselist = document.getElementById('expense-list');
const totaldisplay = document.getElementById('total');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
    expenselist.innerHTML = '';
    let total = 0;

    expenses.forEach(({ name, amount }, index) => {
        const li = document.createElement('li');
        li.textContent = `${name} - $${amount.toFixed(2)}`;

        const deletebtn = document.createElement("button");
        deletebtn.textContent = 'Del';
        deletebtn.style.marginLeft = '10px';

        deletebtn.addEventListener('click', () => {
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));
            renderExpenses();
        });

        const editbtn = document.createElement("button");
        editbtn.textContent = 'Edit';
        editbtn.style.marginLeft = '10px';

        editbtn.addEventListener('click', () => {
            const newname = prompt("Enter a new name:", name);
            const newamount = parseFloat(prompt("Enter new amount:", amount));

            if (newname && !isNaN(newamount)) {
                expenses[index] = { name: newname.trim(), amount: newamount };
                localStorage.setItem('expenses', JSON.stringify(expenses));
                renderExpenses();
            } else {
                alert("Please enter valid name and amount");
            }
        });

        li.appendChild(deletebtn);
        li.appendChild(editbtn);

        expenselist.appendChild(li);
        total += amount;
    });

    totaldisplay.textContent = total.toFixed(2);
}

// INITIAL RENDER
renderExpenses();

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = nameinput.value.trim();
    const amount = parseFloat(amountinput.value);

    if (name === '' || isNaN(amount)) {
        alert('Please input valid name and amount');
        return;
    }

    expenses.push({ name, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();

    nameinput.value = '';
    amountinput.value = '';
});
