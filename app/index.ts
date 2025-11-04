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

        const cell6 = document.createElement("td");
        const editButton = document.createElement ('button');
        editButton.textContent='Edit';
        
        const userId = users[i].id;
        editButton.onclick= function () {
          window.location.href = `./userForm/userForm.html?id=${userId}`;
        };
        cell6.appendChild(editButton);
        newRow.appendChild (cell6);

        const cell7 = document.createElement("td");
        const deleteButton = document.createElement ('button');
        deleteButton.textContent='Delete';
        
        deleteButton.onclick= function () {
          service.deleteUser(userId.toString())
                        .then(() => {
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error(error.status, error.text);
                        });
                };
        cell7.appendChild(deleteButton);
        newRow.appendChild (cell7);
        }
      })
    .catch(error => {
        console.error(error.status, error.message);
      });
}
renderData();
