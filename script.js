document.addEventListener("DOMContentLoaded", () => { //DESDE ACA EMPIEZA EL SCRIPT PARA LICITACIONES
  const form = document.getElementById("filtro-form");
  const resultados = document.getElementById("resultados");
  const loading = document.getElementById("loading");
  const resultsSection = document.getElementById("results-section");
  const emptyState = document.getElementById("empty-state");
  const resultsCount = document.getElementById("results-count");
  const fechaInput = document.getElementById("fecha");

  // Agregar formateo automático de fecha
  if (fechaInput) {
    fechaInput.addEventListener('input', function() {
      formatearFecha(this);
    });
    
    // Prevenir pegar texto no válido
    fechaInput.addEventListener('paste', function(e) {
      setTimeout(() => formatearFecha(this), 0);
    });
  }

  if (form && resultados) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const fechaFormateada = document.getElementById("fecha").value.trim();
      const estado = document.getElementById("estado").value;

      // Validación mejorada
      if (fechaFormateada === "" || estado === "todas") {
        showAlert("Por favor completa la fecha y selecciona un estado válido", "warning");
        return;
      }

      // Limpiar fecha para API (remover barras)
      const fecha = limpiarFechaParaAPI(fechaFormateada);

      // Validar formato de fecha
      if (fecha.length !== 8 || !/^\d{8}$/.test(fecha)) {
        showAlert("La fecha debe estar completa en formato DD/MM/AAAA", "warning");
        return;
      }

      // Mostrar loading y ocultar otros estados
      showLoading();

      const url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fecha}&estado=${estado}&ticket=AC3A098B-4CD0-41AF-81A5-41284248419B`;

      fetch(url)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          console.log("Datos recibidos:", data);
          hideLoading();
          mostrarResultados(data.Listado);
        })
        .catch(err => {
          console.error("Error en la consulta:", err);
          hideLoading();
          showAlert("Error al consultar la API. Por favor intenta nuevamente.", "danger");
          showEmptyState();
        });
    });

    function showLoading() {
      loading.style.display = "block";
      resultsSection.style.display = "none";
      emptyState.style.display = "none";
    }

    function hideLoading() {
      loading.style.display = "none";
    }

    function showEmptyState() {
      emptyState.style.display = "block";
      resultsSection.style.display = "none";
    }

    function showAlert(message, type) {
      // Remover alertas anteriores
      const existingAlert = document.querySelector('.alert');
      if (existingAlert) {
        existingAlert.remove();
      }

      const alert = document.createElement('div');
      alert.className = `alert alert-${type} alert-dismissible fade show`;
      alert.innerHTML = `
        <i class="bi bi-exclamation-triangle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      
      form.parentNode.insertBefore(alert, form.nextSibling);
    }

    function mostrarResultados(licitaciones) {
      resultados.innerHTML = "";

      if (!licitaciones || licitaciones.length === 0) {
        showEmptyState();
        return;
      }

      // Mostrar conteo de resultados
      resultsCount.textContent = `${licitaciones.length} resultado${licitaciones.length !== 1 ? 's' : ''}`;
      resultsSection.style.display = "block";      licitaciones.forEach((l, index) => {
        // Obtener el estado de diferentes campos posibles
        const estado = l.Estado || l.EstadoLicitacion || l.EstadoPublicacion || 'Sin especificar';
        const fechaPublicacion = l.FechaPublicacion || l.FechaCreacion || 'No disponible';
        
        // Mapear estados a colores de badge
        let badgeClass = 'bg-secondary';
        switch(estado.toLowerCase()) {
          case 'publicada':
          case 'abierta':
            badgeClass = 'bg-success';
            break;
          case 'cerrada':
          case 'finalizada':
            badgeClass = 'bg-warning text-dark';
            break;
          case 'adjudicada':
            badgeClass = 'bg-primary';
            break;
          case 'desierta':
          case 'revocada':
            badgeClass = 'bg-danger';
            break;
          default:
            badgeClass = 'bg-info';
        }

        const fila = `
          <tr class="animate-row" style="animation-delay: ${index * 0.1}s">
            <td>
              <code class="text-primary">${l.CodigoExterno}</code>
            </td>
            <td>
              <strong>${l.Nombre}</strong>
              <br>
              <small class="text-muted">${l.Descripcion ? l.Descripcion.substring(0, 100) + '...' : 'Sin descripción'}</small>
              ${fechaPublicacion !== 'No disponible' ? `<br><small class="text-muted"><i class="bi bi-calendar me-1"></i>${fechaPublicacion}</small>` : ''}
            </td>
            <td>
              <span class="badge ${badgeClass}">${estado}</span>
            </td>
            <td class="text-center">
              <a href="detalle.html?codigo=${l.CodigoExterno}" class="btn btn-sm btn-outline-primary">
                <i class="bi bi-eye me-1"></i>
                Ver detalle
              </a>
            </td>
          </tr>
        `;
        resultados.innerHTML += fila;
      });
    }
  }
}); //AQUI TERMINA EL SCRIPT PARA LICITACIONES

