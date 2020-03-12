const usersDataList = document.getElementById("table-body");

fetch("https://tp-js-2-api-wjfqxquokl.now.sh/users")
  .then(data => data.json())
  .then(info => {
    let usersInfo = "";
    info.forEach(user => {
      usersInfo += `
        <tr class="user-info">
          <th><input type="checkbox" id="${user.id}"></th>
          <th>${user.fullname}</th>
          <th>${user.email}</th>
          <th>${user.address}</th>
          <th>${user.phone}</th>
          <th>
           <i id="${user.id}" class="material-icons edit" title="Edit">&#xE254;</i>
           <i id="${user.id}" class="material-icons delete" title="Delete">&#xE872;</i>
          </th>
        </tr>`
    });
    usersDataList.innerHTML += usersInfo;

    let deleteUserBtn = document.getElementsByClassName("delete");
    const modalDelete = document.getElementById("delete-user-modal");

    for (let i = 0; i < deleteUserBtn.length; i++) {
      deleteUserBtn[i].onclick = e => {
        modalDelete.classList.remove("no-show");
        modalBackground.classList.remove("no-show");
        const deleteCancelBtn = document.getElementById("cancel-delete");
        const deleteConfirmBtn = document.getElementById("delete-user-btn");

        deleteCancelBtn.onclick = () => {
          modalDelete.classList.add("no-show");
          modalBackground.classList.add("no-show");
        }

        deleteConfirmBtn.onclick = () => {
          fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${e.target.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          })
            .then(data => data.json())
            .then(info => {
              modalDelete.classList.add("no-show");
              modalBackground.classList.add("no-show");
            })
        }
      }
    }

    const editUserBtn = document.getElementsByClassName("edit");
    const modalEdit = document.getElementById("edit-user-modal");

    for (let i = 0; i < editUserBtn.length; i++) {
      editUserBtn[i].onclick = e => {
        console.log(e)
        modalEdit.classList.remove("no-show");
        modalBackground.classList.remove("no-show");
        fetch("https://tp-js-2-api-wjfqxquokl.now.sh/users")
          .then(data => data.json())
          .then(info => {            
            modalEdit.innerHTML = `
             <div class="edit-user-form-header">
               <p>Edit employee</p>
             </div>
             <form class="edit-user-form">
               Name<input type="text" value=${info[e.target.id - 1].fullname}>
               Email<input type="email" value=${info[e.target.id - 1].email}>
               Address<input type="text" value=${info[e.target.id - 1].address}>
               Phone<input type="number" value=${info[e.target.id - 1].phone}>      
               <button type="button"id="cancel-edit-user">Cancel</button>
               <button type="button" id="add-edited-user-btn">Add</button>
             </form>`;
            
            const confirmEditUserBtn = document.getElementById("add-edited-user-btn");
            const cancelEditUserBtn = document.getElementById("cancel-edit-user");

            confirmEditUserBtn.onclick = e => {
              //validaciones
              const editedUser = {
                address: formNewUser[2].value,
                email: formNewUser[1].value,
                fullname: formNewUser[0].value,
                phone: formNewUser[3].value
              }

              fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${e.target.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedUser)
              })
                .then(data => data.json())
                .then(info => {
                  //const usersDataList = document.getElementById("table-body");
                  console.log(info)
                  /*let newUserInfo = `<tr class="user-info">
              <th><input type="checkbox"></th>
              <th>${info.fullname}</th>
              <th>${info.email}</th>
              <th>${info.address}</th>
              <th>${info.phone}</th>
              <th>
                <i class="material-icons edit" title="Edit">&#xE254;</i>
                <i class="material-icons delete" title="Delete">&#xE872;</i>
              </th>
            </tr>`;
                  usersDataList[e.target.id].innerHTML += newUserInfo;*/
                  modalNewUser.classList.add("no-show");
                  modalBackground.classList.add("no-show");
                })
            }

            cancelEditUserBtn.onclick = () => {
              modalEdit.classList.add("no-show");
              modalBackground.classList.add("no-show");
            }
          })
      }
    };

    const btnNewUser = document.getElementById("btn-new-user");
    const modalNewUser = document.getElementById("new-user-modal");
    const modalBackground = document.getElementById("modal-background");

    btnNewUser.onclick = () => {
      modalNewUser.innerHTML = `
       <div class="new-user-form-header">
         <p>Add employee</p>
       </div>
       <form class="new-user-form">
         Name<input type="text">
         Email<input type="email">
         Address<input type="text">
         Phone<input type="number">      
         <button type="button" class="cancel-btn">Cancel</button>
         <button type="submit" id="add-user-btn">Add</button>
        </form>`;
      modalNewUser.classList.remove("no-show");
      modalBackground.classList.remove("no-show");

      const formNewUser = document.querySelector(".new-user-form");
      const cancelNewUserForm = document.querySelector(".cancel-btn");

      cancelNewUserForm.onclick = () => {
        modalNewUser.classList.add("no-show");
        modalBackground.classList.add("no-show");
      };

      formNewUser.onsubmit = e => {
        e.preventDefault();
        //validaciones
        const newUser = {
          address: formNewUser[2].value,
          email: formNewUser[1].value,
          fullname: formNewUser[0].value,
          phone: formNewUser[3].value
        }

        fetch("https://tp-js-2-api-wjfqxquokl.now.sh/users", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUser)
        })
          .then(data => data.json())
          .then(info => {
            const usersDataList = document.getElementById("table-body");
            let newUserInfo = `
            <tr class="user-info">
              <th><input type="checkbox"></th>
              <th>${info.fullname}</th>
              <th>${info.email}</th>
              <th>${info.address}</th>
              <th>${info.phone}</th>
              <th>
               <i class="material-icons edit" title="Edit">&#xE254;</i>
               <i class="material-icons delete" title="Delete">&#xE872;</i>
              </th>
            </tr>`;
            usersDataList.innerHTML += newUserInfo;
            modalNewUser.classList.add("no-show");
            modalBackground.classList.add("no-show");
          })
      }
    }
  })