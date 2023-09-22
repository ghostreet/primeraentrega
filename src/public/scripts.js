
//eliminar productos
    function deleteProduct() {
        const selectProdId = document.getElementById("producto").value;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetch(`/api/products/delete/${selectProdId}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar producto');
                }
            
                window.location.reload();
            })
            .catch(error => {
                console.error('Error al eliminar producto', error);
            });
    }

//actualizar productos
        function updateProduct() {
            const selectProdId = document.getElementById("producto").value;
            const nuevoNombre = document.getElementById("nuevoNombre").value;
            const nuevoPrecio = document.getElementById("nuevoPrecio").value;
            const nuevaDesc = document.getElementById("nuevaDescription").value;
            const nuevoCode = document.getElementById("nuevoCode").value;
            const nuevoStock = document.getElementById("nuevoStock").value;
            const nuevaCat = document.getElementById("nuevaCategory").value;

        const updateData = {
        name: nuevoNombre,
        price: nuevoPrecio,
        description: nuevaDesc,
        code: nuevoCode,
        stock: nuevoStock,
        category: nuevaCat     
        };

        const requestOpt = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        };

        fetch(`/api/products/${selectProdId}`, requestOpt)
            .then(response => {
                if (!response.ok){
                    throw new Error('Error al actualizar el producto')
                }
                window.location.reload();
            })
            .catch(error=>{
                console.error('Error al actualizar el producto')
            })
        }
   



//agregar productos al carrito
      document.addEventListener('DOMContentLoaded', function() { 
            // Función para generar una cartId
      function generateCartId() {
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
          let cartId = localStorage.getItem('cartId')
  
          if (!cartId) {
              cartId = generateCartId();
              localStorage.setItem('cartId', cartId) 
          }
  
          
      const cartForm = document.querySelector('#cartForm');
      const productSelect =  document.querySelector('#producto');
  
          cartForm.addEventListener('submit', async function(e) {
           e.preventDefault();
          
          const selectProdId = productSelect.value;
          
           try {
              
              const response = await fetch(`/api/cart/add/${cartId}/${selectProdId}`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                 
              });
  
               if (!response.ok) {
                  const errorMessage = await response.text();
                  console.error('erro al agregar el producto al carrito Lado Cliente', errorMessage)
                  alert('Error al agregar el producto al carrito CLIENT'+ errorMessage);
              }
              alert('Producto agregado exitosamente');
          } catch(error){
              console.error('Error al agregar el producto a carrito', error);
          };
      });
      });  


