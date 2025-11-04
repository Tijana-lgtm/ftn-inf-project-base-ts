import { UserService } from "./services/users.service.js";

const service = new UserService();

function renderData(): void {
    service.getAll()
    .then (users => {
      const table = document.querySelector ('table tbody');

      if (!table) {
        console.error ('Table body not found');
        return;
      }

      for (let i=0; i<users.length; i++) {
        const newRow = document.createElement('tr');

        const cell1 = document.createElement('td')
        cell1.textContent = users[i].id.toString();
        newRow.appendChild(cell1);

        const cell2 = document.createElement('td');
        cell2.textContent = users[i].userName;
        newRow.appendChild(cell2);

        const cell3 = document.createElement('td');
        cell3.textContent = users[i].name;
        newRow.appendChild(cell3);

        const cell4 = document.createElement('td');
        cell4.textContent = users[i].surname;
        newRow.appendChild(cell4);

        const cell5 = document.createElement("td");
        cell5.textContent = users[i].birthDate;
        newRow.appendChild(cell5);
        table.appendChild(newRow);
        }
      })
    .catch(error => {
        console.error(error.status, error.message);
      });
}
renderData();
