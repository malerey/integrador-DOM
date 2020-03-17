// Querida Guada, con disculpas por la tardanza te dejo mis observaciones. 

// En primer lugar, el codigo esta muy bien: demostras la comprension de los conceptos 
// generales vistos durante la cursada, seguis bien las indicaciones del proyecto y dejaste 
// un ABM funcional que respeta las pautas de diseño y comportamiento esperados. 

// Asi como esta, lo doy por aprobado y te felicito porque se que fue un esfuerzo grande

// Hay algunas cosas que traen problemas, pero son siempre detalles. En un 
// trabajo, esperariamos que un compañero con mas seniority pueda revisarte esto 
// y corregirtelo en relativo poco tiempo, y no que vos puedas hacerlo todo sola. 
// Agrego a eso que hiciste este trabajo sola y pidiendo pocas veces asistencia de mi parte, 
// por lo que tiene aun mas merito lo lejos que llegaste. 

// Si veo bien el trabajo, identifico tres problemas principales:

// 1. Cuando borramos un usuario, la tabla no se actualiza sola, es decir, 
// seguimos viendo lan lista incompleta hasta que refrescamos la pagina. 
// Deje la solucion en las lineas 86-111

// 2. No podemos editar un usuario, no funciona el fetch. Esto te lo dejo explicado
// en las lineas 148-157 aprox. 

// 3. Corregido el punto anterior, agregar un usuario funciona perfectamente,
// pero no podemos editar o borrar un usuario creado de esta manera. 
// La explicacion es que los botones de agregar y borrar no tienen el campo de "id"
//  (en la linea 260 aprox)

// 4. En tu HTML estas poniendo parte del body de la tabla en el head. Eso trae problemas
// Modificaría el HTML para que quedara asi:
// <table class="table-body">
// <thead>
//   <tr class="column-name">
//     <th><input type="checkbox"></th>
//     <th>Name</th>
//     <th>Email</th>
//     <th>Address</th>
//     <th>Phone</th>
//     <th>Actions</th>
//   </tr>
// </thead>
// <tbody id="table-body">
// </tbody>
// </table>

//  5. Un ultimo punto es que todo el codigo esta suelto, y quiza podria 
//  mejorarse haciedo funciones para cada cosa
//  (por ejemplo, al hacer clic en el boton de borrar se ejecuta la funcion borrarUsuario()
//  que seria la que se encarga de hacer el fetch, etc)

// Creo que a este trabajo no le falta muchisimo mas para estar perfecto, 
// asi que si queres continuarlo en base a mis indicaciones no dejes de escribirme
// Pero si estas cansada y preferis avanzar con otra cosa, me parece perfecto tambien

// Nos vemos en React!

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

    // deleteUserBtn deberia ser const, ya que no se modifica a lo largo del codigo
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
          // perfecto
          fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${e.target.id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
          })
            .then(data => data.json())
            .then(info => {
              // no estamos haciendo nada con la info que nos devuelve la 
              // api, y podria sernos util en este caso. 
              // Fijate que ahora mismo, cuando borramos un usuario
              // no se ve inmediatamente reflejado en tu web, sino que
              // tenemos que refrescar la pagina para poder ver la lista actualizada
              // "Info" en este caso, nos trae la nueva lista de usuarios. 
              // Podriamos usar esa lista para mostrar la tabla actualizada. 
              // Por ejemplo agregando el siguiente codigo:
              
              // usersDataList.innerHTML = ''
              // let usersInfo = "";
              // info.forEach(user => {
              //   usersInfo += `
              //     <tr class="user-info">
              //       <th><input type="checkbox" id="${user.id}"></th>
              //       <th>${user.fullname}</th>
              //       <th>${user.email}</th>
              //       <th>${user.address}</th>
              //       <th>${user.phone}</th>
              //       <th>
              //       <i id="${user.id}" class="material-icons edit" title="Edit">&#xE254;</i>
              //       <i id="${user.id}" class="material-icons delete" title="Delete">&#xE872;</i>
              //       </th>
              //     </tr>`
              // });
              // usersDataList.innerHTML += usersInfo;

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
        //ojo con olvidarse console.log en el codigo!
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

// para que no tengamos el error de "formNewUser is not defined", debemos definirlo asi:
          // const formNewUser = document.querySelector(".edit-user-form").elements


          // la "e" aca esta trayendo problemas: ya tenemos una e definida mas arriba
          // y esta nueva e la pisa (y por eso se rompe el fetch de mas abajo)
          // borrala, o ponele un nombre nuevo
          // creo que borrarla seria lo mejor porque no se usa
          // la funcion quedaria asi:
          // confirmEditUserBtn.onclick = () => {
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

            // fijate que en el string de mas arriba no le estamos agregando
            // el id del usuario a los botones: por eso no podemos editar ni borrar
            // a los usuarios recien agregados. 

            usersDataList.innerHTML += newUserInfo;
            modalNewUser.classList.add("no-show");
            modalBackground.classList.add("no-show");
          })
      }
    }
  })