document.addEventListener("DOMContentLoaded", () => { //DESDE ACA EMPIEZA EL SCRIPT PARA PROVEEDORES
  const formProveedor = document.getElementById("form-proveedor");
  const resultadoDiv = document.getElementById("resultado-proveedor");
  const loadingProveedor = document.getElementById("loading-proveedor");
  const rutInput = document.getElementById("rut");

  // Agregar formateo automático de RUT
  if (rutInput) {
    rutInput.addEventListener('input', function() {
      formatearRUT(this);
    });
    
    // Prevenir pegar texto no válido
    rutInput.addEventListener('paste', function(e) {
      setTimeout(() => formatearRUT(this), 0);
    });
  }

  if (formProveedor) {
    formProveedor.addEventListener("submit", function (e) {
      e.preventDefault();

      const rut = document.getElementById("rut").value.trim();
      
      // Validación mejorada
      if (rut === "") {
        showProveedorAlert("Por favor ingresa un RUT válido", "warning");
        return;
      }

      // Validación básica de formato RUT
      if (!validateRutFormat(rut)) {
        showProveedorAlert("El RUT debe estar completo en formato 12.345.678-9", "warning");
        return;
      }

      // Mostrar loading
      showProveedorLoading();

      const url = `https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarProveedor?rutempresaproveedor=${rut}&ticket=AC3A098B-4CD0-41AF-81A5-41284248419B`;

      fetch(url)
        .then(res => {
          if (!res.ok) {
            throw new Error(`Error HTTP: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          hideProveedorLoading();
          mostrarProveedor(data, rut);
        })
        .catch(err => {
          console.error("Error al buscar proveedor:", err);
          hideProveedorLoading();
          showProveedorAlert("Error al consultar la API. Por favor intenta nuevamente.", "danger");
          mostrarProveedorNotFound();
        });
    });

    function validateRutFormat(rut) {
      // Validación mejorada: debe contener al menos un guión y dígitos
      const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
      return rutRegex.test(rut) && rut.length >= 11;
    }

    function showProveedorLoading() {
      if (loadingProveedor) {
        loadingProveedor.style.display = "block";
      }
      resultadoDiv.innerHTML = "";
    }

    function hideProveedorLoading() {
      if (loadingProveedor) {
        loadingProveedor.style.display = "none";
      }
    }

    function showProveedorAlert(message, type) {
      // Remover alertas anteriores
      const existingAlert = document.querySelector('.alert');
      if (existingAlert) {
        existingAlert.remove();
      }

      const alert = document.createElement('div');
      alert.className = `alert alert-${type} alert-dismissible fade show`;
      alert.innerHTML = `
        <i class="bi bi-exclamation-triangle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      `;
      
      formProveedor.parentNode.insertBefore(alert, formProveedor.nextSibling);
    }

    function mostrarProveedor(data, rut) {
      if (!data || !data.listaEmpresas || data.listaEmpresas.length === 0) {
        mostrarProveedorNotFound();
        return;
      }

      const proveedor = data.listaEmpresas[0];

      resultadoDiv.innerHTML = `
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <h5 class="mb-0">
              <i class="bi bi-check-circle me-2"></i>
              Proveedor Encontrado
            </h5>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <h4 class="text-primary mb-3">
                  <i class="bi bi-building me-2"></i>
                  ${proveedor.NombreEmpresa}
                </h4>
                <div class="row">
                  <div class="col-sm-6 mb-3">
                    <h6 class="text-muted mb-1">
                      <i class="bi bi-hash me-1"></i>
                      Código Empresa
                    </h6>
                    <code class="fs-6">${proveedor.CodigoEmpresa}</code>
                  </div>
                  <div class="col-sm-6 mb-3">
                    <h6 class="text-muted mb-1">
                      <i class="bi bi-card-text me-1"></i>
                      RUT
                    </h6>
                    <strong>${rut}</strong>
                  </div>
                  ${proveedor.Direccion ? `
                    <div class="col-12 mb-3">
                      <h6 class="text-muted mb-1">
                        <i class="bi bi-geo-alt me-1"></i>
                        Dirección
                      </h6>
                      <p class="mb-0">${proveedor.Direccion}</p>
                    </div>
                  ` : ''}
                  ${proveedor.Telefono ? `
                    <div class="col-sm-6 mb-3">
                      <h6 class="text-muted mb-1">
                        <i class="bi bi-telephone me-1"></i>
                        Teléfono
                      </h6>
                      <p class="mb-0">${proveedor.Telefono}</p>
                    </div>
                  ` : ''}
                  ${proveedor.Email ? `
                    <div class="col-sm-6 mb-3">
                      <h6 class="text-muted mb-1">
                        <i class="bi bi-envelope me-1"></i>
                        Email
                      </h6>
                      <p class="mb-0">${proveedor.Email}</p>
                    </div>
                  ` : ''}
                </div>
              </div>
              <div class="col-md-4">
                <div class="bg-light rounded p-3 text-center">
                  <i class="bi bi-shield-check text-success mb-2" style="font-size: 3rem;"></i>
                  <h6 class="text-success">Proveedor Verificado</h6>
                  <small class="text-muted">
                    Registrado en Mercado Público
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer bg-light">
            <div class="row align-items-center">
              <div class="col">
                <small class="text-muted">
                  <i class="bi bi-info-circle me-1"></i>
                  Información obtenida desde la API oficial de Mercado Público
                </small>
              </div>
              <div class="col-auto">
                <a href="licitaciones.html" class="btn btn-outline-primary btn-sm">
                  <i class="bi bi-search me-1"></i>
                  Ver Licitaciones
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    function mostrarProveedorNotFound() {
      resultadoDiv.innerHTML = `
        <div class="card shadow-sm border-warning">
          <div class="card-body text-center py-5">
            <i class="bi bi-exclamation-triangle text-warning mb-3" style="font-size: 4rem;"></i>
            <h4 class="text-warning mb-3">Proveedor no encontrado</h4>
            <p class="text-muted mb-4">
              No se encontró información para el RUT ingresado. 
              Verifica que esté correctamente escrito y que el proveedor esté registrado en el sistema.
            </p>
            <div class="row justify-content-center">
              <div class="col-md-8">
                <div class="bg-light rounded p-3">
                  <h6 class="mb-2">Sugerencias:</h6>
                  <ul class="list-unstyled text-start mb-0">
                    <li><i class="bi bi-check me-2"></i>Verifica el formato del RUT (12.345.678-9)</li>
                    <li><i class="bi bi-check me-2"></i>Asegúrate de incluir puntos y guión</li>
                    <li><i class="bi bi-check me-2"></i>Confirma que el proveedor esté registrado</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }
});// AQUI TERMINA EL SCRIPT PARA PROVEEDORES

document.addEventListener("DOMContentLoaded", () => { //DESDE ACA EMPIEZA EL SCRIPT PARA DETALLE DE DETALLE
  const detalleDiv = document.getElementById("detalle");
  const loadingDetalle = document.getElementById("loading-detalle");

  if (detalleDiv) {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("codigo");

    if (!codigo) {
      hideDetalleLoading();
      detalleDiv.innerHTML = `
        <div class="card shadow-sm border-warning">
          <div class="card-body text-center py-5">
            <i class="bi bi-exclamation-triangle text-warning mb-3" style="font-size: 4rem;"></i>
            <h4 class="text-warning mb-3">Código de licitación no proporcionado</h4>
            <p class="text-muted">No se pudo identificar la licitación a mostrar.</p>
            <a href="licitaciones.html" class="btn btn-primary mt-3">
              <i class="bi bi-search me-2"></i>
              Buscar Licitaciones
            </a>
          </div>
        </div>
      `;
      return;
    }

    const url = `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo=${codigo}&ticket=AC3A098B-4CD0-41AF-81A5-41284248419B`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Detalle recibido:", data);
        hideDetalleLoading();
        const licitacion = data.Listado?.[0];

        if (!licitacion) {
          mostrarDetalleNotFound();
          return;
        }

        mostrarDetalleCompleto(licitacion);
      })
      .catch(err => {
        console.error("Error al obtener el detalle:", err);
        hideDetalleLoading();
        mostrarDetalleError();
      });
  }

  function hideDetalleLoading() {
    if (loadingDetalle) {
      loadingDetalle.style.display = "none";
    }
  }

  function mostrarDetalleCompleto(licitacion) {
    // Obtener el estado correctamente
    const estado = licitacion.Estado || licitacion.EstadoLicitacion || 'Sin especificar';
    const fechaCreacion = licitacion.FechaCreacion || 'No disponible';
    const fechaCierre = licitacion.FechaCierre || 'No disponible';
    const montoEstimado = licitacion.MontoEstimado || 'No especificado';

    detalleDiv.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">
            <i class="bi bi-file-text-fill me-2"></i>
            Información de la Licitación
          </h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12 mb-4">
              <h3 class="text-primary mb-3">${licitacion.Nombre}</h3>
            </div>
            
            <div class="col-md-6 mb-3">
              <h6 class="text-muted mb-1">
                <i class="bi bi-hash me-1"></i>
                Código de Licitación
              </h6>
              <code class="fs-6">${licitacion.CodigoExterno}</code>
            </div>
            
            <div class="col-md-6 mb-3">
              <h6 class="text-muted mb-1">
                <i class="bi bi-flag me-1"></i>
                Estado
              </h6>
              <span class="badge bg-info fs-6">${estado}</span>
            </div>
            
            ${fechaCreacion !== 'No disponible' ? `
              <div class="col-md-6 mb-3">
                <h6 class="text-muted mb-1">
                  <i class="bi bi-calendar-plus me-1"></i>
                  Fecha de Creación
                </h6>
                <p class="mb-0">${fechaCreacion}</p>
              </div>
            ` : ''}
            
            ${fechaCierre !== 'No disponible' ? `
              <div class="col-md-6 mb-3">
                <h6 class="text-muted mb-1">
                  <i class="bi bi-calendar-x me-1"></i>
                  Fecha de Cierre
                </h6>
                <p class="mb-0">${fechaCierre}</p>
              </div>
            ` : ''}
            
            ${montoEstimado !== 'No especificado' ? `
              <div class="col-md-6 mb-3">
                <h6 class="text-muted mb-1">
                  <i class="bi bi-currency-dollar me-1"></i>
                  Monto Estimado
                </h6>
                <p class="mb-0">${montoEstimado}</p>
              </div>
            ` : ''}
            
            ${licitacion.UnidadCompra ? `
              <div class="col-md-6 mb-3">
                <h6 class="text-muted mb-1">
                  <i class="bi bi-building me-1"></i>
                  Unidad de Compra
                </h6>
                <p class="mb-0">${licitacion.UnidadCompra}</p>
              </div>
            ` : ''}
            
            ${licitacion.Descripcion ? `
              <div class="col-12 mb-3">
                <h6 class="text-muted mb-1">
                  <i class="bi bi-file-text me-1"></i>
                  Descripción
                </h6>
                <div class="bg-light p-3 rounded">
                  <p class="mb-0">${licitacion.Descripcion}</p>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
        <div class="card-footer bg-light">
          <small class="text-muted">
            <i class="bi bi-info-circle me-1"></i>
            Información obtenida desde la API oficial de Mercado Público
          </small>
        </div>
      </div>
    `;
  }

  function mostrarDetalleNotFound() {
    detalleDiv.innerHTML = `
      <div class="card shadow-sm border-warning">
        <div class="card-body text-center py-5">
          <i class="bi bi-exclamation-triangle text-warning mb-3" style="font-size: 4rem;"></i>
          <h4 class="text-warning mb-3">Licitación no encontrada</h4>
          <p class="text-muted mb-4">
            No se encontraron detalles para esta licitación. 
            Es posible que haya sido eliminada o el código no sea válido.
          </p>
          <a href="licitaciones.html" class="btn btn-primary">
            <i class="bi bi-search me-2"></i>
            Buscar otras licitaciones
          </a>
        </div>
      </div>
    `;
  }

  function mostrarDetalleError() {
    detalleDiv.innerHTML = `
      <div class="card shadow-sm border-danger">
        <div class="card-body text-center py-5">
          <i class="bi bi-exclamation-circle text-danger mb-3" style="font-size: 4rem;"></i>
          <h4 class="text-danger mb-3">Error al cargar información</h4>
          <p class="text-muted mb-4">
            Ocurrió un error al obtener los detalles de la licitación. 
            Por favor intenta nuevamente.
          </p>
          <button onclick="location.reload()" class="btn btn-outline-primary me-2">
            <i class="bi bi-arrow-clockwise me-2"></i>
            Reintentar
          </button>
          <a href="licitaciones.html" class="btn btn-primary">
            <i class="bi bi-arrow-left me-2"></i>
            Volver al listado
          </a>
        </div>
      </div>
    `;
  }
});
 // AQUI TERMINA EL SCRIPT PARA DETALLE DE DETALLE

// FUNCIONES DE FORMATEO AUTOMÁTICO
function formatearFecha(input) {
  // Remover caracteres no numéricos
  let valor = input.value.replace(/\D/g, '');
  
  // Limitar a 8 dígitos
  if (valor.length > 8) {
    valor = valor.substring(0, 8);
  }
  
  // Formatear según la longitud
  if (valor.length >= 5) {
    valor = valor.substring(0, 2) + '/' + valor.substring(2, 4) + '/' + valor.substring(4);
  } else if (valor.length >= 3) {
    valor = valor.substring(0, 2) + '/' + valor.substring(2);
  }
  
  input.value = valor;
}

function formatearRUT(input) {
  // Remover caracteres no válidos
  let valor = input.value.replace(/[^0-9kK]/g, '');
  
  // Limitar longitud
  if (valor.length > 9) {
    valor = valor.substring(0, 9);
  }
  
  // Formatear si tiene suficientes dígitos
  if (valor.length > 1) {
    const cuerpo = valor.slice(0, -1);
    const dv = valor.slice(-1);
    
    // Agregar puntos al cuerpo
    let cuerpoFormateado = '';
    for (let i = cuerpo.length - 1, j = 0; i >= 0; i--, j++) {
      if (j > 0 && j % 3 === 0) {
        cuerpoFormateado = '.' + cuerpoFormateado;
      }
      cuerpoFormateado = cuerpo[i] + cuerpoFormateado;
    }
    
    valor = cuerpoFormateado + '-' + dv;
  }
  
  input.value = valor;
}

function limpiarFechaParaAPI(fecha) {
  // Remover barras para enviar a la API
  return fecha.replace(/\//g, '');
}

function limpiarRUTParaAPI(rut) {
  // Remover puntos y guión para enviar a la API si es necesario
  return rut.replace(/[.-]/g, '');
}


